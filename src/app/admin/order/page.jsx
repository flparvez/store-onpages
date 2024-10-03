import React from 'react'
import Orders from './OrderList'
import { auth } from '@/auth';
const OrderPage =async () => {
  const session = await auth()
const user = session?.user
  console.log(user)
  return (
    <div>
      <h2>test</h2>
      <Orders user={user}  />
    </div>
  )
}

export default OrderPage
