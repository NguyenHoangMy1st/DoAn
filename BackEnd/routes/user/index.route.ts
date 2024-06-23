import { userPurchaseRouter } from './purchase.route'
import { userUserRouter } from './user-user.route'
import { userPaymentRouter } from './payment.route'
import { userHealthRouter } from './health.route'

const userRoutes = {
  prefix: '/',
  routes: [
    {
      path: 'user',
      route: userUserRouter,
    },
    {
      path: 'purchases',
      route: userPurchaseRouter,
    },

    {
      path: 'health',
      route: userHealthRouter,
    },
    {
      path: 'payment',
      route: userPaymentRouter,
    },
  ],
}

export default userRoutes
