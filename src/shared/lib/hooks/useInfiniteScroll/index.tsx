import { wait } from "@shared";
import { useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { infiniteScrollProps } from "./lib/types";

export const useInfiniteScroll = ({
  items,
  step = 1,
  initialPage = 1,
}: infiniteScrollProps) => {
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [isNewItemsLoading, setIsNewItemsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const fetchNextPage = async () => {
    setIsNewItemsLoading(true);
    await wait(900);
    if (!items.length) return;
    if (items?.length < pageNumber * step) {
      setIsLastPage(true);
      setPageNumber((prev) => prev + 1);
      return;
    }
    setPageNumber((prev) => prev + 1);
    setIsNewItemsLoading(false);
  };

  const ListEndLoader = () => {
    if (!isLastPage) {
      if (isNewItemsLoading) {
        // Show loader at the end of list when fetching next page data.
        return <ActivityIndicator size={"large"} />;
      }
    } else {
      return <Text>All items reached.</Text>;
    }
  };

  return {
    displayedItems: (items?.length ? [...items] : []).slice(
      0,
      pageNumber * step,
    ),
    fetchNextPage,
    ListEndLoader,
  };
};
