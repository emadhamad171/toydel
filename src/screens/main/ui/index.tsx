import { cartSearchSetString, useAppDispatch, useAppSelector } from "@shared";
import { SearchBar } from "../../../widgets";
import React from "react";

export const MainSearchBar = () => {
  const dispatch = useAppDispatch();
  const searchString: string = useAppSelector(
    (state) => state.cart.searchString,
  );
  return (
    <SearchBar
      searchString={searchString}
      onChangeText={(text) => {
        dispatch(cartSearchSetString(text));
      }}
    />
  );
};
