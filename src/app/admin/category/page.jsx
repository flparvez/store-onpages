import { auth } from '@/auth';
import React from 'react'
import CategorytList from './AdminCategoryList'
const Category =async () => {
  const session = await auth();
  const user = session?.user;
 
  return (
    <div>
      <CategorytList user={user} />
    </div>
  )
}

export default Category
