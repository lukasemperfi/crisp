export const createPaginationController = ({
  initialPage = 0,
  limit = 24,
  getData,
  onData,
  onEnd,
  onPageChange,
}) => {
  let currentPage = initialPage;
  let isLoading = false;
  let hasMore = true;

  const loadNext = async () => {
    if (isLoading || !hasMore) return;

    isLoading = true;

    const { data, count } = await getData({
      page: currentPage,
      limit,
    });

    onData(data);

    const isLastPage = (currentPage + 1) * limit >= count;

    // ⬇️ увеличиваем страницу ВСЕГДА после успешной загрузки
    currentPage++;

    onPageChange?.(currentPage);

    if (isLastPage) {
      hasMore = false;
      onEnd?.();
    }

    isLoading = false;
  };

  const reset = () => {
    currentPage = initialPage;
    hasMore = true;
  };

  return {
    loadNext,
    reset,
    hasMore: () => hasMore,
  };
};
