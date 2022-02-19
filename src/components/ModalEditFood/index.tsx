import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { useRef } from 'react';
import { FormHandles } from '@unform/core';

type FoodData={
  "id": number,   
  "name": string,
  "description": string,
  "price": string,
  "available": boolean,
  "image": string
}

interface FoodProps{  
  isOpen:boolean,   
  setIsOpen: ()=>void,
  handleUpdateFood : (data:FoodData)=>void,
  editingFood:{}
}


export function ModalEditFood(props:FoodProps){   
  
  const formRef = useRef<FormHandles>(null)
  const { isOpen, setIsOpen,handleUpdateFood, editingFood } = props;
  
  const handleSubmit = async (data:FoodData) => {        
    handleUpdateFood(data);
    setIsOpen();   
  };


    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
}

