import { useState, useEffect } from "react";
import Todo from "./Todo";
import { getAll } from "./utils"
import AddTodo from "./AddTodo";

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

export default function Todos({ id, callbackAllCompleted }) {

  const [allTodos, setAllTodos] = useState([]);
  const [isAddTodo, setIsAddTodo] = useState(false);

  const setMarkComplete = (id) => {
    setAllTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  }

  useEffect(() => {
    async function fetchData() {
      let { data } = await getAll(TODOS_URL);
      setAllTodos(data)
    }
    fetchData();
  }, [])
 
  //generate a map list of all users and if they have al their's todos completed
  useEffect(() => {
    const userIds = [...new Set(allTodos.map(todo => todo.userId))];
    const completedUsersMap = userIds.reduce((acc, userId) => {
      const userTodos = allTodos.filter(todo => todo.userId === userId);
      acc[userId] = userTodos.every(todo => todo.completed);
      return acc;
    }, {});
    callbackAllCompleted(completedUsersMap)
  }, [allTodos]);

  //get the current user todos according to chosen id
  const todos = allTodos.filter((todo) => {
    return todo.userId === id;
  })

  const handleAddTodo = () => {
    setIsAddTodo(true)
  }
  const cancleAddTodoCallback = (childValue) => {
    setIsAddTodo(childValue)
  }

  const addTodoCallback = (todoTitle) => {
    const newTodo = {
      title: todoTitle,
      completed: false,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      userId: id
    }
    setAllTodos([...allTodos, newTodo])
    alert(`New todo ${todoTitle} added`)
    setIsAddTodo(false)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <b>Todos - User {id}</b>
        {
          !isAddTodo && <button style={{ marginLeft: 'auto', marginBottom: '5px' }} onClick={handleAddTodo}>Add</button>
        }

      </div>
      <div style={{ border: "1px solid black" }}>
        {
          isAddTodo ? (<AddTodo cancleAddTodoCallback={cancleAddTodoCallback} addTodoCallback={addTodoCallback} />)
            :
            (todos.map((todo) => <Todo key={todo.id} todo={todo} callbackMarkComplete={setMarkComplete} />))
        }
      </div>
    </>

  )
}  