import { apiSlice } from "../api/apiSlice";
import { setToken, setUser } from "../slices/authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/get-profile",
        method: "GET",
      }),
      providesTags: ["profile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.data));
        } catch (error) {
          dispatch(setToken(null));
          console.log("error from get user: ", error);
        }
      },
    }),
  }),
});
export const { useGetUserQuery } = authApiSlice;
