import { Request, Response } from 'express'
import { responseSuccess, ErrorHandler } from '../utils/response'
import { STATUS } from '../constants/status'
import { BrandModel } from '../database/models/brand.model'

const addBrand = async (req: Request, res: Response) => {
  const { name, image, description } = req.body
  const brandAdd = await new BrandModel({ name, image, description }).save()
  const response = {
    message: 'Tạo Brand thành công',
    data: brandAdd.toObject({
      transform: (doc, ret, option) => {
        delete ret.__v
        return ret
      },
    }),
  }
  return responseSuccess(res, response)
}

const getBrands = async (req: Request, res: Response) => {
  const { exclude } = req.query
  let condition = exclude ? { _id: { $ne: exclude } } : {}
  const brands = await BrandModel.find(condition).select({ __v: 0 }).lean()
  const response = {
    message: 'Lấy categories thành công',
    data: brands,
  }
  return responseSuccess(res, response)
}

const getBrand = async (req: Request, res: Response) => {
  const brandDB = await BrandModel.findById(req.params.brand_id)
    .select({ __v: 0 })
    .lean()
  if (brandDB) {
    const response = {
      message: 'Lấy brand thành công',
      data: brandDB,
    }
    return responseSuccess(res, response)
  } else {
    throw new ErrorHandler(STATUS.BAD_REQUEST, 'Không tìm thấy Brand')
  }
}

const updateBrand = async (req: Request, res: Response) => {
  const { name, description } = req.body
  const brandDB = await BrandModel.findByIdAndUpdate(
    req.params.brand_id,
    { name, description },
    { new: true }
  )
    .select({ __v: 0 })
    .lean()
  if (brandDB) {
    const response = {
      message: 'Cập nhật Brand thành công',
      data: brandDB,
    }
    return responseSuccess(res, response)
  } else {
    throw new ErrorHandler(STATUS.BAD_REQUEST, 'Không tìm thấy Brand')
  }
}

const brandController = {
  addBrand,
  getBrand,
  getBrands,
  updateBrand,
}

export default brandController
