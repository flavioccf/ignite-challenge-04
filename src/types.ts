import { IconType } from "react-icons";

export interface FoodInterface {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

export interface InputInterface {
  name: string,
  icon: IconType
}