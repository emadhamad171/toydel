import { itemType } from "@shared";

export interface infiniteScrollProps {
  items: itemType[];
  step?: number;
  initialPage?: number;
}
