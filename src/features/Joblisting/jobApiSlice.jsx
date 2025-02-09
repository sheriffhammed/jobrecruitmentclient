import { apiSlice } from "../../App/api/apiSlice";

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs",
      keepUnusedDataFor: 60,
      providesTags: ["Job"],
    }),
    addJob: builder.mutation({
      query: body => ({
            url: '/jobs',
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Job']
    }),
    deleteJob: builder.mutation({
      query(id) {
        return {
        url: `jobs/${id}`,
        method: 'DELETE',
        }
      },
      invalidatesTags: ['Job'],
    }),
    getJobById: builder.query({
      query: (jobId) => `/jobs/${jobId}`,
      keepUnusedDataFor: 60,
      providesTags: ['Job'],
  }),
  updateJobById: builder.mutation({
    query(data) {
        const { id, ...body } = data
        return {
        url: `jobs/${id}`,
        method: 'PUT',
        body,
        }
      },
      providesTags: ['Job'],
  }),
  }),
});

export const { useGetJobsQuery,
  useAddJobMutation, 
  useDeleteJobMutation,
  useGetJobByIdQuery,
  useUpdateJobByIdMutation,
} = jobApiSlice;
