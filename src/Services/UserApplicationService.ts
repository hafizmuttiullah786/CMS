import { fetchGet, fetchPut } from './NetWorkServices'

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

export const addDashboardNotifications = async (
  endpoint: string,
  requestData: {
    title: string;
    description: string;
    date: string;
  }
) => {
  const response = await fetchPut(endpoint, requestData)

  return response
}


