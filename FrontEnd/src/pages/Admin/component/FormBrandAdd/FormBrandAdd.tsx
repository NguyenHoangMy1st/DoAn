import React from 'react'
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
  onClose: () => void
  onCreateSuccess: () => void
}

const FormBrandAdd: React.FC<CollectionEditFormProps> = ({ onClose, onCreateSuccess }) => {
  const [form] = Form.useForm()

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await adminApi.createBrand(values)
      toast.success('Tạo thương hiệu thành công', {
        position: 'top-right', // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 1200 mili giây (1.2 giây)
      })
      onCreateSuccess() // Notify update success
      onClose()
    } catch (error) {
      toast.error('Tạo thương hiệu thất bại', {
        position: 'top-right', // Vị trí hiển thị thông báo
        autoClose: 1200 // Thời gian tự động đóng thông báo sau 1200 mili giây (1.2 giây)
      })
    }
  }
  return (
    <Modal
      title='Create Brand'
      onCancel={onClose}
      onOk={handleSave}
      destroyOnClose
      okButtonProps={{ style: { backgroundColor: '#be4734' } }}
    >
      <Form {...formItemLayout} form={form}>
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

export default FormBrandAdd
