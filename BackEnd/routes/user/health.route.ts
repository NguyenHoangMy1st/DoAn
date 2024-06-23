import { Router } from 'express'
import HealthController from '../../controllers/health.controller'
import paymentController from '../../controllers/payment.controller'
import authMiddleware from '../../middleware/auth.middleware'
import helpersMiddleware from '../../middleware/helpers.middleware'
import { wrapAsync } from '../../utils/response'

export const userHealthRouter = Router()

userHealthRouter.get(
  '',
  authMiddleware.verifyAccessToken,
  wrapAsync(HealthController.getHealthFormData)
)
userHealthRouter.get(
  '/:health_id',
  // helpersMiddleware.idRule('health_id'),
  authMiddleware.verifyAccessToken,
  wrapAsync(HealthController.getHealthFormById)
)

userHealthRouter.post(
  '/add-form',
  authMiddleware.verifyAccessToken,
  wrapAsync(HealthController.createHealthForm)
)
