import { IconType } from 'react-icons';

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
  icon?: IconType,
  placeholder?: string
}

export interface AddFoodInterface {
  isOpen: boolean,
  setIsOpen: () => void,
  handleAddFood: (food: FoodInterface) => void,
}

export interface ModalEditFoodInterface {
  isOpen: boolean,
  setIsOpen: () => void,
  handleUpdateFood: (food: FoodInterface) => void,
  editingFood: FoodInterface | undefined,
}

export interface FoodComponentInterface {
  food: FoodInterface, 
  handleEditFood: (food: FoodInterface)=> void, 
  handleDelete: (id: number) => void
}

export interface HeaderInterface {
  openModal: () => void
}