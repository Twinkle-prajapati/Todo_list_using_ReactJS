import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {Form ,Container} from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Delete';





export default function List() {
  const[todo,setTodo]=useState();
  const[data,setData]=useState([])
  useEffect(()=>{
    fetchTodo()
  },[])

  async function fetchTodo(){
    try {
    let res = await fetch("http://localhost:3000/todos",{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    });
    res = await res.json()
    console.log("message",res);

    if(res)
        {

          setData(res)
            console.log(res);
        }
    }catch(error){
            console.log(error);
    }

}

  async function addTodos(){
    let data = {todo}
    console.log(todo);

    let res = await fetch("http://localhost:3000/todos",{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(data)
    })
    res = await res.json()
    console.log("message",res);
    if(res)
      {
        alert("Data successfully added")
        setTodo('');
        fetchTodo()
      }
  }

 async function deleteTodo(id){
  let todo_id = id;
  console.log(todo_id);

  let res = await fetch(`http://localhost:3000/todos/${todo_id}`,{
    method:'DELETE',
    headers:{
      "Content-Type":"application/json",
      "Accept": "application/json"
    },
  })
  res = await res.json()
  console.log("message",res);

  if(res)
    {
      alert("Todo deleted successfully")
      fetchTodo()
    }
 }





  return (
    <Container style={{display:'flex', alignItems:'center',justifyContent:'center',height:"100vh"}}>
    <Card className='p-5 border-0' style={{ width: '35rem', height: 'auto',boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",maxHeight:"50vh",overflowY:"auto"}}>
      <h2 className='text-center mb-4'>Todo List</h2>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Input Your Todo-list" value={todo}
          onChange={(e)=>{setTodo(e.target.value)}}
        />
        <Button className='bg-primary text-white px-4' onClick={addTodos} style={{cursor :'pointer'}}>
         ADD
        </Button>

      </InputGroup>




<div className='mt-4'>
        {data.map((item)=>(
    <InputGroup key={item.id} className='mb-4'>
    <Form.Control value ={item.todo}/>
    <InputGroup.Text className='px-3' style={{cursor :'pointer'}}><EditIcon className='text-success'/></InputGroup.Text>
    <InputGroup.Text className='px-3' style={{cursor :'pointer'}}><DeleteIcon className='text-danger' onClick={()=>{deleteTodo(item.id)}}/></InputGroup.Text>
  </InputGroup>))}
  </div>

    </Card>
    </Container>
  )
}



