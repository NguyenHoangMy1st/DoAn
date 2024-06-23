import React, { useState, useEffect } from 'react'
import { Form, Input, Modal } from 'antd'

import adminApi from 'src/apis/admin.api'
import { toast } from 'react-toastify'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
}

interface CollectionCreateFormProps {
  productId: string

  onClose: () => void
  onUpdateSuccess: () => void
}

const FormRestoreProduct: React.FC<CollectionCreateFormProps> = ({ productId, onClose, onUpdateSuccess }) => {
  const [form] = Form.useForm()

  const [productData, setProductData] = useState<any>(null)
  const [initialCategoryValue, setInitialCategoryValue] = useState([''])

  console.log(initialCategoryValue)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const productDataResponse = await adminApi.getProduct([productId]) // Thay đổi thành getUserById
        setProductData(productDataResponse.data)
        form.setFieldsValue(productDataResponse.data.data) // Thiết lập giá trị mặc định cho các trường
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (productId) {
      fetchUserData()
    }
  }, [productId]) // Thêm form vào dependencies

  console.log(productId)
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateDeteledProduct(productId, values)
      toast.success('Chỉnh sửa sản phẩm thành công', {
        position: 'top-right', // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 1200 mili giây (1.2 giây)
      })
      onUpdateSuccess() // Notify update success
      onClose()
    } catch (error) {
      toast.error('Chỉnh sửa sản phẩm thất bại', {
        position: 'top-right', // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 1200 mili giây (1.2 giây)
      })
    }
  }

  useEffect(() => {
    if (productData && productData.data && productData.data.category) {
      const categoryName = productData.data.category.name
      setInitialCategoryValue([categoryName])
    }
  }, [productData])

  return (
    <Modal
      open
      width={1200}
      title='Khôi phục sản phẩm'
      onCancel={onClose}
      onOk={handleSave}
      destroyOnClose
      okText='Save'
      cancelText='Cancel'
      okButtonProps={{
        style: {
          backgroundColor: '#b94545' // Đổi màu của nút Save thành màu đỏ
        }
      }}
    >
      <Form {...formItemLayout} form={form} initialValues={productData}>
        <div className='grid grid-cols grid-flow-row  w-full'>
          <Form.Item label='Số lượng muốn thêm mới' name='quantity'>
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default FormRestoreProduct
