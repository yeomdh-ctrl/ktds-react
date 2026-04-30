/** @format */
// articles.json 파일 불러오기
import { useEffect, useRef, useState } from "react";
import ArticleHeader from "./ArticleHeader.jsx";
import ArticleList from "./ArticleList.jsx";
import ArticleWriter from "./ArticleWriter.jsx";
import ArticleWriter2 from "./ArticleWriter2.jsx";
import {
  fetchAddArticle,
  fetchArticleList,
} from "../../http/articles/fetchArticles.js";
import { fetchLogin } from "../../http/articles/fetchLogin.js";
import { isString } from "../../utils/type.js";
import { getValidationResult } from "../../utils/errorHandler.js";

const ArticleMain = () => {
  // state를 변경했다!
  // 컴포넌트가 재실행된다. (props의 전달 여부 관계 없이.)
  console.log("ArticleMain");

  const writerRef = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [viewPageNo, setViewPageNo] = useState(0);
  const [
    {
      count,
      result: articles,
      pagination: { pageNo = 0, pageCount = 0 },
    },
    setArticles,
  ] = useState({
    count: 0,
    result: [],
    pagination: {},
  });
  const [token, setToken] = useState();
  const [loginErrors, setLoginErrors] = useState();

  const onLoginButtonClickHandler = async () => {
    const loginResult = await fetchLogin(
      emailRef.current.value,
      passwordRef.current.value,
    );
    setToken(loginResult.token);

    if (loginResult.error) {
      if (isString(loginResult.error)) {
        setLoginErrors(loginResult.error);
      } else {
        setLoginErrors(getValidationResult(loginResult.error));
      }
    }
  };

  const onPaginationButtonClickHandler = (nextPageNo) => {
    setViewPageNo(nextPageNo);
  };

  const refreshArticleList = async () => {
    const articleList = await fetchArticleList(viewPageNo);
    /*  articleList의 구조
    {
      result: { count: 0, result: [] },
      pagination: {},
    }
    */
    const {
      result: { count, result },
      pagination,
    } = articleList;

    setArticles({ count, result, pagination });

    if (articleList.error) {
      alert(articleList.error);
    }
  };

  useEffect(() => {
    refreshArticleList();
  }, [viewPageNo]);

  const onAddArticleClickHandler = async (subject, content, attachFile) => {
    const addResult = await fetchAddArticle(
      token,
      subject,
      content,
      attachFile,
    );
    if (addResult.error) {
      writerRef.current.setResponseError(addResult.error);
    } else {
      refreshArticleList();
    }
  };

  return (
    <div className="wrapper">
      {!token && (
        <div>
          {isString(loginErrors) && <div>{loginErrors}</div>}

          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={emailRef} />
            {loginErrors?.email && <div>{loginErrors.email}</div>}
          </div>
          <div>
            <label htmlFor="w">Password</label>
            <input type="password" id="password" ref={passwordRef} />
            {loginErrors?.password && <div>{loginErrors.password}</div>}
          </div>
          <button type="button" onClick={onLoginButtonClickHandler}>
            로그인
          </button>
        </div>
      )}

      <div>{count}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList contents={articles} />
      </table>
      <div>
        {pageNo > 0 && (
          <button
            onClick={onPaginationButtonClickHandler.bind(this, pageNo - 1)}
          >
            이전
          </button>
        )}
        {pageNo === 0 && pageCount - 1 > pageNo && (
          <button
            onClick={onPaginationButtonClickHandler.bind(this, pageNo + 1)}
          >
            다음
          </button>
        )}
      </div>
      <ArticleWriter
        errorHandleRef={writerRef}
        onAddArticleClick={onAddArticleClickHandler}
      />
    </div>
  );
};
export default ArticleMain;
