import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { BASE_URL } from 'configs'
import { HttpStatusCodes } from 'utility/enums/http-status-codes'
import authService from './auth-service'

declare module 'axios' {
  export interface AxiosRequestConfig {
    thirdPartyApiCall?: boolean
    bypassAuthorization?: boolean
  }
}

axios.interceptors.request.use(
  async (config: any) => {
    if (config.url && !config.thirdPartyApiCall) {
      config.url = BASE_URL + config.url
    }

    config.headers.version = process.env.REACT_APP_VERSION
    if (!config.bypassAuthorization) {
      config.headers.Authorization = authService.getAuthToken()
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

const convertResponse = (response: AxiosResponse) => {
  return response
}

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.message) {
      toast.success(response.data.message)
    }

    return convertResponse(response)
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCodes.Unauthorized:
      case HttpStatusCodes.BadRequest:
      case HttpStatusCodes.ConflictError:
        break
      case HttpStatusCodes.InternalServerError:
        toast.error('Something Went Wrong')
        break
      default:
    }

    return Promise.reject(error)
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  CancelToken: axios.CancelToken,
}
