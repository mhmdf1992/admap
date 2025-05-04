export interface IApiResponse<T>{
    status_code: number,
    data: T,
    message: string,
    parameter: string
}