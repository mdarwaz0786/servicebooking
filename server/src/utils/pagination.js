export function buildPagination({ page, limit, total }) {
  const totalPages = Math.ceil(total / limit);

  return {
    currentPage: page,
    limit: limit,
    total: total,
    totalPages: totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    pages: getPaginationPages(page, totalPages),
  };
};

function getPaginationPages(currentPage, totalPages, delta = 2) {
  const pages = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);

  if (left > 2) {
    pages.push("...");
  };

  for (let i = left; i <= right; i++) {
    pages.push(i);
  };

  if (right < totalPages - 1) {
    pages.push("...");
  };

  if (totalPages > 1) {
    pages.push(totalPages);
  };

  return pages;
};
