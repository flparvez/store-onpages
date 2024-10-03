"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEditProductMutation } from "@/store/services/prodcutApi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useGetCategoriesQuery } from "@/store/services/CategoryApi";

const EditPage = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const {data} =useGetCategoriesQuery()
  const categories =data

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/product/${params.slug}`);
      const data = await res.json();
      setProduct(data?.product);

      // Prepopulate form with current product values
      if (data?.product) {
        setValue("name", data.product.name);
        setValue("description", data.product.description);
        setValue("category", data.product.category);
        setValue("images", data.product.images);
        setValue("price", data.product.price);
        setValue("stock", data.product.stock);
        setValue("sold", data.product.sold);
        setValue("video", data.product.video);
        setValue("tags", data.product.tags);
      }
    }
    fetchProduct();
  }, [params.slug, setValue]);

  const handleDescriptionChange = (value) => {
    setValue("description", value); // Manually set the value in React Hook Form
  };

  React.useEffect(() => {
    register("description", { required: true }); // Register the description field
  }, [register]);

  const [editProduct, { isLoading }] = useEditProductMutation();

  const onSubmit = async (data) => {
    await editProduct({ productSlug: product.slug, updatedProduct: data });
    if (!product) {
      <h2>Loading...</h2>
    }
    if (!isLoading) {
      router.push("/admin");
    }
  };

  const tag=[
    "Smart Watch",
    "Tv Box",
    "ups",
    "headphone",

  ]


  return (


// add


    <div className="max-w-md sm:max-w-[90%] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <div className="sm:flex sm:items-center sm:justify-center">
      <div className="text-center sm:text-left">
        <p className="my-4 text-xl text-red-500">
          Editing <span className="text-green-600">{product?.name}</span>
        </p>
      </div>

    <hr className="my-8 h-px border-0 bg-gray-300" />


    
    </div>
      
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Product Name</Label>
          <Input
            {...register("name", { required: true })}
            id="name"
            placeholder="Product Name"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Product Description</Label>
          <ReactQuill
            value={watch("description")} // Prepopulate the description with existing data
            onChange={handleDescriptionChange}
            className="mt-1 block w-full h-56 border-gray-300 rounded-md shadow-sm"
          />
        </LabelInputContainer>
<br />
<br />
        <LabelInputContainer className="mb-4">
          <Label htmlFor="category">Category</Label>
          <select
          
            {...register("category", { required: true })}
            className="select"
          >
          {categories?.map((category) => (
            <option  key={category._id} value={category.title.toLocaleLowerCase()}>{category.title}</option>
          ))}
          
          </select>
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="images">Image Link</Label>
          <Input
            {...register("images", { required: true })}
            id="images"
            placeholder="Image Link"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="price">Product Price</Label>
          <Input
            {...register("price", { required: true })}
            id="price"
            placeholder="Product Price"
            type="number"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="stock">Product Stock</Label>
          <Input
            {...register("stock", { required: true })}
            id="stock"
            placeholder="Product stock"
            type="number"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="video">Product Video</Label>
          <Input
            {...register("video")}
            id="video"
            placeholder="Product video Link"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="sold">Product Sold</Label>
          <Input
            {...register("sold")}
            id="sold"
            placeholder="Product Sold"
            type="number"
          />
        </LabelInputContainer>

        <RadioGroup defaultValue="all">
          <Label>Product Tags</Label>
          {tag.map((cat) => (
                      <div className="flex items-center space-x-2" key={cat}>
                        <RadioGroupItem {...register("tags")} value={cat.toLocaleLowerCase()}  id={cat.toLocaleLowerCase()} />
                        <Label htmlFor={cat.toLocaleLowerCase()}>{cat.toLocaleLowerCase()}</Label>
            </div>
          ))}
        </RadioGroup>
<br />
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow"
          type="submit"
        >
          Update Product &rarr;
        </button>
      </form>
    </div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
export default EditPage;
