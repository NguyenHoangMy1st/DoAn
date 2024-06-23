import { useEffect, useState } from 'react'
import adminApi from 'src/apis/admin.api'
import TableDataDetele from '../../component/TableDataDetele'

function DeteledProducts() {
  const [products, setProducts] = useState([]) // State to store products
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const fetchData = async () => {
    try {
      const deteledProductData: any = await adminApi.getDeteledProducts()
      setProducts(deteledProductData) // Update products state with new data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (shouldRefetch) {
      fetchData()
      setShouldRefetch(false) // Đặt shouldRefetch lại sau khi fetchData đã được gọi
    }
  }, [shouldRefetch])
  console.log(products)
  return (
    <div className='flex flex-col  gap-8 border border-gray-200 rounded-lg w-full px-4 pt-4    '>
      <h1 className='font items-center text-[24px] font-bold text-center'>Quản lý sản phẩm đã xóa</h1>
      <TableDataDetele shouldRefetch={shouldRefetch} />
    </div>
  )
}

export default DeteledProducts
