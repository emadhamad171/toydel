import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { itemsStackSample, itemType } from "@shared";

export interface cartSliceType {
  isButtonShown: boolean;
  totalPrice: number;
  items: itemType[];
  displayedItems: itemType[];
  searchedItems: itemType[];
  searchString: string;
  isFiltered: boolean;
  isFilteredByGender: boolean;
  isGenderMale: boolean;
  activeFilteredCategory: string[];
  isFilteredByAge: boolean;
  restrictionAge: number;
}

const initialState: cartSliceType = {
  isButtonShown: false,
  totalPrice: 0,
  items: itemsStackSample,
  displayedItems: itemsStackSample,
  searchedItems: itemsStackSample,
  searchString: "",
  isFiltered: false,
  isFilteredByGender: false,
  isGenderMale: false,
  activeFilteredCategory: [],
  isFilteredByAge: false,
  restrictionAge: 18,
};
const filterItems = (
  items: itemType[],
  isFilteredByCategory: boolean,
  isFilteredByAge: boolean,
  isFilteredByGender: boolean,
  category: string[],
  age: number,
  gender: boolean,
) => {
  let filtered = items;
  if (isFilteredByGender) filtered = filtered.filter((el) => el);
  if (isFilteredByAge) filtered = filtered.filter((el) => el);
  if (isFilteredByCategory)
    filtered = filtered.filter((item) => {
      if (
        item.category.some((itemCategory: string) =>
          category.includes(itemCategory),
        )
      )
        return item;
    });
  return filtered;
};

