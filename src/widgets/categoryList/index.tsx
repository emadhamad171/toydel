import {
  cartFilterSetCategry,
  Header,
  mockCategory,
  NativeCategoryIcons,
  normalize,
  useAppDispatch,
  useModal,
} from "@shared";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { CategoryModal } from "../modals";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const CategoryItem = ({ item }) => {
  const dispatch = useAppDispatch();
  const { openModal } = useModal();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(cartFilterSetCategry([item.name]));
        openModal(() => <CategoryModal category={item} />);
      }}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={item.gradientColors}
        style={{
          width: normalize(166),
          height: normalize(166),
          marginRight: normalize(14),
          borderRadius: 8,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            margin: 6,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            width: normalize(52),
            height: normalize(52),
          }}
        >
          {NativeCategoryIcons[item.iconName]({ color: item.iconColor })}
        </View>
        <View style={{ marginLeft: normalize(12), bottom: normalize(8) }}>
          <Text
            style={{
              color: "#fff",
              fontSize: normalize(18),
              fontFamily: "Manrope-SemiBold",
            }}
          >
            {item.name}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export const CategoryList = () => {
  return (
    <View
      style={{
        paddingVertical: normalize(18),
        paddingBottom: 0,
        gap: 12,
        alignSelf: "center",
        height: normalize(298) + 12 * 3,
      }}
    >
      <Header ml={normalize(24)} fontSize={normalize(34)}>
        Категорії
      </Header>
      <FlatList
        contentContainerStyle={{ marginLeft: normalize(24) }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={Object.values(mockCategory)}
        renderItem={({ item }) => <CategoryItem item={item} />}
        horizontal
      />
      <Header ml={normalize(24)} fontSize={normalize(34)}>
        Топ іграшок
      </Header>
    </View>
  );
};
