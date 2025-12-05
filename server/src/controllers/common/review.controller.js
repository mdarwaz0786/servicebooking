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
  filters.type = 1;

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
  try {
    const placeId = "ChIJN7R4GfofDTkRtUWu8aAYjeM";
    const mapUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36"
    );

    await page.goto(mapUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

    // ⭐ All updated review buttons (2025)
    const reviewBtns = [
      "button[aria-label='See all reviews']",
      "button[jsaction*='reviews']",
      "button[aria-label*='reviews']",
      ".hh2c6",
      "button[data-item-id*='reviews']"
    ];

    // Wait for ANY review button
    await page.waitForFunction(
      (selectors) => selectors.some(sel => document.querySelector(sel)),
      { timeout: 30000 },
      reviewBtns
    );

    // Click first available button
    for (const sel of reviewBtns) {
      const btn = await page.$(sel);
      if (btn) {
        await btn.click();
        break;
      }
    }

    await page.waitForSelector("div[data-review-id]", { timeout: 30000 });



    // Detect scroll container (2023–2025)
    const scrollHandle = await page.evaluateHandle(() => {
      return (
        document.querySelector('div.m6QErb[role="region"]') ||
        document.querySelector('.OJRYGc') ||
        document.querySelector('.fzUZNc') ||
        document.querySelector('.jftiEf') ||
        document.querySelector('.h3zW0') ||
        null
      );
    });

    if (!scrollHandle) {
      throw new Error("Scroll container not found");
    }

    let reviews = [];
    let lastHeight = 0;

    while (true) {
      const newReviews = await page.$$eval("div[data-review-id]", (nodes) =>
        nodes.map((el) => ({
          author_name: el.querySelector(".d4r55, .ODSEW-ShBeI-title")?.innerText || "",
          rating: el.querySelector(".kvMYJc")?.getAttribute("aria-label") || "",
          profile_photo_url: el.querySelector("img")?.src || "",
          text: el.querySelector(".ODSEW-ShBeI-text, .MyEned")?.innerText || "",
          relative_time_description:
            el.querySelector(".ODSEW-ShBeI-RgZmSc-date, .rsqaWe")?.innerText || "",
        }))
      );

      newReviews.forEach((r) => {
        if (!reviews.some((x) => x.author_name === r.author_name && x.text === r.text)) {
          reviews.push(r);
        }
      });

      const newHeight = await scrollHandle.evaluate((el) => el.scrollHeight);

      if (newHeight === lastHeight) break;
      lastHeight = newHeight;

      await scrollHandle.evaluate((el) => el.scrollTo(0, el.scrollHeight));
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }


    await browser.close();

    return res.json({ success: true, total: reviews.length, reviews });

  } catch (err) {
    console.error("Google Review Scraping Error:", err);
    return res.status(500).json({
      success: false,
      message: "Scraping failed",
      error: err.message,
    });
  }
});





