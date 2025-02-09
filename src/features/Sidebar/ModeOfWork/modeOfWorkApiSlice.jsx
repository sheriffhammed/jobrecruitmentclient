import { apiSlice } from "../../../App/api/apiSlice";

export const modeOfWorkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModeOfWork: builder.query({
      query: () => "/modeofwork",
      keepUnusedDataFor: 60,
      providesTags: ["modeofwork"],
    }),
  }),
});

export const { useGetModeOfWorkQuery } = modeOfWorkApiSlice;
