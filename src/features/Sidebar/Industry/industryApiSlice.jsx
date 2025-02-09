import { apiSlice } from "../../../App/api/apiSlice";

export const industryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIndustry: builder.query({
      query: () => "/industry",
      keepUnusedDataFor: 60,
      providesTags: ["industry"],
    }),
  }),
});

export const { useGetIndustryQuery } = industryApiSlice;
