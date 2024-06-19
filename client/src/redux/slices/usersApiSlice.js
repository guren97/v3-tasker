import { apiSlice } from "./apiSlice.js";

const USERS_URL = "/api/v1/auth";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    // USER ROUTES

    // change to QUERY instead of MUTATION
    fetchUser: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    update: builder.mutation({
      query: (id, data) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useFetchUserQuery, // change to QUERY instead of MUTATION
  useUpdateMutation,
  useDeleteMutation,
} = usersApiSlice;
