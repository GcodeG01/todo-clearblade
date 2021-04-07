import { TodosListProvider } from './context/TodosContext';
import Login from './components/Login';
import styles from './App.module.css';

const App = () => {
  return (
    <TodosListProvider>
      <div className={styles.container}>
        <Login />
      </div>
    </TodosListProvider>
  )
};

export default App;