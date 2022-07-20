import { AxiosError, AxiosResponse } from 'axios'
import { SIGNUP_ENDPOINT } from 'configs'
import httpClient from 'services/base-service'
import { ISignUpPayload } from 'utility/interfaces/sign-up'

const registerAccount = async (
  payload: ISignUpPayload
): Promise<AxiosResponse> => {
  return await httpClient.post(SIGNUP_ENDPOINT, payload)
}

export default {
  registerAccount,
}
