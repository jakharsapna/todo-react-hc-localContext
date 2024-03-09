import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItems } from './components'

export function App() {
  const [todos, setTodos] = useState([])

  const addTodo=(todo)=>{
    setTodos((prev)=>([{id:Date.now(),...todo},...prev]))
  }
  const editTodo=(id,todo)=>{
     setTodos((prev)=>prev.map(prevTodo=>prevTodo.id===id? todo:prevTodo))
  }
  const removeTodo=(id)=>{
    setTodos((prev)=>prev.filter(prevTodo=>prevTodo.id!==id))
  }
  const checkedTodo=(id)=>{
   return setTodos(todos.map(prevTodo=>prevTodo.id===id?{ ...prevTodo,completed:!prevTodo.completed} :prevTodo ))
  }//override
  
 //local storage
 useEffect(() => {
  const todos=JSON.parse(localStorage.getItem("todos"))
  if(todos.length>0 && todos){
    setTodos(todos)
  }
 }, [])

 useEffect(() => {
  localStorage.setItem("todos",JSON.stringify(todos))
 }, [todos])
 


  return (
    <TodoProvider value={{todos,removeTodo,addTodo,checkedTodo,editTodo}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItems todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}
