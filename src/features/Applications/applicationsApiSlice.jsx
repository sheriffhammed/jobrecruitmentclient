import { apiSlice } from "../../app/api/apiSlice"

export const applicationsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
         getAllApplications: builder.query({
            query: () => '/jobapplication',
            keepUnusedDataFor: 60,
            providesTags: ['Application'],
        }),
        getApplications: builder.query({
            query: (jobId) => `/jobapplication/${jobId}`,
            keepUnusedDataFor: 60,
            providesTags: ['Application'],
        }),
        getApplicationsByUser: builder.query({
            query: (userId) => `/jobapplication/user/${userId}`,
            keepUnusedDataFor: 60,
            providesTags: ['Application'],
        }),
        addApplication: builder.mutation({
            query: body => ({
                url: '/jobapplication',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Application'],
        }),
         deleteApplication: builder.mutation({
             query(id) {
                return {
                url: `jobapplication/${id}`,
                method: 'DELETE',
                }
             },
             invalidatesTags: ['Application'],
         })
    })
})

export const {
    useGetAllApplicationsQuery,
    useGetApplicationsQuery,
    useGetApplicationsByUserQuery,
    useAddApplicationMutation,
    useDeleteApplicationMutation
} = applicationsApiSlice 