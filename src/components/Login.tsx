import React, { useState } from 'react'
import { cb, initOptions } from '../clearblade';

import TodoList from './TodoList';
import CreateTodo from './CreateTodo';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showTodoList, setShowTodoList] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(true);

  // Login connection with ClearBlade
  const submitLogin = (e: React.MouseEvent) => {
    e.preventDefault();

    const initCallback = (err: boolean, data: any) => {
      if (err) {
        console.log ('login failed');
      } else {
        console.log('login successful');
        setShowLogin(false);
        setShowTodoList(true);
      };
    };

    initOptions.email = email;
    initOptions.password = password;
    initOptions.callback = initCallback;
    cb.init(initOptions);
  };

  // First thing rendered
  const renderLogin = () => {
    if (showLogin) {
      return (
        <div className={styles.loginContainer}>
          <div className={styles.gradient}></div>
          <div className={styles.formContainer}>
            <span className={styles.loginTitle}>ToDo List</span>
            <span className={styles.signIn}>Sign In</span>
            <form className={styles.loginForm}>
              <div className={styles.emailContainer}>
                <label className={styles.emailLabel}>Email</label>
                <input className={styles.emailInput} value={email} onChange={e=> setEmail(e.target.value)} type="text" placeholder="email" />
              </div>
              <div className={styles.passwordContainer}>
                <label className={styles.passwordLabel}>Password</label>
                <input className={styles.passwordInput} value={password} onChange={e=> setPassword(e.target.value)} type="text" placeholder="password" />
              </div>
              <div className={styles.submitContainer}>
                <button className={styles.submitBtn} onClick={submitLogin} type="submit">Submit</button>
              </div>
            </form>
            <span className={styles.permissionText}>*Click submit if anonymous is granted permission</span>
          </div>
        </div>
      )
    }
  }

  // If login was successfull
  const renderTodos = () => {
    if (showTodoList) {
      return (
        <React.Fragment>
          <CreateTodo />
          <TodoList />
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      {renderLogin()}
      <div className={styles.todosContainer}>
        {renderTodos()}
      </div>
    </React.Fragment>
  );
};

export default Login;
