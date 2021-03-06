import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { prisma } from '../lib/prisma'
import styles from '../styles/Home.module.css'


interface FormData {
  name: string 
  email: string
  id: string
}

interface UserData{
  users:{
    name:string
    email:string
    id:string
  }[]
  
  
}

const Home = ({users}:UserData) => {
  const [form,setForm] = useState({name:'',email:'',id:''})
const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath )
  }

  async function create(data:FormData) {

    try{
      fetch('/api/create',{
        body:JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        },
        method:'POST'
      }).then(()=> {setForm({name:'',email:'',id:''}) 
      refreshData()
    }
      )
    
    }catch(error){
      console.log(error);
      
    }
    
  }


async function deleteUser(id:string) 
{

  try{
    fetch(`/api/user/${id}`,{
      headers:{
        "Content-Type":"application/json",
      },
      method:'DELETE'
    }).then(() =>{
      refreshData()
    })
  
  }catch (error) {
    console.log(error);
    
  }
  
}

async function updateUser(id:string,data:FormData) 
{

  try{
    fetch(`/api/user/${id}`,{
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json",
      },
      method:'PUT'
    }).then(() =>{
      refreshData()
    })
  
  }catch (error) {
    console.log(error);
    
  }
  
}

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Users
        </h1>

<form className={styles.userform} onSubmit={e => {
  e.preventDefault()
  create(form)
  
}}>
  <input type="text" placeholder='Nome' value={form.name} onChange={e => setForm({...form,name: e.target.value})} />
  <input type="text" placeholder='Email' value={form.email} onChange={e => setForm({...form,email: e.target.value})} />
  <button type='submit'>Add</button>

</form>
<div>
  <ul className={styles.userList}>
    {users.map(user =>(
      <li key={user.id}>
        <h3>{user.name}</h3>
        <span>{user.email}</span>
   <button onClick={() => updateUser(user.id,form)}>Update</button> 
        <button onClick={() => deleteUser(user.id)}>Delete</button>
        </li>
    ))}
  </ul>
</div>
       
      </main>

      
    </div>
  )
}

export default Home

export const getServerSideProps:GetServerSideProps = async() => {
  const users = await prisma.user.findMany({
    select:{
      email:true,
      id:true,
      name:true
    }
  })

    return{
      props:{
        users
      }
    }
  
}