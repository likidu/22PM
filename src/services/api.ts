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

import { API_CONFIG, DB_NAME } from './config'
import { addEditorPicks, getEditorPicks, isEmptyCache } from './db'

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

    private saveEditorPicks = async () => {
        console.log('Retrieving editor picks list...')

        const data = await this.instance.post<EditorPick[]>(
            '/v1/editor-pick/list',
        )
        await addEditorPicks(data)
    }

    /**
     * Daily editor picks list
     */
    public editorPick = async (): Promise<EditorPick[]> => {
        const now = new Date().toJSON()
        const today = Date.parse(now.slice(0, 10))

        const currentList = await getEditorPicks()

        if (currentList.length > 0) {
            // Now passed last updated date and 1AM in the morning,
            // which we assume the API updates the editor picks at that time
            if (
                today > Date.parse(currentList[0].date) &&
                Date.parse(now) >
                    Date.parse(`${now.slice(0, 10)}T01:00:00.000Z`)
            ) {
                await this.saveEditorPicks()
            }
        } else {
            await this.saveEditorPicks()
        }

        // Return new list from cache
        return await getEditorPicks()
    }

    /**
     * Inbox list
     */
    public inbox = (): Promise<EpisodeType[]> =>
        this.instance.post('/v1/inbox/list', {
            limit: 20,
        })

    /**
     * Individual episode
     */
    public getEpisode = (eid: string): Promise<EpisodeType> =>
        this.instance.get(`/v1/episode/get?eid=${eid}`)

    /**
     * Subscription list
     */
    public subscription = (): Promise<PodcastType[]> =>
        this.instance.post('/v1/subscription/list', {
            sortOrder: 'desc',
            limit: 20,
            sortBy: 'subscribedAt',
        })

    /**
     * Individual podcast
     */
    public getPodcast = (pid: string): Promise<PodcastType> =>
        this.instance.get(`/v1/podcast/get?pid=${pid}`)
}

// Returns a singleton of the class instance
const xiaoyuzhouFmApi = XiaoyuzhouFmApi.getInstance(API_CONFIG)

export default xiaoyuzhouFmApi
