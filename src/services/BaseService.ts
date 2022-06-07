import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError,} from '@reduxjs/toolkit/query'
import {Mutex} from "async-mutex";
import {logout, setUser} from "../store/reducers/authSlice";
import {RootState} from "../store/store";
import {IUser} from "../types/user";

interface refreshResponse {
    accessToken: string;
    user: IUser;
    tokenType: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
    credentials: 'include'
})

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 423) {
        await api.dispatch(logout())
        return result
    }
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                const refreshResult = await baseQuery({url: '/oauth/refresh'}, api, extraOptions);
                if (refreshResult.data) {
                    // @ts-ignore
                    const refreshData: refreshResponse = refreshResult.data;
                    api.dispatch(setUser({
                            token: refreshData.accessToken, user: refreshData.user
                        }
                    ))
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    await api.dispatch(logout())
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}
