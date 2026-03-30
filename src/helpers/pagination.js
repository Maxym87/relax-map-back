const getPagination = (query, config) => {
  const { defaultPage, defaultPerPage } = config;
  const page = Number(query.page) || defaultPage;
  const perPage = Number(query.perPage) || defaultPerPage;
  const skip = (page - 1) * perPage;

  return {
    page,
    perPage,
    skip,
    limit: perPage,
  };
};

export { getPagination };
