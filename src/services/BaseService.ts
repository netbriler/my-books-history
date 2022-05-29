import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError,} from '@reduxjs/toolkit/query'
import AuthService from "../API/AuthService";
import {logout, setUser} from "../store/reducers/authSlice";
import {RootState} from "../store/store";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && (result.error.status === 401 || result.error.status === 423)) {
        await AuthService.refresh().then(async (refreshResult) => {
            api.dispatch(setUser({
                    token: refreshResult.data.accessToken, user: refreshResult.data.user
                }
            ))
            // Retry the initial query
            result = await baseQuery(args, api, extraOptions)
        }).catch(async (e) => {
            await api.dispatch(logout())
        })
    }
    return result
}
