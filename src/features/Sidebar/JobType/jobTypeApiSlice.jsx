import { apiSlice } from "../../../App/api/apiSlice";

export const jobTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobTypes: builder.query({
      query: () => "/jobtype",
      keepUnusedDataFor: 60,
      providesTags: ["jobtype"],
    }),
  }),
});

export const { useGetJobTypesQuery } = jobTypeApiSlice;
