import axios from 'axios'
import { HttpStatusCode } from '../constant/HttpStatusCode'

export function isAxiosError(error) {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError(error) {
  return isAxiosUnauthorizedError(error) && error.response?.data?.data?.name === 'EXPIRED_TOKEN'
}

export function formatCurrency(currency) {
  // 1000 ==> 1.000
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value) {
  // 10000000 ==> 1M
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original, sale) => Math.round(((original - sale) / original) * 100) + '%'
