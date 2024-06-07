import {
  cartRemoveItem,
  Description,
  itemType,
  normalize,
  useAppDispatch,
  useModal,
} from "@shared";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { OrderedItemModal } from "../orderedItemModal";
import { Iconify } from "react-native-iconify";
import React from "react";

export const CartItem = ({ item }: { item: itemType }) => {
  const { openModal } = useModal();
  const dispatch = useAppDispatch();
  return (
    item && (
      <TouchableOpacity
        onPress={() => {
          openModal(() => <OrderedItemModal item={item} isGoBack />);
        }}
      >
        <View
          style={{
            borderRadius: 10,
            flexDirection: "row",
            padding: 4,
            backgroundColor: "#fff",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <Image
            source={{ uri: item?.photo }}
            style={{
              width: normalize(196),
              height: normalize(144),
              resizeMode: "stretch",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              paddingVertical: normalize(4),
              paddingRight: normalize(24),
              gap: normalize(4),
              flexGrow: 1,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                numberOfLines={2}
                ellipsizeMode={"tail"}
                style={{
                  fontFamily: "Manrope-SemiBold",
                  color: "#141314",
                  maxWidth: "75%",
                  fontSize: normalize(16),
                }}
              >
                {item.name}
              </Text>
              <Description numberOfLines={3} fontSize={normalize(14)}>
                {item ? item?.description : ""}
              </Description>
            </View>
            <Text
              numberOfLines={3}
              ellipsizeMode={"tail"}
              style={{
                fontSize: normalize(15),
                color: "#141314",
                fontFamily: "Manrope",
              }}
            >
              ₴{item ? item?.price : ""} / місяць
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(cartRemoveItem(item.id));
          }}
          style={{
            borderRadius: 50,
            position: "absolute",
            right: 20,
            padding: 6,
          }}
        >
          <Iconify icon={"mdi:close"} size={normalize(26)} color={"#202020"} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  );
};
