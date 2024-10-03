"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useGetCategoriesQuery } from "@/store/services/CategoryApi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils";

import { useAddProductMutation } from "@/store/services/prodcutApi";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import React from "react";
import dynamic from "next/dynamic";



type Inputs = {
  name: string;
  description: any;
  category: string;
  images: string;
  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
};

export default function AddProductForm({user}:any) {
  const router = useRouter()
  const {data} =useGetCategoriesQuery("")
  const categories =data
const [addProduct] = useAddProductMutation()

  // Form validation and submission logic goes here
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();




    // Register 'description' field manually
  React.useEffect(() => {
    register('description', { required: true }); // Register the field in the form
  }, [register]);



  const handleDescriptionChange = (value:any) => {
    setValue('description', value); // Manually set the value in React Hook Form
  };



  // console.log(watch("description")); 
  // watch input value by passing the name of it


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const product= await addProduct(data).unwrap();
    if (product) {
      console.log("Products add succesfully")
       router.push('/admin')
     }
    }
 
    const tag=[
      "Smart Watch",
      "ups",
      "headphone",

    ]

    
  return (
    



  <div className="max-w-md sm:max-w-[90%]  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
    

  <form className="my-8" onSubmit={handleSubmit(onSubmit)}> 

    <LabelInputContainer className="mb-4 ">
      <Label htmlFor="name">Product Name</Label>
      <Input {...register("name", { required: true })} id="name" placeholder="Product Name" type="text" />
      </LabelInputContainer>
 
   <LabelInputContainer className="mb-4 ">
      <Label htmlFor="description">Product Description</Label>
    
      <ReactQuill 
         onChange={handleDescriptionChange} // Use this to update the form state
         
          className="mt-1 block w-full h-56 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </LabelInputContainer>


<br />
  <LabelInputContainer className="mb-4 mt-4">

      <Label htmlFor="category">Category Sellect</Label>
      <br />
      <select defaultValue="all" {...register("category", { required: true })}  className="select ">
   
      {categories?.map((category:any) => (
            <option  key={category._id} value={category.title}>{category.title}</option>
          ))}
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
      <RadioGroup defaultValue="all">
      <Label htmlFor="price">Product Tags</Label>

      {tag.map((cat) => (
                      <div className="flex items-center space-x-2" key={cat}>
                        <RadioGroupItem {...register("tags", { required: true })} value={cat.toLocaleLowerCase()}  id={cat.toLocaleLowerCase()} />
                        <Label htmlFor={cat.toLocaleLowerCase()}>{cat.toLocaleLowerCase()}</Label>
      </div>
                     ))}
  </RadioGroup>
 
    <LabelInputContainer className="mb-4 mt-4">
      <Label htmlFor="stock">Product Stock</Label>
      <Input {...register("stock", { required: true })} id="stock" placeholder="Product stock" type="number"   />
      </LabelInputContainer>
 
    <LabelInputContainer className="mb-4 ">
      <Label htmlFor="video">Product video</Label>
      <Input {...register("video")} id="video" placeholder="Product video Link" type="text"   />
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
