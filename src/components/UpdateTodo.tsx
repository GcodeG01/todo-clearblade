import React, { useState } from 'react';
import { cb } from '../clearblade';

import DeleteTodo from './DeleteTodo';
import styles from './UpdateTodo.module.css'

type TodoProp = {
  todo: {
    title: string,
    description: string,
    completed: boolean,
    item_id: number
  }
}

const UpdateTodo = ({ todo }: TodoProp) => {
  const { title, description, completed, item_id } = todo;

  const [updateToggle, setUpdateToggle] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newCompleted, setNewCompleted] = useState<boolean>(completed);
 
  // Send update todo to ClearBlade
  const updateTodo = () => {
    const params = { item: { title: newTitle, description: newDescription, completed: !newCompleted, item_id } };
    const callback = (err: boolean, data: any) => {
      if (err) {
        console.log('could not update successfully');
      } else {
        console.log('updated successfully')
      };
    };
    cb.Code().execute('updateToDos', params, callback);
  };

  let btnUpgradeName = 'update';
  let btnUpgrade = <button onClick={() => handleUpdate()} className={styles.btnUpdate}>{btnUpgradeName}</button>;
  let renderTitle = <span className={styles.todoTitle}>{title}</span>;
  let renderDescription = <span className={styles.description}>{description}</span>;

  if (updateToggle) {
    // Visual text of todo.
    btnUpgradeName = 'update';
    btnUpgrade = <button onClick={() => handleUpdate()} className={styles.btnUpdate}>{btnUpgradeName}</button>;
    renderTitle = <span className={styles.todoTitle}>{newTitle}</span>;
    renderDescription = <span className={`${styles.description} ${newCompleted ? styles.strikeThrough : null}`}>{newDescription}</span>;
  } else {
    // Able to update todo.
    btnUpgradeName = 'Done';
    btnUpgrade = <button onClick={() => handleDoneUpdate()} className={styles.btnUpdate}>{btnUpgradeName}</button>;
    renderTitle = <input value={newTitle} onChange={e => setNewTitle(e.target.value)} className={styles.inputTitle} placeholder={title} />;
    renderDescription = <textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} className={styles.inputDescription} placeholder={description} />;
  };

  const handleUpdate = () => {
    setUpdateToggle(false);
  };

  const handleDoneUpdate = () => {
    setUpdateToggle(true);
    updateTodo();
  };

  const checkCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCompleted(e.target.checked)
    updateTodo();
  }

  return (
    <div className={styles.container} key={item_id}>
      <div className={styles.topContainer}>
        {renderTitle}
        <DeleteTodo item_id={item_id}/>
      </div>
      <div className={styles.midContainer}>
        {renderDescription}
        <div className={styles.completeContainer}>
          <span className={styles.spanComplete}>{newCompleted ? 'complete' : 'uncomplete'}</span>
          <input type="checkbox" onChange={checkCompleted} checked={newCompleted} />
        </div>
      </div>
      <div className={styles.btnContainer}>
        {btnUpgrade}
      </div>
    </div>
  );
};

export default UpdateTodo;
