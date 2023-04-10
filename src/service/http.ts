import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

//设置请求头和请求路径
const baseURL = String(import.meta.env.VITE_APP_BASE)
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
//请求拦截
axios.interceptors.request.use(
    (config): AxiosRequestConfig<any> => {
        return config
    },
    (error) => {
        return error
    }
)
//响应拦截
axios.interceptors.response.use((res) => {
    //后面可以加很多种情况
    return res
})

interface ResType<T> {
    code: number
    result?: T
    message: string
}

interface Http {
    get<T>(url: string, params?: unknown): Promise<ResType<T>>
    post<T>(url: string, params?: unknown): Promise<ResType<T>>
    put<T>(url: string, params?: unknown): Promise<ResType<T>>
    upload<T>(url: string, params?: unknown): Promise<ResType<T>>
    download<T>(url: string, params?: unknown): void
}

const http: Http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .get(url, {
                    params,
                    // headers: {
                    //     Range: 'bytes=0-1200',
                    // },
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((error) => {
                    NProgress.done()
                    reject(error.data)
                })
        })
    },
    // 这个是普通的post
    post(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .post(url, JSON.stringify(params))
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    // 上传文件的post
    upload(url, file) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .post(url, file, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },

    put(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .put(url, params, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },

    download(url) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
            document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    },
}

export default http
