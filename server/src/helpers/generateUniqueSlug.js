import SlugModel from "../models/slug.model.js";

export const generateUniqueSlug = async (text, collectionName, documentId, pageName) => {
  let baseSlug = (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!baseSlug) {
    baseSlug = `n-a-${Date.now()}`;
  };

  let slug = baseSlug;
  let counter = 1;

  while (await SlugModel.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  };

  await SlugModel.create({
    slug,
    collectionName,
    documentId,
    pageName,
  });

  console.log(slug)

  return slug;
};
