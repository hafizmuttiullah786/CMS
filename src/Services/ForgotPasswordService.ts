import { fetchPost, fetchPut } from './NetWorkServices'

export const ForgotPasswordSendOtpService = async (
  endpoint: string,
  requestData: {
    email: string
  }
) => {
  const response = await fetchPost(endpoint, requestData)

  return response
}

export const ForgotPasswordSubmitOtpService = async (
  endpoint: string,
  requestData: {
    email: string
    otp: string
  }
) => {
  const response = await fetchPost(endpoint, requestData)

  return response
}

export const ForgotPasswordUpdatePasswordService = async (
  endpoint: string,
  requestData: {
    email: string
    otp: string
    newPassword: string
  }
) => {
  const response = await fetchPut(endpoint, requestData)

  return response
}
