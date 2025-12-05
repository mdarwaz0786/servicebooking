import ReviewModel from "../../models/review.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import puppeteer from "puppeteer";

// --------------------- GET ALL Reviews ---------------------
export const getReviews = asyncHandler(async (req, res) => {
  let { search, page, limit, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { description: { $regex: search, $options: "i" } },
    ];
  }

  filters.status = true;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const reviews = await ReviewModel
    .find(filters)
    .populate("booking")
    .populate("user")
    .populate("serviceman")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ReviewModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: reviews,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE Review ---------------------
export const getReviewById = asyncHandler(async (req, res) => {
  const review = await ReviewModel
    .findById(req.params.id)
    .populate("booking")
    .populate("user")
    .populate("serviceman")
    .lean();

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: review });
});

// google reviews
export const getGoogleReviews = asyncHandler(async (req, res) => {
  console.log("runs")
  try {
    const placeId = "ChIJN7R4GfofDTkRtUWu8aAYjeM";
    const mapUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(mapUrl, { waitUntil: "networkidle2" });

    // Wait for review section
    await page.waitForSelector(".jftiEf");

    const scrollable = await page.$(".m6QErb"); // review scroll container

    let reviews = [];
    let prevScrollTop = -1;

    while (true) {
      // Scrape current visible reviews
      const newReviews = await page.$$eval(".jftiEf", (nodes) =>
        nodes.map((el) => ({
          author_name: el.querySelector(".d4r55")?.innerText || "",
          rating: el.querySelector(".kvMYJc")?.getAttribute("aria-label") || "",
          profile_photo_url: el.querySelector("img")?.src || "",
          text: el.querySelector(".MyEned")?.innerText || "",
          relative_time_description: el.querySelector(".rsqaWe")?.innerText || "",
        }))
      );

      // Merge unique reviews by text + author
      newReviews.forEach(r => {
        if (!reviews.some(ex => ex.author_name === r.author_name && ex.text === r.text)) {
          reviews.push(r);
        }
      });

      // Scroll inside review container
      await scrollable.evaluate((el) => {
        el.scrollBy(0, el.scrollHeight);
      });

      await page.waitForTimeout(1500);

      // Stop if no new scroll happened
      const newScrollTop = await scrollable.evaluate((el) => el.scrollTop);
      if (newScrollTop === prevScrollTop) break;
      prevScrollTop = newScrollTop;
    }

    await browser.close();
    return res.json({ total: reviews.length, reviews });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Scraping failed" });
  }
});

