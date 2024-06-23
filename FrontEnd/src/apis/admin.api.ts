import { Brand } from 'src/types/brand.type'
import { Category } from 'src/types/category.type'
import { Order } from 'src/types/order.type'
import { Product, ProductList } from 'src/types/product.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/admin/users'
interface UserData {
  email: string
  name: string
  phone: string
  address: string
  roles: string[]
}

const adminApi = {
  getAllUser() {
    return http.get<SuccessResponse<User[]>>(URL)
  },
  updateUser(id: string[], userData: UserData) {
    return http.put<SuccessResponse<User[]>>(`/admin/users/${id}`, userData)
  },
  getUser(id: string[]) {
    return http.get<SuccessResponse<User[]>>(`/admin/users/${id}`)
  },
  deleteUser(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/users/delete/${id}`)
  },
  getAllProducts() {
    return http.get<SuccessResponse<ProductList[]>>('/admin/products/all')
  },
  getProduct(id: string[]) {
    return http.get<SuccessResponse<ProductList[]>>(`/admin/products/${id}`)
  },
  updateProduct(id: string[], userData: UserData) {
    return http.put<SuccessResponse<User[]>>(`/admin/products/${id}`, userData)
  },
  deleteProduct(id: string[]) {
    return http.delete<SuccessResponse<User[]>>(`/admin/products/delete/${id}`)
  },
  getcategories() {
    return http.get<SuccessResponse<Category[]>>(`/admin/categories`)
  },
  restoreProduct(id: string, body: any) {
    return http.patch<SuccessResponse<User[]>>(`/admin/products/${id}`, body)
  },

  createCaterory(body: any) {
    return http.post<SuccessResponse<Category[]>>(`/admin/categories`, body)
  },
  updateCaterory(body: any, id: string) {
    return http.post<SuccessResponse<Category[]>>(`/admin/categories/${id}`, body)
  },
  getbrands() {
    return http.get<SuccessResponse<Brand[]>>(`/admin/brands`)
  },
  getbrand(id: string) {
    return http.get<SuccessResponse<Brand[]>>(`/admin/brands/${id}`)
  },
  createBrand(body: any) {
    return http.post<SuccessResponse<Brand[]>>(`/admin/brands`, body)
  },
  updateBrand(brandId: string, body: any) {
    console.log(brandId)
    console.log(body)
    return http.put<SuccessResponse<Brand[]>>(`/admin/brands/${brandId}`, body)
  },
  createProduct(body: any) {
    return http.post<SuccessResponse<Product[]>>('/admin/products', body)
  },
  getAllOrder() {
    return http.get<SuccessResponse<Order[]>>('/admin/orders')
  },
  confirmprogress(id: string[]) {
    return http.put<SuccessResponse<Order[]>>(`/admin/orders/${id}/progress`)
  },
  confirmdelivered(id: string[]) {
    return http.put<SuccessResponse<Order[]>>(`/admin/orders/${id}/delivered`)
  },
  confirmaccept(id: string[]) {
    return http.put<SuccessResponse<Order[]>>(`/admin/orders/${id}/confirm`)
  },
  confirmcancel(id: string[]) {
    return http.put<SuccessResponse<Order[]>>(`/admin/orders/${id}/cancel`)
  },
  getDeteledProducts() {
    return http.get<SuccessResponse<ProductList[]>>('/admin/products/deleteProduct')
  },
  updateDeteledProduct(body: any, id: string) {
    return http.post<SuccessResponse<Brand[]>>(`/admin/products/${id}`, body)
  },
  getDeleteProduct() {
    return http.get<SuccessResponse<Product[]>>('/admin/products/deleteProduct')
  },
  getBrands() {
    return http.get<SuccessResponse<Product[]>>('/admin/brands')
  },
  getBrandsbyID(id: string) {
    return http.get<SuccessResponse<Brand[]>>(`/admin/brands/${id}`)
  },
  getDailyRevenueForMonth(month: string, year: string) {
    return http.get<SuccessResponse<any>>('/admin/orders/revenue/monthly', {
      params: {
        month,
        year
      }
    })
  },
  getHourlyRevenueForDay(day: string, month: string, year: string) {
    return http.get<SuccessResponse<any>>('/admin/orders/revenue/daily', {
      params: {
        day,
        month,
        year
      }
    })
  }
}

export default adminApi
