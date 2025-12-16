import MetaTagModel from "../models/metaTag.model.js";

export const generateMetaSlug = async (text) => {
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

  while (await MetaTagModel.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  };

  return slug;
};
