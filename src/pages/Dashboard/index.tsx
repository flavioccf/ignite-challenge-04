import { useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useEffect } from 'react';
import { FoodInterface } from '../../types';

function Dashboard() {
  const [foods, setFoods] = useState<FoodInterface[]>([])
  const [editingFood, setEditingFood] = useState<FoodInterface>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const getFood = async () => {
      const { data } = await api.get<FoodInterface[]>('/foods');
      setFoods(data);
    }
    getFood()
  },[])
  const handleAddFood = async (food: FoodInterface) => {
    const addFood = [...foods];
    try {
      const response = await api.post<FoodInterface>('/foods', {
        ...food,
        available: true,
      });

      setFoods([...addFood, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: FoodInterface) => {
    const updatedFoods = [...foods]
    const editFood = {...editingFood}
    try {
      if(!editFood) throw Error('Sem comida para editar')
      const foodUpdated = await api.put<FoodInterface>(
        `/foods/${editFood.id}`,
        { ...editFood, ...food },
      );
      const foodsUpdated = updatedFoods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    const removedFoods = [...foods]
    try {
      await api.delete(`/foods/${id}`);
      const foodsFiltered = removedFoods.filter(food => food.id !== id);
      setFoods(foodsFiltered)
    } catch (err) {
      console.log(err);
    }
  }

  const toggleModal = () => {
   setModalOpen(!modalOpen)
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditFood = (food: FoodInterface) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return(
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    )  
};

export default Dashboard;
