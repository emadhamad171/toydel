import {
  auth,
  cartClean,
  ContinueButton,
  initPlatformPayment,
  itemType,
  normalize,
  useAppDispatch,
  useAppSelector,
  useCreatePaymentIntentMutation,
  useModal,
} from "@shared";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as SAView } from "react-native-safe-area-context";
import EIcon from "react-native-vector-icons/Entypo";
import { Iconify } from "react-native-iconify";
import Icon from "react-native-vector-icons/FontAwesome";
import IOIcon from "react-native-vector-icons/Ionicons";
import Fontisio from "react-native-vector-icons/Fontisto";
import { PlatformPay, PlatformPayButton } from "@stripe/stripe-react-native";
import { CartItem } from "../../../features";

export const CartModal = ({ onClickClose }: { onClickClose?: () => void }) => {
  const { closeModal } = useModal();
  const total: number = useAppSelector((state) => state.cart.totalPrice);
  const items: itemType[] = useAppSelector((state) => state.cart.items);
  const [isDefaultMethod, setMethodDefault] = useState(true);
  const userID = auth.currentUser.uid;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!items.length) closeModal();
  }, [items]);

  const updateUserPlan = (plan: string) => {
    console.log(`Plan has been updated. New plan is: ${plan}`);
  };
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  return (
    <View style={{ backgroundColor: "#FAFAFA", flex: 1 }}>
      <SAView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, zIndex: 955 }}>
          <View style={{ flex: 1, margin: normalize(26) }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{ flex: 1, alignItems: "center" }}
                onPress={closeModal}
              >
                <EIcon
                  name={"chevron-small-left"}
                  color={"#141314"}
                  size={42}
                />
              </TouchableOpacity>

              <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    textAlign: "center",
                    fontFamily: "Cera-Pro-Bold",
                    fontSize: normalize(28),
                  }}
                >
                  Кошик
                </Text>
              </View>
              <TouchableOpacity
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => {
                  dispatch(cartClean());
                  closeModal();
                }}
              >
                <Iconify icon={"ph:trash-bold"} size={32} color={"#141314"} />
              </TouchableOpacity>
            </View>

            <FlatList
              collapsable
              data={items}
              renderItem={(item) => <CartItem item={item.item} />}
            />
          </View>
          <View
            style={{
              flexGrow: items.length > 1 ? 0 : 1,
              justifyContent: "space-between",
            }}
          >
            <View>
              <ContinueButton
                pv={normalize(16)}
                onPress={() => {
                  onClickClose && onClickClose();
                  closeModal();
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 4,
                    paddingTop: 4,
                  }}
                >
                  <Icon
                    name={"plus-square-o"}
                    color={"#fff"}
                    size={normalize(24)}
                  />
                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontFamily: "Cera-Pro-Black",
                      letterSpacing: 0.3,
                      fontSize: 14,
                      color: "#FBF7F0",
                    }}
                  >
                    ДОДАТИ ЩЕ
                  </Text>
                </View>
              </ContinueButton>
              <View
                style={{
                  marginTop: normalize(12),
                  backgroundColor: "#fff",
                  width: "100%",
                  padding: normalize(24),
                  gap: normalize(12),
                  borderRadius: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Manrope-Bold",
                      color: "#141314",
                      fontSize: normalize(22),
                    }}
                  >
                    Всього
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Manrope-Bold",
                      color: "#141314",
                      fontSize: normalize(22),
                    }}
                  >
                    {total},00 ₴
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontFamily: "Manrope",
                        color: "#141314",
                        fontSize: normalize(22),
                      }}
                    >
                      Сервісний збір
                    </Text>
                    <IOIcon
                      name={"information-circle-outline"}
                      style={{ marginLeft: normalize(12) }}
                      size={normalize(22)}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "Manrope-",
                      color: "#141314",
                      fontSize: normalize(22),
                    }}
                  >
                    {5},00 ₴
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Manrope",
                      color: "#141314",
                      fontSize: normalize(22),
                    }}
                  >
                    Плата за доставку
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Manrope",
                      color: "#141314",
                      fontSize: normalize(22),
                    }}
                  >
                    {60},00 ₴
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Manrope-Bold",
                      color: "#141314",
                      fontSize: normalize(22),
                    }}
                  >
                    Разом
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Manrope-Bold",
                      color: "#141314",
                      fontSize: normalize(22),
                    }}
                  >
                    {total + 60 + 5},00 ₴
                  </Text>
                </View>
              </View>
            </View>
            <View style={{}} />
            <View
              style={{
                width: "100%",
                backgroundColor: "#fff",
                paddingHorizontal: normalize(24),
                gap: normalize(14),
                paddingVertical: normalize(28),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Manrope-Bold",
                    color: "#141314",
                    fontSize: normalize(22),
                  }}
                >
                  Разом
                </Text>
                <Text
                  style={{
                    fontFamily: "Manrope-Bold",
                    color: "#141314",
                    fontSize: normalize(22),
                  }}
                >
                  {total + 60 + 5},00 ₴
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {isDefaultMethod ? (
                  <TouchableOpacity
                    onPress={() => setMethodDefault(false)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Fontisio name={"apple-pay"} size={normalize(29)} />
                    <View style={{ gap: normalize(6) }}>
                      <Text>
                        {Platform.OS === "ios" ? "Apple pay" : "Google pay"}
                      </Text>
                      <Text>Змінити</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <Text
                  style={{
                    fontFamily: "Manrope",
                    color: "#141314",
                    fontSize: normalize(22),
                  }}
                >
                  {total + 60 + 5},00 ₴
                </Text>
              </View>
              {isDefaultMethod ? (
                <PlatformPayButton
                  type={PlatformPay.ButtonType.Pay}
                  onPress={() =>
                    initPlatformPayment({
                      userID,
                      ids: items.map((el: itemType) => el?.id),
                      planName: "silver",
                      totalPrice: total + 60 + 5,
                      updateUserPlan,
                      createPaymentIntent,
                    })
                  }
                  style={{
                    height: 48,
                    width: "100%",
                    padding: 0,
                  }}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        </SafeAreaView>
      </SAView>
    </View>
  );
};
