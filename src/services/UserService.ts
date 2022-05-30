import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {IUser} from "../types/user";
import {baseQueryWithReauth} from "./BaseService";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    refetchOnFocus: true,
    endpoints: (build) => ({
        getMe: build.query<IUser, null>({
            query: () => ({
                url: `/api/v1/user/me/`,
            }),
        }),
    })
})
