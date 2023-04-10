import http from '@/service/http'

export interface ILoginParams {
    userName: string
    passWord: string | number
}
export interface ILoginApi {
    login: (params: ILoginParams) => Promise<any>
}
//像这种类型定义不是很多的，我还是比较喜欢写在一个文件里面

const loginApi: ILoginApi = {
    login(params) {
        return http.post('/login', params)
    },
}
export default loginApi
