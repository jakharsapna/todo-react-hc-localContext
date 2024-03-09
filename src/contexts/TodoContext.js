import { createContext,useContext } from "react";

export const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:"todo msg",
            completed:false
        }
    ],
    addTodo:(todo)=>{},
    removeTodo:(id)=>{},
    checkedTodo:(id)=>{},
    editTodo:(todo,id)=>{}
})

export const useTodo=()=>{
    return  useContext(TodoContext)
}

export const TodoProvider= TodoContext.Provider