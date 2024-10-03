import React from 'react'
import Home from './AdminPage'
import { auth } from '@/auth'
const Admin = async () => {
  const session = await auth()
  const user = session?.user
  return (
    <div>
      <Home user={user} />
    </div>
  )
}

export default Admin
