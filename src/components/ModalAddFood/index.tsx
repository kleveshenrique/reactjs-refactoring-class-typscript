//import { createRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { useRef } from 'react';
import { FormHandles } from '@unform/core';

interface Food{
  "id" : number,
  "name": string,
  "description": string,
  "price": string,  
  "available": boolean,
  "image": string
}

type inputData = Omit<Food,'id' | 'available'>

interface FoodProps{   
  isOpen:boolean
  setIsOpen: ()=>void,
  handleAddFood : (data:inputData)=>void
}

export function ModalAddFood({setIsOpen,handleAddFood,isOpen} : FoodProps){ 
  
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = (data:inputData) =>{              
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

}


