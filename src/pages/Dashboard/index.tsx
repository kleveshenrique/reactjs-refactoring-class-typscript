import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';


export function Dashboard(){
 
interface IFood{   
  "id": number,   
  "name": string,
  "description": string,
  "price": string,
  "available": boolean,
  "image": string
}

const [foods,setFoods] = useState<IFood[]>([])
const [editingFood,setEditingFood] = useState<IFood>({} as IFood)
const [modalOpen,setModalOpen] = useState(false)
const [editModalOpen,setEditModalOpen] = useState(false)


useEffect(()=>{
    api.get('/foods').then(res=>{
      setFoods(res.data);      
    })
 },[])

 type inputFood = Omit<IFood,'id' | 'available'>

const handleAddFood = async (food:inputFood):Promise<void> => {  
  try {
    const response = await api.post('/foods', {
      ...food,
      available: true,
    });
    const data = response.data    
    setFoods([...foods,data])    
  } catch (err) {
    console.log(err);
  }
}

const handleUpdateFood = async (food:inputFood):Promise<void> => {  
  try {
    const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
      ...editingFood,
      ...food,
    });
    const foodsUpdeted = foods.map(f=>f.id!==foodUpdated.data.id ? f :foodUpdated.data)
    setFoods(foodsUpdeted)    
  } catch (err) {
    console.log(err);
  }
}

const handleDeleteFood = async (id: number) => {
  
  await api.delete(`/foods/${id}`);

  const foodsFiltered = foods.filter(food => food.id !== id);

  setFoods(foodsFiltered)  
}

const toggleModal = () => {
  setModalOpen(!modalOpen)    
}

const toggleEditModal = () => {
  setEditModalOpen(!editModalOpen)   
}

const handleEditFood = async (food:IFood) => {      
  setEditingFood(food)     
  setEditModalOpen(true)   
}
  
return (
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
    );
  
}


