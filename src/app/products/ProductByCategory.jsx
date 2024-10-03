"use client"
import {useGetProductsQuery} from '@/store/services/prodcutApi'
import ProductListByCategory from '@/components/ProductsByCategory'
import CategorySlides from '@/components/CategorySlide'
const ProductByCategory = ({category}) => {
  // const categoryProducts = products?.filter((product) => product.category === category.replaceAll('-',' '))
const newslug = category.replaceAll('-',' ')
console.log(newslug)
const {data} = useGetProductsQuery()
const products = data?.products;

const categoryByProduct = products?.filter((product) => product.category === newslug)

  return (
    <div>
      <h2 className='font-bold text-2xl uppercase'>Category: {category?.replaceAll('-',' ')}</h2>

      <CategorySlides  />
      <div>
        <ProductListByCategory products={categoryByProduct} />
      </div>

    </div>
  )
}

export default ProductByCategory
