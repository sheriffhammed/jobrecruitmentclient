import { apiSlice } from "../../../App/api/apiSlice";

export const experienceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperience: builder.query({
      query: () => "/experience",
      keepUnusedDataFor: 60,
      providesTags: ["Experience"],
    }),
  }),
});

export const { useGetExperienceQuery } = experienceApiSlice;
