export interface ISignUpResponse {
  authenticationToken: string
}

export interface ISignUpPayload {
    name: string
    email: string
    password: string
}
