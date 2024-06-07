import Toast from "react-native-toast-message";
import {
  getCurrentUser,
  loadSpecialItems,
  loadUser,
  updateUserImage,
  db,
} from "@shared";
import { chatType, itemType, notificationType, userType } from "./types";
import { defaultPhoto } from "./constants";
import { Dimensions, PixelRatio } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export * from "./types";
export * from "./payments";
export * from "./constants";

export const loadBaseColorTheme = async (baseTheme: string) => {
  const colorTheme = await AsyncStorage.getItem("colorTheme");
  if (!colorTheme) await setBaseColorTheme(baseTheme);
  return colorTheme || baseTheme;
};
export const setBaseColorTheme = async (colorTheme = "dark") => {
  await AsyncStorage.setItem("colorTheme", colorTheme);
};

export const loadNotificationStatus = async () => {
  const isNotificationOff = await AsyncStorage.getItem("notificationOff");
  return isNotificationOff === "true";
};
export const setNotificationStatus = async (status: boolean) => {
  await AsyncStorage.setItem("notificationOff", `${status}`);
};

export const { width: windowWidth, height: windowHeight } =
  Dimensions.get("window");
export const normalize = (fontSize) =>
  Math.round(PixelRatio.roundToNearestPixel((windowHeight / 1080) * fontSize));

export const wait = async (duration?: number) => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, duration || 600);
  });
};

export const screenOptions: {
  headerShown: boolean;
  tabBarShowLabel: boolean;
  headerTitleAlign: "left" | "center";
  tabBarStyle: any;
  tabBarLabelStyle: any;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
} = {
  headerShown: false,
  tabBarShowLabel: true,
  headerTitleAlign: "center",
  tabBarActiveTintColor: "#5753D8",
  tabBarInactiveTintColor: "rgba(0,0,0,0.5)",
  tabBarLabelStyle: {
    // fontSize: normalize(20),
    fontSize: 14,
  },

  tabBarStyle: {
    height: 90,
    backgroundColor: "#fff",
    borderTopColor: "#fff",
    alignItems: "center",
    borderTopWidth: 0,
  },
};
export const signInSuccessfulToast = () => {
  Toast.show({
    type: "success",
    text1: "Log in successfully!",
    text2: "",
    position: "top",
    swipeable: true,
  });
};
export const signInWarningToast = (text = "Try again") => {
  Toast.show({
    type: "error",
    text1: "Something went wrong.",
    text2: text,
    position: "top",
    swipeable: true,
  });
};

export const updateImage = async ({ setUserImage }) => {
  try {
    const userInstance = getCurrentUser();
    const options: any = {
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: true,
    };
    const res = await launchImageLibrary(options);
    const uri = res?.assets && res.assets[0].uri;
    uri && (await updateUserImage({ userInstance, uri }));
    uri && setUserImage(uri);
  } catch (e) {
    console.log(e);
  }
};

export const loadOrCreateUser = async ({ userInstance }) => {
  const user = (await loadUser({ userID: userInstance.uid }))[0];
  if (user) {
    return user;
  }
  const newChat: chatType = {
    isActive: false,
    adminID: "",
    messages: [],
    customerName: userInstance?.displayName || "User",
    photoURL: userInstance?.photoURL || "",
    date: formatDate(new Date()),
    id: userInstance?.uid,
  };

  const userCreateInstance: userType = {
    id: userInstance.uid,
    displayName: userInstance?.displayName || "Set Name",
    email: userInstance?.email || "",
    phoneNumber: userInstance?.phoneNumber || "",
    favoriteList: [""],
    ownedList: [],
    plan: {
      name: "default",
      numberOfToys: 0,
    },
    photoURL: userInstance?.photoURL || defaultPhoto,
    bio: "I Love Toy App!",
    location: null,
    isOnboarded: false,
  };

  await db.collection("chats").doc(userInstance.uid).set(newChat);
  await db.collection("users").doc(userInstance.uid).set(userCreateInstance);
  return userCreateInstance;
};

export const loadFavoriteData = async ({
  setFavoriteList,
  userID,
  setFavoriteListIds,
  setLoading,
}) => {
  const user = await loadUser({ userID });
  const favoriteList = user[0].favoriteList;
  const specOps = {
    filedPath: "id",
    opStr: "in",
    data: favoriteList,
  };
  const favoriteListItems = await loadSpecialItems({ path: "items", specOps });
  setFavoriteList(favoriteListItems);
  setFavoriteListIds(favoriteList);
  setLoading(false);
};

export const notificationSample: notificationType = {
  id: "0",
  title: "",
  description: "",
  photoURL: defaultPhoto,
  isIndividual: false,
  iconName: "",
};

export const notificationStackSample: notificationType[] = [
  notificationSample,
  { ...notificationSample, id: "1" },
  { ...notificationSample, id: "2" },
];

export const itemSample: itemType = {
  brand: "brand",
  category: ["Category"],
  description: "description",
  id: "0a",
  isIncludedInPlan: true,
  name: "Name of Toy",
  photo: defaultPhoto,
  price: 400,
  rate: 4,
};

export const itemsStackSample: itemType[] = [
  itemSample,
  { ...itemSample, id: "1c" },
  { ...itemSample, id: "2s" },
  { ...itemSample, id: "3d" },
  { ...itemSample, id: "4e" },
  { ...itemSample, id: "5f" },
];
export function formatDate(date: Date) {
  // Get date components
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  // Adjust hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Add leading zeros if necessary
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedHoursStr =
    formattedHours < 10 ? "0" + formattedHours : formattedHours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the formatted date string
  return `${formattedMonth}-${formattedDay}-${year} ${formattedHoursStr}:${formattedMinutes}${period}`;
}

export const isPhoneNumberValidator = /[^0-9+]+/;
export const emailValidator =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))/;
export const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/;
