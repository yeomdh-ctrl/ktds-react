// import { createSlice } from "@reduxjs/toolkit";

// export const articleSlice = createSlice({});
import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article-slice",
  initialState: {
    count: 0,
    result: [],
    pagination: {},
    token: null,
  },
  reducers: {
    refresh(store, action) {
      const { count, result, pagination } = action.payload;
      store.count = count;
      store.result = result;
      store.pagination = pagination;
    },

    setToken(store, action) {
      store.token = action.payload;
    },
  },
});

export const articleAction = articleSlice.actions;
