import React from 'react'
import AddProductForm from './AddPage'
import { auth } from '@/auth';
const Add = async() => {
  const session = await auth();
  const user = session?.user
  return (
    <div>
      <AddProductForm  user={user}/>
    </div>
  )
}

export default Add
