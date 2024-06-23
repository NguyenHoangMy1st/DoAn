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

interface CollectionEditFormProps {
  brandId: string
  onClose: () => void
  onUpdateSuccess: () => void
}

const FormBrandEdit: React.FC<CollectionEditFormProps> = ({ brandId, onClose, onUpdateSuccess }) => {
  const [form] = Form.useForm()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const brandDataResponse = await adminApi.getbrand(brandId) // Thay đổi thành getUserById

        setUserData(brandDataResponse.data)
        form.setFieldsValue(brandDataResponse.data.data) // Thiết lập giá trị mặc định cho các trường
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (brandId) {
      fetchUserData()
    }
  }, [brandId, form]) // Thêm form vào dependencies
  console.log(brandId)
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.updateBrand(brandId, values)
      toast.success('Chỉnh sửa thương hiệu thành công', {
        position: 'top-right', // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 1200 mili giây (1.2 giây)
      })
      onUpdateSuccess() // Notify update success
      onClose()
    } catch (error) {
      toast.error('Chỉnh sửa thương hiệu thất bại', {
        position: 'top-right', // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 1200 mili giây (1.2 giây)
      })
    }
  }
  return (
    <Modal
      open={!!brandId}
      title='Edit Brand'
      onCancel={onClose}
      onOk={handleSave}
      destroyOnClose
      okButtonProps={{ style: { backgroundColor: '#be4734' } }}
    >
      <Form {...formItemLayout} form={form} initialValues={userData}>
        <Form.Item label='Name' name='name'>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FormBrandEdit
