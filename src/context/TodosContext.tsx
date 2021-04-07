import { ReactNode, useState, createContext } from 'react';

export type Props = {
  children: ReactNode;
};

type StateTodos = {
  title: string,
  description: string,
  completed: boolean,
  item_id: number
}

interface ContextProps {
  todos: StateTodos[],
  setTodos: Function,
  addTodos: Function
}

export const TodosContext = createContext<ContextProps>({
  todos: [],
  setTodos: () => null,
  addTodos: () => null
})

export const TodosListProvider = (props: Props) => {
  const [todos, setTodos] = useState<StateTodos[]>([]);

  const addTodos = (todo: StateTodos) => {
    setTodos(prevState => [...prevState, todo]);
  };

  return (
    <TodosContext.Provider value={{ todos, setTodos, addTodos }}>
      {props.children}
    </TodosContext.Provider>
  )
};