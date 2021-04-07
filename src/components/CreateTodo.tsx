import React, { useContext, useState } from 'react'
import { cb } from '../clearblade';
import { TodosContext } from '../context/TodosContext';

import styles from './CreateTodo.module.css';

const CreateTodo = () => {
  const { addTodos } = useContext(TodosContext);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Submit new todo to ClearBlade & update visual todos
  const submitTodo = (e: React.MouseEvent) => {
    e.preventDefault();
    const params = { item: { title, description } };
    const callback = (err: boolean, data: any) => {
      if (err) {
        console.log('could not create todo');
      } else {
        addTodos({
          completed: false,
          description: params.item.description,
          item_id: data.results[0].item_id,
          title: params.item.title
        })
        setTitle('')
        setDescription('')
      }
    };
    cb.Code().execute('createToDos', params, callback);
  };

  return (
    <div className={styles.createContainer}>
      <span className={styles.createText}>Create a ToDO</span>
      <form className={styles.createForm}>
        <label className={styles.titleLabel}>Title</label>
        <input className={styles.titleInput} value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="title" />
        <label className={styles.descLabel}>Description</label>
        <textarea className={styles.descTxtArea} value={description} onChange={e => setDescription(e.target.value)} placeholder="description" />
        <div className={styles.btnContainer}>
          <button className={styles.submitBtn} onClick={submitTodo} type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTodo;