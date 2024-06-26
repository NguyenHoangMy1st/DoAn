import Product from './Product'
import { useQuery } from 'react-query'
import productApi from 'src/apis/product.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import categoryApi from 'src/apis/category.api'

function ProductCategory() {
  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  return (
    <div className=' mx-32 py-7 mt-10 mb-10'>
      <div className='bg-white py-7 mb-10'>
        <div className='container'>
          {productsData && (
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-3'>
                <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
              </div>
              <div className='col-span-9'>
                <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {productsData.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <Pagination
                  queryConfig={queryConfig}
                  pageSize={productsData.data.data.pagination.page_size}
                  namePath='productCategory'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCategory
