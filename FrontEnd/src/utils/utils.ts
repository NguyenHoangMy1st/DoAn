import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios'
import config from 'src/constants/config'
import userImage from 'src/assets/images/user.svg'
import { SuccessResponse } from 'src/types/utils.type'
import { HealthForm } from 'src/types/health.type'
import http from './http'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userImage)

export type CreateHealthFormConfig = {
  mutationFn: (body: {
    user: string
    sex: string
    height: string
    age: string
    weight: string
    diseases: string[]
  }) => Promise<AxiosResponse<SuccessResponse<HealthForm>>>
  timeout?: number
}

export const createHealthFormConfig: CreateHealthFormConfig = {
  mutationFn: (body) => {
    return http.post<SuccessResponse<HealthForm>>('health/add-form', body)
  },
  timeout: 100000
}
