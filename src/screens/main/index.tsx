import { FlatList, RefreshControl, View } from "react-native";
import {
  BottomGradient,
  cartGlobalSetItems,
  itemType,
  loadAllItems,
  normalize,
  useAppDispatch,
  useAppSelector,
  useInfiniteScroll,
  userType,
} from "@shared";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { MainSearchBar } from "./ui";
import { ActiveCategoryList, ItemComponent } from "../../features";
import { CategoryList } from "../../widgets";
import { OpenCartButton } from "../../features/openCartButton";

const MainScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isFiltered = useAppSelector((state) => state.cart.isFiltered);
  const items = useAppSelector((state) => state.cart.displayedItems);
  const isButtonShown = useAppSelector((state) => state.cart.isButtonShown);
  const user: userType = useAppSelector((state) => state.user.user);
  const { displayedItems, fetchNextPage, ListEndLoader } = useInfiniteScroll({
    items,
    step: 6,
  });
  const onRefresh = async () => {
    setLoading(true);
    const path = "items";
    const listItems: itemType[] = await loadAllItems({ path });

    dispatch(cartGlobalSetItems(listItems));
    setLoading(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(239,238,238,0.87)" }}>
      <MainSearchBar />
      <FlatList
        refreshControl={
          <RefreshControl
            style={{ backgroundColor: "rgba(239,238,238,0.87)" }}
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{
          gap: 12,
          alignItems: "center",
          paddingBottom: bottom + isButtonShown ? normalize(32) * 3.5 : 0,
        }}
        data={displayedItems}
        onEndReachedThreshold={0.8}
        ListFooterComponent={ListEndLoader} // Loader when loading next page.
        onEndReached={fetchNextPage}
        renderItem={({ item }) => (
          <ItemComponent
            isLoading={isLoading}
            isFavorite={user.favoriteList.includes(item.id)}
            item={item}
          />
        )}
        ListHeaderComponent={!isFiltered ? CategoryList : ActiveCategoryList}
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={100}
      />
      <BottomGradient />
      <OpenCartButton />
    </View>
  );
};

export default MainScreen;
