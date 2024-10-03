import { auth } from '@/auth';
import React from 'react'
import EditCategorys from '../EditComp'
const Category =async ({params}) => {
  const session = await auth();
  const user = session?.user;
 
  return (
    <div>
     <EditCategorys id={params.id} userId ={user}/>
    </div>
  )
}

export default Category
