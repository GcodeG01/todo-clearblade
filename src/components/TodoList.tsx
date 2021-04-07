import { useEffect, useContext } from 'react';
import { cb } from '../clearblade';
import { TodosContext } from '../context/TodosContext';

import UpdateTodo from './UpdateTodo';
import styles from './TodoList.module.css'

const TodoList = () => {
  const { todos, addTodos } = useContext(TodosContext);

  // Fetch todos from ClearBlade
  useEffect(() => {

    const fetchData = () => {
      const collection = cb.Collection({collectionName: "ToDos"});
      collection.fetch((err: boolean, rows: any[]) => {
        if (err) {
          console.log('Could not fetch collection')
        } else {
          console.log('Successfully fetched collection')
          rows.map((val: any) => addTodos(val.data));
        };
      });
    };
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.todoListContainer}>
      {todos.map((todo) => {
        return <UpdateTodo key={todo.item_id} todo={todo} />
      })}
    </div>
  )
}

export default TodoList;
