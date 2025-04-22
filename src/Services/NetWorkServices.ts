declare global {
  interface Window {
    authToken: string | undefined
  }
}

const _Url = 'https://eduwak-be.onrender.com/api/'

const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || window.authToken || null
  }

  return null
}

const handleLogoutClick = () => {
  localStorage.removeItem('key')
  localStorage.removeItem('role')
  localStorage.removeItem('token')
  window.authToken = undefined

  window.location.href = '/login'
}

export const fetchGet = async (apiName: string) => {
  const token = getAuthToken()

  console.log('url', _Url + apiName + token)

  const response = await fetch(`${_Url}${apiName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })

  if (response.status === 401) {
    handleLogoutClick()
  }

  const jsonResponse = await response.json()

  return jsonResponse
}

export const fetchDeletee = async (apiName: string, data: {}) => {
  const token = getAuthToken()

  const response = await fetch(`${_Url}${apiName}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  })

  const jsonResponse = await response.json()

  if (!response.ok) {
    // For 401 status, handle logout
    if (response.status === 401) {
      handleLogoutClick()
    }

    // For other non-2xx statuses, throw an error with the response data
    throw new Error(JSON.stringify(jsonResponse))
  }

  return jsonResponse
}

export const fetchPost = async (apiName: string, data: any) => {
  const token = getAuthToken()

  console.log('url:', _Url + apiName + token)

  const response = await fetch(`${_Url}${apiName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  })

  const jsonResponse = await response.json()

  if (!response.ok) {
    // For 401 status, handle logout
    if (response.status === 401) {
      handleLogoutClick()
    }

    // For other non-2xx statuses, throw an error with the response data
    throw new Error(JSON.stringify(jsonResponse))
  }

  return jsonResponse
}

export const fetchPostEvent = async (endPoint: string, data: any) => {
  const token = getAuthToken()

  const response = await fetch(`${_Url}${endPoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: data
  })

  const jsonResponse = await response.json()

  return jsonResponse
}

export const fetchPUTEvent = async (endPoint: string, data: any) => {
  const token = getAuthToken()

  const response = await fetch(`${_Url}${endPoint}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: data
  })

  const jsonResponse = await response.json()

  return jsonResponse
}

export const fetchPut = async (apiName: string, data: {}) => {
  const token = getAuthToken()

  console.log('fetchPuturl', _Url + apiName + token)

  const response = await fetch(`${_Url}${apiName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify(data)
  })

  const jsonResponse = await response.json()

  if (!response.ok) {
    // For 401 status, handle logout
    if (response.status === 401) {
      handleLogoutClick()
    }

    // For other non-2xx statuses, throw an error with the response data
    throw new Error(JSON.stringify(jsonResponse))
  }

  return jsonResponse
}

export const fetchPostFormData = async (apiName: string, formData: FormData) => {
  const token = getAuthToken()

  try {
    const response = await fetch(`${_Url}${apiName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      if (response.status === 401) {
        handleLogoutClick()
      }

      const errorData = await response.json()

      throw new Error(JSON.stringify(errorData))
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export const fetchPutFormData = async (apiName: string, formData: FormData) => {
  const token = getAuthToken()

  try {
    const response = await fetch(`${_Url}${apiName}`, {
      method: 'Put',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!response.ok) {
      if (response.status === 401) {
        handleLogoutClick()
      }

      const errorData = await response.json()

      throw new Error(JSON.stringify(errorData))
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export const fetchDelete = async (apiName: string) => {
  const token = getAuthToken()

  const response = await fetch(`${_Url}${apiName}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    }
  })

  if (!response.ok) {
    // For 401 status, handle logout
    if (response.status === 401) {
      handleLogoutClick()
    }

    // For other non-2xx statuses, throw an error with the response data
    const errorData = await response.json()

    throw new Error(JSON.stringify(errorData))
  }

  return await response.json()
}