const searchByString = ({
  items,
  searchString,
}: {
  items: itemType[];
  searchString: string;
}) => {
  return items.filter((item) => {
    return (
      item &&
      item.name &&
      (item.name.toLowerCase().includes(searchString.toLowerCase()) ||
        item.description.toLowerCase().includes(searchString.toLowerCase()))
    );
  });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartSearchSetString: (
      state: cartSliceType,
      action: PayloadAction<string>,
    ) => {
      state.searchString = action.payload;
      if (action.payload.length < 3) {
        state.searchedItems = state.displayedItems;
        return;
      }
      state.searchedItems = searchByString({
        items: state.displayedItems,
        searchString: state.searchString,
      });
    },
    cartFilterSetCategry: (
      state: cartSliceType,
      action: PayloadAction<string[]>,
    ) => {
      state.activeFilteredCategory = action.payload;
      console.log(action.payload);
      if (!action.payload.length) {
        state.isFiltered = state.isFilteredByAge || state.isFilteredByGender;
        state.displayedItems = filterItems(
          state.items,
          !!action.payload.length,
          state.isFilteredByAge,
          state.isFilteredByGender,
          action.payload,
          state.restrictionAge,
          state.isGenderMale,
        );
        state.searchedItems = state.displayedItems;
      } else {
        state.isFiltered = true;
        state.displayedItems = filterItems(
          state.items,
          !!action.payload.length,
          state.isFilteredByAge,
          state.isFilteredByGender,
          action.payload,
          state.restrictionAge,
          state.isGenderMale,
        );
        state.searchedItems = state.displayedItems;
      }
      console.log(state.displayedItems);
    },
    cartFilterAddCategry: (
      state: cartSliceType,
      action: PayloadAction<string>,
    ) => {
      state.activeFilteredCategory.push(action.payload);
      state.isFiltered = true;
      state.displayedItems = filterItems(
        state.items,
        !!state.activeFilteredCategory.length,
        state.isFilteredByAge,
        state.isFilteredByGender,
        state.activeFilteredCategory,
        state.restrictionAge,
        state.isGenderMale,
      );
      state.searchedItems = state.displayedItems;
    },
    cartFilterRemoveCategry: (
      state: cartSliceType,
      action: PayloadAction<string>,
    ) => {
      state.activeFilteredCategory = state.activeFilteredCategory.filter(
        (el) => el !== action.payload,
      );
      if (!state.activeFilteredCategory.length) {
        state.isFiltered = state.isFilteredByAge || state.isFilteredByGender;
        state.displayedItems = filterItems(
          state.items,
          !!state.activeFilteredCategory.length,
          state.isFilteredByAge,
          state.isFilteredByGender,
          state.activeFilteredCategory,
          state.restrictionAge,
          state.isGenderMale,
        );
      } else {
        state.searchedItems = state.displayedItems;
        state.displayedItems = filterItems(
          state.items,
          !!state.activeFilteredCategory.length,
          state.isFilteredByAge,
          state.isFilteredByGender,
          state.activeFilteredCategory,
          state.restrictionAge,
          state.isGenderMale,
        );
      }
    },
    cartFilterSetAge: (state: cartSliceType, action: PayloadAction<number>) => {
      state.restrictionAge = action.payload;
      state.isFiltered = true;
      state.displayedItems = filterItems(
        state.items,
        !!state.activeFilteredCategory.length,
        state.isFilteredByAge,
        state.isFilteredByGender,
        state.activeFilteredCategory,
        state.restrictionAge,
        state.isGenderMale,
      );
    },
    cartFilterClear: (state: cartSliceType) => {
      state.isFilteredByAge = false;
      state.isFilteredByGender = false;
      state.isFiltered = false;
      state.activeFilteredCategory = [];
      state.displayedItems = state.items;
      state.searchString = "";
      state.searchedItems = state.items;
    },
    cartFilterRemoveAge: (state: cartSliceType) => {
      state.restrictionAge = 18;
      state.isFilteredByAge = false;
      state.isFiltered =
        state.isFilteredByGender || !!state.activeFilteredCategory.length;
      state.displayedItems = filterItems(
        state.items,
        !!state.activeFilteredCategory.length,
        state.isFilteredByAge,
        state.isFilteredByGender,
        state.activeFilteredCategory,
        state.restrictionAge,
        state.isGenderMale,
      );
    },
    cartFilterSetGender: (
      state: cartSliceType,
      action: PayloadAction<boolean>,
    ) => {
      state.isFilteredByGender = true;
      state.isFiltered = true;
      state.isGenderMale = action.payload;
      state.displayedItems = filterItems(
        state.items,
        !!state.activeFilteredCategory.length,
        state.isFilteredByAge,
        state.isFilteredByGender,
        state.activeFilteredCategory,
        state.restrictionAge,
        state.isGenderMale,
      );
    },
    cartFilterRemoveGender: (state: cartSliceType) => {
      state.isFilteredByGender = false;
      state.isFiltered =
        state.isFilteredByAge || !!state.activeFilteredCategory.length;
      state.displayedItems = filterItems(
        state.items,
        !!state.activeFilteredCategory.length,
        state.isFilteredByAge,
        state.isFilteredByGender,
        state.activeFilteredCategory,
        state.restrictionAge,
        state.isGenderMale,
      );
    },
    cartGlobalSetItems: (state, action: PayloadAction<itemType[]>) => {
      state.items = action.payload;
      state.displayedItems = action.payload;
      state.displayedItems = filterItems(
        state.items,
        !!state.activeFilteredCategory.length,
        state.isFilteredByAge,
        state.isFilteredByGender,
        state.activeFilteredCategory,
        state.restrictionAge,
        state.isGenderMale,
      );
    },

    cartAddItem: (state: cartSliceType, action: PayloadAction<itemType>) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price;
      if (!state.isButtonShown) state.isButtonShown = true;
    },
    cartRemoveItem: (state: cartSliceType, action: PayloadAction<string>) => {
      console.log(state.items.length);
      state.items = state.items.filter((el) => {
        if (el.id === action.payload) {
          state.totalPrice -= el.price;
        }
        return el.id !== action.payload;
      });
      console.log(state.items.length);
      if (!state.items.length) state.isButtonShown = false;
    },
    cartClean: (state: cartSliceType) => {
      state.items = [];
      state.totalPrice = 0;
      state.isButtonShown = false;
    },
  },
});
export const {
  cartSearchSetString,
  cartFilterClear,
  cartGlobalSetItems,
  cartFilterRemoveGender,
  cartFilterRemoveCategry,
  cartFilterRemoveAge,
  cartFilterSetGender,
  cartFilterSetAge,
  cartFilterAddCategry,
  cartFilterSetCategry,
  cartClean,
  cartAddItem,
  cartRemoveItem,
} = cartSlice.actions;
export default cartSlice.reducer;
