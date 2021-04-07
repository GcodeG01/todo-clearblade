import React, { useContext } from 'react';
import { cb } from '../clearblade';
import { TodosContext } from '../context/TodosContext';

import styles from './DeleteTodo.module.css'

type IdProp = {
  item_id: number
}

const DeleteTodo = ({ item_id }: IdProp) => {
  const { todos, setTodos } = useContext(TodosContext)

  const delTodo = (e: React.MouseEvent) => {
    e.preventDefault();
    const callback = (err: boolean, data: any) => {
      if (err) {
        console.log('could not delete successfully');
      } else {
        const filteredTodos = todos.filter(todo => todo.item_id !== item_id);
        setTodos(filteredTodos);
      };
    };
    cb.Code().execute('deleteToDos', { item_id }, callback);
  };

  return (
    <button onClick={delTodo} className={styles.btnDelete}>X</button>
  );
};

export default DeleteTodo;
