// src/Redux/baseApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// const baseUrl = "https://api.kidsknowrights.com";
const baseUrl = "https://my-portfolio-foisal-server.vercel.app/api/v1";
export const ImageUrl = "https://my-portfolio-foisal-server.vercel.app";

// Get token from cookie
const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get("token");
};

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl,

    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "auth",
    "about",
    "blogs",
    "skills",
    "projects",
    "profile",
    "review",
    "services",
    "resume",
    "contacts",
    "visitors",
  ],

  endpoints: () => ({}),
});

export const fetchServerData = async (endpoint) => {
  const token = getToken();

  const baseQuery = fetchBaseQuery({
    baseUrl,
  });

  const result = await baseQuery(
    {
      url: endpoint,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    },
    {
      signal: new AbortController().signal,
      dispatch: () => {},
      getState: () => ({}),
      endpoint: "",
      abort: () => {},
      type: "query",
      extra: undefined,
    },
    {}
  );

  if (result.error) {
    throw new Error(
      result.error?.data?.message ||
        result.error?.data ||
        "Failed to fetch data"
    );
  }

  return result.data;
};

export default baseApi;