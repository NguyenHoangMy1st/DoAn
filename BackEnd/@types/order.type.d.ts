export type OrderStatus = 1 | 2 | 3 | 4 | 5

export type OrderListStatus = OrderStatus | 0

export interface Payment {
  purchases: Purchase[]
  totalMoney: number
  name?: string
  street?: string
  city?: string
  phone?: string
  paymentMethod: number
  status: number
}
interface Product {
  name: string
  image: string
  price: number
}
interface Purchase {
  product: Product
  buy_count: number
  price: number
}
