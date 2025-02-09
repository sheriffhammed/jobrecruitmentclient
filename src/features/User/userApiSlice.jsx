import { apiSlice } from "../../App/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
        query(data) {
            const { id, ...body } = data
            return {
            url: `users/updateuserbyid/${id}`,
            method: 'PUT',
            body,
            }
          }
    }),
    addUser: builder.mutation({
      query: body => ({
            url: '/register',
            method: 'POST',
            body,
        }),
        invalidatesTags: ['User']
    }),
    getUserByEmail: builder.query({
            query: (email) => `users/getuserbyemail?email=${email}`,
            keepUnusedDataFor: 60,
    }),
    getUsers: builder.query({
      query: () => "/users",
      keepUnusedDataFor: 60,
      providesTags: ["User"],
    }),
  }),
});

export const { 
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserByEmailQuery,
  useAddUserMutation,
} = userApiSlice;
