import { auth } from '@/auth'
import React from 'react'

const orderList =async () => {
    const session = await auth()
const user = session?.user
  return (
    <div>
      
    </div>
  )
}

export default orderList
