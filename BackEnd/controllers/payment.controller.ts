import { Request, Response } from 'express'
import { PaymentModel } from '../database/models/payment.model'
import { ErrorHandler, responseSuccess } from '../utils/response'
import { STATUS } from '../constants/status'
import { STATUS_ORDER } from '../constants/purchase'
import { Payment } from '../@types/order.type'
import { cloneDeep } from 'lodash'
import moment from 'moment'

// User
const getPayments = async (req: Request, res: Response) => {
  const user_id = req.jwtDecoded.id

  try {
    let payments: any = await PaymentModel.find({ user: user_id })
      .sort({
        createdAt: -1,
      })
      .lean()

    payments = payments.filter((payment) => payment.purchases.length > 0)
    const response = {
      message: 'Lấy đơn mua thành công',
      data: payments,
    }
    return responseSuccess(res, response)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Đã xảy ra lỗi khi lấy đơn mua', error: error.message })
  }
}

// Admin
const getAllOrders = async (req: Request, res: Response) => {
  try {
    let payments: any = await PaymentModel.find()
      .populate({
        path: 'purchase',
        populate: {
          path: 'product',
        },
      })
      .sort({
        createdAt: -1,
      })
      .lean()

    payments = payments.filter((payment) => payment.purchases.length > 0)
    // console.log(payments)
    const response = {
      message: 'Lấy đơn mua thành công',
      data: payments,
    }
    return responseSuccess(res, response)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Đã xảy ra lỗi khi lấy đơn mua', error: error.message })
  }
}
const updateOrderConfirm = async (req: Request, res: Response) => {
  try {
    const orderDB = await PaymentModel.findByIdAndUpdate(
      req.params.order_id,
      {
        status: STATUS_ORDER.WAIT_FOR_GETTING,
      },
      { new: true }
    )

    // Kiểm tra nếu không tìm thấy đơn hàng
    if (!orderDB) {
      return res.status(404).json({
        message: 'Không tìm thấy đơn hàng',
      })
    }

    // Lưu lại thay đổi vào cơ sở dữ liệu
    await orderDB.save()

    // Trả về thông báo thành công
    return res.status(200).json({
      message: 'Cập nhật đơn hàng thành công',
      data: orderDB,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi cập nhật đơn hàng',
      error: error.message,
    })
  }
}
const updateOrderProgress = async (req: Request, res: Response) => {
  try {
    const orderDB = await PaymentModel.findByIdAndUpdate(
      req.params.order_id,
      {
        status: STATUS_ORDER.IN_PROGRESS,
      },
      { new: true }
    )

    // Kiểm tra nếu không tìm thấy đơn hàng
    if (!orderDB) {
      return res.status(404).json({
        message: 'Không tìm thấy đơn hàng',
      })
    }

    // Lưu lại thay đổi vào cơ sở dữ liệu
    await orderDB.save()

    // Trả về thông báo thành công
    return res.status(200).json({
      message: 'Cập nhật đơn hàng thành công',
      data: orderDB,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi cập nhật đơn hàng',
      error: error.message,
    })
  }
}

const updateOrderDelivered = async (req: Request, res: Response) => {
  try {
    const orderDB = await PaymentModel.findByIdAndUpdate(
      req.params.order_id,
      {
        status: STATUS_ORDER.DELIVERED,
      },
      { new: true }
    )

    // Kiểm tra nếu không tìm thấy đơn hàng
    if (!orderDB) {
      return res.status(404).json({
        message: 'Không tìm thấy đơn hàng',
      })
    }

    // Lưu lại thay đổi vào cơ sở dữ liệu
    await orderDB.save()

    // Trả về thông báo thành công
    return res.status(200).json({
      message: 'Cập nhật đơn hàng thành công',
      data: orderDB,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi cập nhật đơn hàng',
      error: error.message,
    })
  }
}

const updateOrderCancel = async (req: Request, res: Response) => {
  try {
    const orderDB = await PaymentModel.findByIdAndUpdate(
      req.params.order_id,
      {
        status: STATUS_ORDER.CANCELLED,
      },
      { new: true }
    )

    // Kiểm tra nếu không tìm thấy đơn hàng
    if (!orderDB) {
      return res.status(404).json({
        message: 'Không tìm thấy đơn hàng',
      })
    }

    // Lưu lại thay đổi vào cơ sở dữ liệu
    await orderDB.save()

    // Trả về thông báo thành công
    return res.status(200).json({
      message: 'Cập nhật đơn hàng thành công',
      data: orderDB,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi cập nhật đơn hàng',
      error: error.message,
    })
  }
}

