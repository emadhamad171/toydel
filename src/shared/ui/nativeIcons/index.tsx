import { Iconify } from "react-native-iconify";
import React from "react";
import { normalize } from "../../lib";

const defaultIconSize = normalize(32);

export const NativeCategoryIcons = {
  "mdi:lego": ({ color, size = defaultIconSize }) => (
    <Iconify icon="mdi:lego" color={color} size={size} />
  ),
  "mingcute:bear-fill": ({ color, size = defaultIconSize }) => (
    <Iconify icon="mingcute:bear-fill" color={color} size={size} />
  ),
  "icon-park-outline:cube": ({ color, size = defaultIconSize }) => (
    <Iconify icon="icon-park-outline:cube" color={color} size={size} />
  ),
  "teenyicons:robot-solid": ({ color, size = defaultIconSize }) => (
    <Iconify icon="teenyicons:robot-solid" color={color} size={size} />
  ),
  "mingcute:toy-horse-fill": ({ color, size = defaultIconSize }) => (
    <Iconify icon="mingcute:toy-horse-fill" color={color} size={size} />
  ),
  "material-symbols:toys": ({ color, size = defaultIconSize }) => (
    <Iconify icon="material-symbols:toys" color={color} size={size} />
  ),
  "file-icons:sandbox": ({ color, size = defaultIconSize }) => (
    <Iconify icon="file-icons:sandbox" color={color} size={size} />
  ),
  "ph:star-four-fill": ({ color, size = defaultIconSize }) => (
    <Iconify icon="ph:star-four-fill" color={color} size={size} />
  ),
};
