import {
  BottomGradient,
  cartFilterClear,
  cartSearchSetString,
  ICategory,
  normalize,
  useAppDispatch,
  useAppSelector,
  useModal,
  userType,
} from "@shared";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import { SearchBar } from "../../searchBar";
import React from "react";
import { ActiveCategoryList, ItemComponent } from "../../../features";

const ActiveCategoryListFiltered = () => {
  return <ActiveCategoryList inCategoryModal />;
};

export const CategoryModal = ({ category }: { category: ICategory }) => {
  const dispatch = useAppDispatch();
  const { searchedItems, isCartButtonShown, searchString } = useAppSelector(
    (state) => state.cart,
  );
  const user: userType = useAppSelector((state) => state.user.user);

  const { closeModal } = useModal();
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        inCategoryModal
        headerColor={category.headerColor}
        iconName={category.iconName}
        iconColor={category.iconColor}
        headerName={category.name}
        onClickExit={() => {
          dispatch(cartFilterClear());
          closeModal();
        }}
        withHeader
        filterModalProps={{ withCategory: false, isGoBack: true }}
        searchString={searchString}
        onChangeText={(text) => {
          dispatch(cartSearchSetString(text));
        }}
        searchBarGradientColors={category.gradientColors}
      />
      <FlatList
        contentContainerStyle={{
          gap: 12,
          alignItems: "center",
          paddingBottom: bottom + isCartButtonShown ? normalize(32) * 3.5 : 0,
        }}
        data={searchedItems}
        renderItem={({ item }) => (
          <ItemComponent
            isLoading={false}
            isFavorite={user.favoriteList.includes(item.id)}
            item={item}
          />
        )}
        ListHeaderComponent={ActiveCategoryListFiltered}
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={100}
      />
      <BottomGradient />
    </View>
  );
};
