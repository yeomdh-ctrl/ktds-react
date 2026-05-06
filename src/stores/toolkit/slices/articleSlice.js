// import { createSlice } from "@reduxjs/toolkit";

// export const articleSlice = createSlice({});
import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchMyInfo } from "../../../http/articles/fetchLogin";
import { getValidationResult } from "../../../utils/errorHandler";
import { isString } from "../../../utils/type";
import {
  fetchAddArticle,
  fetchArticleList,
} from "../../../http/articles/fetchArticles";

export const articleSlice = createSlice({
  name: "article-slice",
  initialState: {
    count: 0,
    result: [],
    pagination: {},
    token: null,
    info: null,
    error: {
      list: null,
      write: null,
    },
  },
  reducers: {
    refresh(store, action) {
      store.count = action.payloadcount;
      store.result = action.payload.result;
      store.pagination = action.payload.pagination;
      store.error.list = null;
    },
    listError(store, action) {
      store.error.list = action.payload;
    },
    writeError(store, action) {
      if (isString(action.payload)) {
        store.error.write = action.payload;
      } else {
        store.error.write = getValidationResult(action.payload);
      }
    },
    clearWriteError(store) {
      store.error.write = null;
    },
    logout(store) {
      store.token = null;
      store.info = null;
    },
    loadMyInfo(store, action) {
      store.info = action.payload;
    },
    autoLogin(store) {
      // session storage에 저장된 token을 가져와서 slice에 등록한다.
      const token = sessionStorage.getItem("token");
      if (token) {
        store.token = token;
      }
    },
    login(store, action) {
      store.token = action.payload;
      store.error = null;
    },
    error(store, action) {
      if (isString(action.payload)) {
        store.error = action.payload;
      } else {
        store.error = getValidationResult(action.payload);
      }
    },
  },
});

export const articleAction = articleSlice.actions;

// toolkit slice store에 대한 custom action(reducer) ==> fetch + dispatch 생성
export const userThunks = {
  login(email, password) {
    // useDispatch()의 결과가 파라미터로 전달
    return async (dispatcher) => {
      // fetch
      const loginResult = await fetchLogin(email, password);
      // dispatch
      if (!loginResult.error) {
        sessionStorage.setItem("token", loginResult.token);
        dispatcher(articleAction.login(loginResult.token));
      } else {
        dispatcher(articleAction.error(loginResult.error));
      }
    };
  },
  loadMyInfo() {
    return async (dispatcher) => {
      const sessinToken = sessionStorage.getItem("token");
      const myInfo = await fetchMyInfo(sessinToken);
      if (myInfo.error) {
        sessionStorage.removeItem("token");
        dispatcher(articleAction.logout());
      } else {
        dispatcher(articleAction.loadMyInfo(myInfo));
      }
    };
  },
  logout() {
    return async (dispatcher) => {
      sessionStorage.removeItem("token");
      dispatcher(articleAction.logout());
    };
  },
};

export const articleThunks = {
  refresh(pageNo) {
    return async (dispatcher) => {
      const articleList = await fetchArticleList(pageNo);

      const {
        result: { count, result },
        pagination,
      } = articleList;

      dispatcher(articleAction.refresh({ count, result, pagination }));

      if (articleList.error) {
        dispatcher(articleAction.listError({ count, result, pagination }));
      }
    };
  },
  write(subject, content, attachFiles) {
    return async (dispatcher) => {
      const addResult = await fetchAddArticle(
        sessionStorage.getItem("token"),
        subject,
        content,
        attachFiles,
      );

      if (addResult.error) {
        dispatcher(articleAction.writeError(addResult.error));
      } else {
        dispatcher(articleAction.clearWriteError());
        dispatcher(articleThunks.refresh(0));
      }
    };
  },
};
