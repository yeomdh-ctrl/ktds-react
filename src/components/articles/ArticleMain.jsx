/** @format */
// articles.json 파일 불러오기
import { useEffect, useState } from "react";
import ArticleHeader from "./ArticleHeader.jsx";
import ArticleList from "./ArticleList.jsx";
import ArticleWriter from "./ArticleWriter.jsx";
import ArticleWriter2 from "./ArticleWriter2.jsx";
import {
  fetchArticleList,
  fetchJsonWebToken,
} from "../../http/articles/fetchArticles.js";

const ArticleMain = () => {
  // state를 변경했다!
  // 컴포넌트가 재실행된다. (props의 전달 여부 관계 없이.)
  console.log("ArticleMain");

  const [viewPageNo, setViewPageNo] = useState(0);
  const onPaginationButtonClickHandler = (nextPageNo) => {
    setViewPageNo(nextPageNo);
  };

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

  const onAddArticleClickHandler = (subject, name, email, content) => {
    setArticles((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        subject,
        content,
        email,
        viewCnt: parseInt(Math.random() * 10000),
        crtDt: "2026-01-01",
        mdfyDt: null,
        fileGroupId: null,
        membersVO: { email, name },
        files: [],
      },
    ]);
  };

  const onLoginHandler = async () => {
    const loginResult = await fetchJsonWebToken();
    if (!loginResult.errors) {
      refreshArticleList();
    } else {
      alert(loginResult.errors);
    }
  };

  return (
    <div className="wrapper">
      <div>
        ID
        <input title="login" /> Password
        <input title="password" />
        <button onClick={onLoginHandler}>로그인</button>
      </div>
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
      <ArticleWriter onAddArticleClick={onAddArticleClickHandler} />
    </div>
  );
};
export default ArticleMain;
