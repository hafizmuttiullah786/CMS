import { fetchGet } from './NetWorkServices'

export const getDashboardStats = async (endpoint: string) => {
  const response = await fetchGet(endpoint)

  return response
}


export const getDashboardNotifications = async (endpoint: string) => {
  const response = await fetchGet(endpoint)

  return response
}

export const getDashboardUniversitiesData = async (endpoint: string) => {
  const response = await fetchGet(endpoint)

  return response
}

export const getDashboardCourseData = async (endpoint: string) => {
  const response = await fetchGet(endpoint)

  return response
}

