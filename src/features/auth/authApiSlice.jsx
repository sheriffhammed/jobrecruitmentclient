import { apiSlice } from "../../../src/App/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.query({
      query: () => "/logout",
      //keepUnusedDataFor: 5,
    }),
  }),
});

export const { useLoginMutation, useLazyLogoutQuery } = authApiSlice;
