"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import { cn } from "@/lib/utils";
import { Select } from "./ui/select";


type Inputs = {
  name: string;
  description: string;
  category: string;
  images: string;
  price: number;
  stock: number;
  sold: number;
};

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // console.log(watch("name")); // watch input value by passing the name of it

  return (
    



  <div className="max-w-md sm:max-w-[90%]  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
    

  <form className="my-8" onSubmit={handleSubmit(onSubmit)}> 

    <LabelInputContainer className="mb-4 ">
      <Label htmlFor="name">Product Name</Label>
      <Input {...register("name", { required: true })} id="name" placeholder="Product Name" type="text" />
      </LabelInputContainer>
 
   <LabelInputContainer className="mb-4 ">
      <Label htmlFor="description">Product Description</Label>
      <Textarea {...register("description", { required: true })} id="description" placeholder="Product Description"  />
      </LabelInputContainer>
  <LabelInputContainer className="mb-4 ">
      <Label htmlFor="category">Category Sellect</Label>
      <select defaultValue="all" {...register("category", { required: true })}  className="select select-bordered">
   
    <option value="all" selected>All</option>
    <option>Harry Potter</option>
    <option>Lord of the Rings</option>
    <option>Planet of the Apes</option>
    <option>Star Trek</option>
  </select>
      </LabelInputContainer>
 

         <LabelInputContainer className="mb-4 ">
      <Label htmlFor="images">Image Link</Label>
      <Input {...register("images", { required: true })} id="images" placeholder="Image Link" type="text"   />
      </LabelInputContainer>
 

      
         <LabelInputContainer className="mb-4 ">
      <Label htmlFor="price">Product Price</Label>
      <Input {...register("price", { required: true })} id="price" placeholder="Product Price" type="number"   />
      </LabelInputContainer>
 
    <LabelInputContainer className="mb-4 ">
      <Label htmlFor="stock">Product Stock</Label>
      <Input {...register("stock", { required: true })} id="stock" placeholder="Product stock" type="number"   />
      </LabelInputContainer>
 

         <LabelInputContainer className="mb-4 ">
      <Label htmlFor="sold">Product sold</Label>
      <Input {...register("sold", { required: true })} id="sold" placeholder="Product sold" type="number"   />
      </LabelInputContainer>
 

      

    <button
      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      type="submit"
    >
      Add Product &rarr;
      <BottomGradient />
    </button>

    
  </form>
</div>
    
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
