import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./providers/redux";
import { stripePublishableKey } from "react-native-dotenv";
import { StripeProvider } from "@stripe/stripe-react-native";
import ApplicationFlow from "../processes/app";
import { LogBox, Platform, View, StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "@expo-google-fonts/inter";
import {
  appSetConnection,
  appSetIsResetPassword,
  appSetLoading,
  appSetOffset,
  appSetOobCode,
  useAppDispatch,
  useAppSelector,
  useModal,
  wait,
  windowHeight,
  windowWidth,
} from "@shared";
import { AnimatePresence, MotiView } from "moti";
import { WelcomeLoading } from "../screens";
import * as Network from "expo-network";
import * as Linking from "expo-linking";
import { parseDeepLink } from "./lib";
import NetworkProblemScreen from "../screens/lostConnection";
import { useSafeAreaInsets } from "react-native-safe-area-context";
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <StripeProvider
        publishableKey={stripePublishableKey}
        merchantIdentifier="merchant.com.toydelapp"
      >
        <AppFlow />
      </StripeProvider>
      <Toast />
    </Provider>
  );
}

export function AppFlow() {
  const isConnectionLost = useAppSelector(
    (state) => state.config.isConnectionLost,
  );
  const isLoading = useAppSelector((state) => state.config.isLoading);
  const [isWelcomeShown, setWelcomeShown] = useState(false);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    "Shantell-Sans": require("../../assets/fonts/ShantellSans-ExtraBold.ttf"),
    "Cera-Pro": require("../../assets/fonts/CeraPro-Regular.ttf"),
    "Cera-Pro-Bold": require("../../assets/fonts/CeraPro-Bold.ttf"),
    "Cera-Pro-Black": require("../../assets/fonts/CeraPro-Black.ttf"),
    Manrope: require("../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("../../assets/fonts/Manrope-Bold.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      const status = await Network.getNetworkStateAsync();
      Linking.addEventListener("url", (event) => {
        const ops = parseDeepLink(event.url);
        if (ops["mode"]) {
          switch (ops["mode"]) {
            case "resetPassword":
              dispatch(appSetIsResetPassword(true));
              dispatch(appSetOobCode(ops["oobCode"]));
              break;
            default:
              break;
          }
        }
      });
      dispatch(appSetConnection(status.isConnected));
      if (insets.top || insets.bottom) {
        dispatch(appSetOffset({ bottom: insets.bottom, top: insets.top }));
      }
    };
    prepare();
  }, []);

  const { Modal, isOpen } = useModal("Налаштування");

  if (fontsLoaded) {
    wait().then(() => {
      SplashScreen.hideAsync();
    });
  } else {
    return null;
  }

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#fff" }}>
      <AnimatePresence exitBeforeEnter>
        {isLoading && !isWelcomeShown && (
          <WelcomeLoading
            closeLoading={() => {
              dispatch(appSetLoading(false));
              setWelcomeShown(true);
            }}
          />
        )}
      </AnimatePresence>
      {!isConnectionLost ? (
        Platform.OS === "ios" ? (
          <ApplicationFlow />
        ) : (
          !isLoading && <ApplicationFlow />
        )
      ) : (
        <NetworkProblemScreen />
      )}
      <AnimatePresence exitBeforeEnter>
        {isOpen && <ModalWrapper>{Modal && <Modal />}</ModalWrapper>}
      </AnimatePresence>
    </View>
  );
}

const ModalWrapper = ({ children }: { children: any }) => {
  const { isAnimateFromLeft } = useModal();
  const backgroundColor = useAppSelector(
    (state) => state.modal.backgroundColor,
  );
  return (
    <MotiView
      from={{
        translateX: isAnimateFromLeft ? -windowWidth : 0,
        translateY: !isAnimateFromLeft ? windowHeight : 0,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
        translateY: 0,
      }}
      exit={{
        opacity: 0,
        translateX: isAnimateFromLeft ? -windowWidth : 0,
        translateY: !isAnimateFromLeft ? windowHeight : 0,
      }}
      transition={{
        type: "timing",
        duration: 600,
      }}
      exitTransition={{
        type: "timing",
        duration: 600,
      }}
      style={{
        width: windowWidth,
        height: windowHeight,
        position: "absolute",
        zIndex: 999,
        backgroundColor: backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MotiView
        from={{
          scale: 1,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          type: "timing",
          duration: 500,
        }}
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: backgroundColor,
        }}
      >
        {children}
      </MotiView>
    </MotiView>
  );
};
