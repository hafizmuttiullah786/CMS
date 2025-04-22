import ApiNames from '@/constants/ApiNames'
import { fetchDeletee, fetchGet, fetchPost, fetchPut } from './NetWorkServices'

export const getFAQsService = async () => {
  const endpoint = ApiNames.faqAll
  const response = await fetchGet(endpoint)

  return response
}

export const updateFAQService = async (requestData: any) => {
  const endpoint = ApiNames.faqUpdate
  const response = await fetchPut(endpoint, requestData)

  return response
}

export const addFAQService = async (requestData: { question: string; answer: string }) => {
  const endpoint = ApiNames.faqAdd

  const response = await fetchPost(endpoint, requestData)

  return response
}

export const deleteFAQService = async (requestData: { faqId: number }) => {
  const endpoint = ApiNames.faqDelete
  const response = await fetchDeletee(endpoint, requestData)
  return response
}
