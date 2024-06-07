import { View } from "react-native";
import {
  ContinueButton,
  normalize,
  useAppSelector,
  useModal,
  windowWidth,
} from "@shared";
import { CartModal } from "../../widgets";
import React from "react";

export const OpenCartButton = () => {
  const isButtonShown = useAppSelector((state) => state.cart.isButtonShown);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const { openModal } = useModal();
  return (
    isButtonShown && (
      <View
        style={{
          zIndex: 998,
          margin: normalize(32),
          width: windowWidth - normalize(32) * 2,
          position: "absolute",
          bottom: 0,
        }}
      >
        <ContinueButton
          onPress={() => {
            openModal(() => <CartModal />);
          }}
        >
          {`Перейти в кошик $${totalPrice}`}
        </ContinueButton>
      </View>
    )
  );
};
