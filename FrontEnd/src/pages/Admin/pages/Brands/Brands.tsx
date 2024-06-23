import { useEffect, useState } from 'react'

import adminApi from 'src/apis/admin.api'
import TableBrand from '../../component/TableBrand'
import FormBrand from '../../component/FormBrand'

export default function Brands() {
  const [showAllContent, setShowAllContent] = useState(false)
  const [currentBrandId, setCurrentBrandId] = useState('')
  const [brandData, setBrandData] = useState<any>(null)

  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false)
  // const [form] = Form.useForm()

  const handleShowMore = () => {
    setShowAllContent(true)
  }
  const handleHideContent = () => {
    setShowAllContent(false)
  }
  const handleView = (brandId: any) => {
    setCurrentBrandId(brandId)
  }

  const fetchData = async () => {
    try {
      const brandData = await adminApi.getbrand(currentBrandId)
      setBrandData(brandData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [currentBrandId])
  useEffect(() => {
    if (shouldRefetch) {
      setShouldRefetch(false) // Đặt shouldRefetch lại sau khi fetchData đã được gọi
    }
  }, [shouldRefetch])
  const handleCreatSuccess = () => {
    setShouldRefetch(true)
  }

  return (
    <div className='flex flex-col  gap-8 border border-gray-200 rounded-lg w-full px-4 pt-4    '>
      <h1 className='font items-center text-[24px] font-bold text-center'>Quản lý thương hiệu</h1>
      <div className='flex gap-6 '>
        <div className='flex flex-col gap-2 flex-[30%]'>
          {' '}
          <FormBrand
            initialValues={{}}
            onFormInstanceReady={() => {}}
            onImageDataReceived={() => {}}
            onCreated={handleCreatSuccess}
          ></FormBrand>
          <div className='border border-gray-200 rounded-lg w-[full]  p-2'>
            <TableBrand handleView={handleView} />
          </div>
        </div>

        <div className='border border-gray-200 rounded-lg py-4 w-[100%] flex-[50%]'>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div>
              <img
                src={
                  currentBrandId
                    ? `${brandData.data.data.image}`
                    : 'http://res.cloudinary.com/dvpgs36ca/image/upload/v1716831443/Health/bfhbf9z9j6damhkbjuic.png'
                }
                alt=''
                className='w-[120px] h-[120px] rounded-2xl border-2 border-gray-200'
              />
            </div>
            <div className='text-[23px] font-semibold'>
              {currentBrandId ? `${brandData.data.data.name}` : 'Nutri Store'}
            </div>
            <div
              className='w-[80%] flex justify-center'
              style={{ height: showAllContent ? 'auto' : '120px', overflow: 'hidden' }}
            >
              {currentBrandId ? (
                <div dangerouslySetInnerHTML={{ __html: brandData.data.data.description } as any} />
              ) : (
                'Nutri Store - Chúng tôi ở đây vì sức khỏe của bạn'
              )}
            </div>
            {!showAllContent ? (
              <button
                onClick={handleShowMore}
                className='mt-[-90px] text-black bg-gradient-to-t from-white via-white to-white/50 p-16 font-bold  w-full text-[16px]'
              >
                Xem thêm
              </button>
            ) : (
              <button onClick={handleHideContent} className='mt-4 text-black text-center font-bold text-[16px] w-full'>
                Ẩn bớt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
