import { HealthFormModel } from '../database/models/health-form.model'
import { Request, Response } from 'express'
import axios from 'axios'
import { ProductModel } from '../database/models/product.model'
interface HealthData {
  // Định nghĩa kiểu dữ liệu của healthData ở đây
  // Ví dụ:
  health_rp: string
  reasoning: string
  id: string[]
}
async function callAIRecommendationAPI(healthData: HealthData) {
  try {
    // Thay đổi URL này với đường dẫn API thực tế
    const response = await axios.post(
      'http://127.0.0.1:8000/recommend',
      healthData
    )
    const responseData: HealthData = JSON.parse(response.data)
    // console.log(responseData)
    return responseData
  } catch (error) {
    console.error(
      'Error calling AI Recommendation API:',
      error.response ? error.response.data : error.message
    )
    throw new Error('Failed to get recommendation from AI API')
  }
}

async function getProductsDetails(productIds: string[]) {
  try {
    const products = await ProductModel.find({
      _id: { $in: productIds },
    })
      .populate('category brand')
      .select({ __v: 0, description: 0 })
      .lean()

    if (!products.length) {
      throw new Error('No products found.')
    }
    return products
  } catch (error) {
    console.error('Failed to retrieve product details:', error)
    throw error
  }
}

const createHealthForm = async (req: Request, res: Response) => {
  try {
    const formData = req.body
    const aiRecommendation = await callAIRecommendationAPI(formData)

    const productsDetails = await getProductsDetails(aiRecommendation.id)

    const healthForm = new HealthFormModel({
      user: req.jwtDecoded.id,
      ...formData,
      aiRecommendation: aiRecommendation.id, // Lưu id từ AI Recommendation
      health_rp: aiRecommendation.health_rp, // Lưu health_rp từ AI Recommendation
      reasoning: aiRecommendation.reasoning, // Lưu reasoning từ AI Recommendation
    })

    const savedHealthForm = await healthForm.save()

    return res.status(201).json({
      message: 'Health form created successfully, recommendation received',
      data: savedHealthForm,
      products: productsDetails,
      // additionalData: additionalData,
    })
  } catch (error) {
    console.error('Failed to create health form:', error)
    return res.status(500).json({
      error: 'Could not create health form or get recommendations',
    })
  }
}

const getHealthFormData = async (req, res) => {
  try {
    const healthFormData = await HealthFormModel.find({
      user: req.jwtDecoded.id,
    }).select('-__v')
    return res.status(200).json({
      message: 'Lấy biểu mẫu sức khỏe thành công',
      data: healthFormData,
    })
  } catch (error) {
    console.error('Failed to retrieve health form data:', error)
    return res.status(500).json({ error: error.message })
  }
}
const getHealthFormById = async (req, res) => {
  try {
    const healthFormData: any = await HealthFormModel.findById(
      req.params.health_id
    ).select('-__v')
    const productsDetails = await getProductsDetails(
      healthFormData.aiRecommendation
    )
    return res.status(200).json({
      message: 'Lấy biểu mẫu sức khỏe thành công',
      data: healthFormData,
      products: productsDetails,
    })
  } catch (error) {
    console.error('Failed to retrieve health form data:', error)
    return res.status(500).json({ error: error.message })
  }
}
const HealthController = {
  createHealthForm,
  getHealthFormData,
  getHealthFormById,
}

export default HealthController
