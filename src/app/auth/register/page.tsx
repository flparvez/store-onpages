import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from "next/link"
import {hash} from 'bcryptjs'
import { redirect } from "next/navigation"
import { connectDb } from "@/lib/dbConfig"
import { User } from "@/models/userSchema"


const Page = () => {

    const SignUp = async (formData:FormData) => {
        "use server"
            const name = formData.get('name') as string | undefined;
            const email = formData.get('email') as string | undefined;
            const password = formData.get('password') as string | undefined;

            if (!name || !email || !password)    throw new Error("Please enter email and password name");

            // connection with database

            await connectDb();
            const user = await User.findOne({email});
if(user) throw new Error("User already exists");

const hashedPassword = await hash(password,10)

// create new user
await User.create({
name,
email,
password:hashedPassword,
})

           redirect('/auth/login')
    }
  return (
    <div className='flex justify-center '>
       <Card className="w-[350px]  mt-32">
      <CardHeader>
        <CardTitle>Signup Page</CardTitle>
        
      </CardHeader>
      <CardContent>
        <form action={SignUp}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" id="name" placeholder="Enter Name" required />
            </div> 
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input type="text" name="email" id="email" placeholder="Enter Email" required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input type="password" name="password" id="email" placeholder="Enter Password" required />
            </div>
           
            <Button variant="ghost">Signup</Button>
          </div>
        </form>
      </CardContent>
  <CardFooter className="flex flex-col gap-4">
    <span>Or</span>
    <form action="">
        <Button type="submit">Register With Google</Button>
    </form>
    <Link href='/login'>
    Already have an account?  Login</Link>
  </CardFooter>
    </Card>
  
    </div>
  )
}

export default Page