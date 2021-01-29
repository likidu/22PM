import axios, {
    AxiosError,
    AxiosPromise,
    AxiosResponse,
    AxiosRequestConfig,
    AxiosInstance,
} from 'axios'

import type {
    PodcastType,
    RefreshTokenType,
    EpisodeType,
    EditorPick,
} from '../types/api.type'

import { API_CONFIG } from './config'

declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> {}

    interface AxiosRequestConfig {
        retry?: boolean
    }
}

class XiaoyuzhouFmApi {
    protected readonly instance: AxiosInstance
    private static classInstance: XiaoyuzhouFmApi

    private constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)

        this.initRequestInterceptor()
        this.initResponseInterceptor()
    }

    public static getInstance(config: AxiosRequestConfig) {
        if (!this.classInstance) {
            this.classInstance = new XiaoyuzhouFmApi(config)
        }

        return this.classInstance
    }

    private initRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this.handleRequest,
            this.handleReject,
        )
    }

    private initResponseInterceptor = () => {
        this.instance.interceptors.response.use(
            this.handleResponse,
            this.handleReject,
        )
    }

    private handleRequest = (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('access-token')
        // TODO: fix the type
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (token) config.headers['x-jike-access-token'] = token
        return config
    }

    // Xiaoyuzhou will return most reponses wrapped in a "data" object except for those like refresh token
    private handleResponse = ({ data }: AxiosResponse) =>
        // TODO: fix the type
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        'data' in data ? data.data : data

    private handleReject = async (error: AxiosError) => {
        // Reject promise if it's a usual error
        const { response } = error
        if (response && response.status !== 401) {
            return Promise.reject(error)
        }

        /*
         * When response code is 401, try to refresh the token.
         * Eject the interceptor so it doesn't loop in case
         * token refresh causes the 401 response
         */
        // this.instance.interceptors.response.eject(this.interceptorId)

        const originalRequest = error.config
        console.log(response)

        if (!originalRequest.retry) {
            originalRequest.retry = true

            const refreshToken = localStorage.getItem('refresh-token')
            if (refreshToken) {
                const result = await this.appAuthTokensRefresh(refreshToken)

                console.log(result)

                if (JSON.parse(result.success)) {
                    // TODO: fix the type
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    this.instance.defaults.headers.common[
                        'x-jike-access-token'
                    ] = result['x-jike-access-token']

                    localStorage.setItem(
                        'access-token',
                        result['x-jike-access-token'],
                    )
                    localStorage.setItem(
                        'refresh-token',
                        result['x-jike-refresh-token'],
                    )
                }
            }
            return this.instance(originalRequest)
        }
    }

    private handleError = (error: AxiosError) => {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else {
            console.log(error.message)
        }
    }

    /**
     *
     * @param mobile
     * @returns {AxiosPromise<RefreshToken>} x-jike-access-token, x-jike-refresh-token, success
     */
    private appAuthTokensRefresh = (
        refreshToken: string,
    ): AxiosPromise<RefreshTokenType> =>
        this.instance.post('/app_auth_tokens.refresh', '', {
            headers: {
                'x-jike-refresh-token': refreshToken,
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=utf-8',
            },
        })

    /**
     * editorPick
     */
    public editorPick = (): Promise<EditorPick[]> =>
        this.instance.post('/v1/editor-pick/list')

    /**
     * getPodcast
     */
    public getPodcast = (pid: string): Promise<PodcastType> =>
        this.instance.get(`/v1/podcast/get?pid=${pid}`)

    /**
     * getEpisode
     */
    public getEpisode = (eid: string): Promise<EpisodeType> =>
        this.instance.get(`/v1/episode/get?eid=${eid}`)
}

// Returns a singleton of the class instance
const xiaoyuzhouFmApi = XiaoyuzhouFmApi.getInstance(API_CONFIG)

export default xiaoyuzhouFmApi
