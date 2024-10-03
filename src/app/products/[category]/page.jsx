import ProductByCategory from '../ProductByCategory'
const AllCategory =async ({params}) => {

  

  return (
    <div>
      <ProductByCategory category={params.category} />
    </div>
  )
}

export default AllCategory