const getTopSellingProductWeekly = async (req: Request, res: Response) => {
  try {
    const startOfWeek = moment().startOf('isoWeek').toDate()
    const endOfWeek = moment().endOf('isoWeek').toDate()

    const products = await PaymentModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfWeek, $lte: endOfWeek },
          status: { $eq: STATUS_ORDER.DELIVERED },
        },
      },
      { $unwind: '$purchases' },
      {
        $group: {
          _id: '$purchases.product.name',
          totalSold: { $sum: '$purchases.buy_count' },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
    ])
    return res.status(200).json({
      message: 'Sản phẩm được bán chạy nhất trong tuần',
      data: products,
      period: 'weekly',
      startOfPeriod: startOfWeek,
      endOfPeriod: endOfWeek,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy sản phẩm được bán chạy nhất trong tuần',
      error: error.message,
    })
  }
}

const getTopSellingProductMonthly = async (req: Request, res: Response) => {
  try {
    let { month, year } = req.query

    // Chuyển đổi kiểu của month và year từ number sang string
    month = month.toString()
    year = year.toString()

    // Tạo ngày đầu và cuối tháng từ tháng và năm đã chọn
    const startOfMonth = moment(`${year}-${month}-01`).startOf('month').toDate()
    const endOfMonth = moment(`${year}-${month}-01`).endOf('month').toDate()

    const products = await PaymentModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          status: { $eq: STATUS_ORDER.DELIVERED },
        },
      },
      { $unwind: '$purchases' },
      {
        $group: {
          _id: '$purchases.product.name',
          totalSold: { $sum: '$purchases.buy_count' },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
    ])

    return res.status(200).json({
      message: 'Sản phẩm được bán chạy nhất trong tháng',
      data: products,
      period: 'monthly',
      startOfPeriod: startOfMonth,
      endOfPeriod: endOfMonth,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy sản phẩm được bán chạy nhất trong tháng',
      error: error.message,
    })
  }
}

const getHourlyRevenueForDay = async (req: Request, res: Response) => {
  try {
    const { year, month, day } = req.query // Assume year, month, and day are passed as params
    const startDate = moment(`${year}-${month}-${day}`).startOf('day')
    const endDate = moment(startDate).endOf('day')

    const hourlyRevenues = []

    for (
      let date = startDate.clone();
      date.isSameOrBefore(endDate, 'hour');
      date.add(1, 'hour')
    ) {
      const startOfHour = date.startOf('hour').toDate()
      const endOfHour = date.endOf('hour').toDate()

      const payment = await PaymentModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfHour, $lte: endOfHour },
            status: { $eq: STATUS_ORDER.DELIVERED },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalMoney' },
          },
        },
      ])

      const hourlyRevenue = {
        hour: date.format('HH'),
        totalRevenue: payment.length > 0 ? payment[0].totalRevenue : 0,
      }

      hourlyRevenues.push(hourlyRevenue)
    }

    return res.status(200).json({
      message: `Doanh thu theo giờ trong ngày ${day}/${month}/${year}`,
      data: hourlyRevenues,
      period: 'daily',
      startOfPeriod: startDate.format('YYYY-MM-DD'), // Format date to exclude hours
      endOfPeriod: endDate.format('YYYY-MM-DD'),
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy doanh thu theo giờ trong ngày',
      error: error.message,
    })
  }
}

const getDailyRevenueForMonth = async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query // Assume year and month are passed as params
    const startDate = moment(`${year}-${month}-01`).startOf('month')
    const endDate = moment(startDate).endOf('month')

    const dailyRevenues = []

    for (
      let date = startDate.clone();
      date.isSameOrBefore(endDate, 'day');
      date.add(1, 'day')
    ) {
      const startOfDay = date.startOf('day').toDate()
      const endOfDay = date.endOf('day').toDate()

      const payment = await PaymentModel.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfDay, $lte: endOfDay },
            status: { $eq: STATUS_ORDER.DELIVERED },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalMoney' },
          },
        },
      ])

      const dailyRevenue = {
        date: date.format('YYYY-MM-DD'),
        totalRevenue: payment.length > 0 ? payment[0].totalRevenue : 0,
      }

      dailyRevenues.push(dailyRevenue)
    }

    return res.status(200).json({
      message: `Doanh thu từng ngày trong tháng ${month}/${year}`,
      data: dailyRevenues,
      period: 'monthly',
      startOfPeriod: startDate.format('YYYY-MM-DD'), // Format date to exclude hours
      endOfPeriod: endDate.format('YYYY-MM-DD'),
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Đã xảy ra lỗi khi lấy doanh thu từng ngày trong tháng',
      error: error.message,
    })
  }
}
const paymentController = {
  getPayments,
  getAllOrders,
  updateOrderConfirm,
  updateOrderProgress,
  updateOrderDelivered,
  updateOrderCancel,
  getTopSellingProductWeekly,
  getTopSellingProductMonthly,
  getHourlyRevenueForDay,
  getDailyRevenueForMonth,
}

export default paymentController
