/** @format */
// articles.json 파일 불러오기
import { useState } from "react";
import ArticleHeader from "./ArticleHeader.jsx";
import ArticleList from "./ArticleList.jsx";
import articleData from "./articles.json";
import ArticleWriter from "./ArticleWriter.jsx";

const ArticleMain = () => {
  const [articles, setArticles] = useState(articleData.articles);
  const [view, setView] = useState(false);
  const [{ subject, membersVO, email, content }, setNewArticleData] = useState({
    subject: "",
    membersVO: "",
    email: "",
    content: "",
  });

  const onSubjectChangeHandler = (event) => {
    setNewArticleData((prevData) => ({
      ...prevData,
      subject: event.target.value,
    }));
  };
  const onNameChangeHandler = (event) => {
    const obj = {};
    obj.name = event.target.value;
    obj.email = "admin@gmail.com";

    setNewArticleData((prevData) => ({
      ...prevData,
      membersVO: obj,
    }));
  };
  const onEmailChangeHandler = (event) => {
    setNewArticleData((prevData) => ({
      ...prevData,
      email: event.target.value,
    }));
  };
  const onContentChangeHandler = (event) => {
    setNewArticleData((prevData) => ({
      ...prevData,
      content: event.target.value,
    }));
  };
  const onSaveButtonClickHandler = () => {
    console.log("저장");
    console.log({ subject, membersVO, email, content });
    setArticles((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        subject,
        content,
        email,
        viewCnt: 0,
        crtDt: "2026-04-23 18:10:11",
        mdfyDt: "2026-04-23 18:15:23",
        fileGroupId: "FG-20260423-000001",
        membersVO,
        files: [
          {
            fileNum: 1,
            fileGroupId: "FG-20260423-000001",
            displayName: "Testfile.exe",
            fileLength: 15000,
          },
        ],
      },
    ]);
    console.log(articles);

    setNewArticleData({
      subject: "",
      membersVO: { name: "" },
      email: "",
      content: "",
    });
    console.log("끝2");
  };

  const onCancelButtonClickHandler = () => {
    setNewArticleData({
      subject: "",
      membersVO: { name: "" },
      email: "",
      content: "",
    });
    setView(false);
    console.log(view);
  };
  const onWriteButtonClickHandler = () => {
    setView(true);
    console.log(view);
  };
  console.log(articleData);
  return (
    <div className="wrapper">
      <div>{articleData.articles.length}개의 게시글이 검색되었습니다.</div>
      <table>
        <ArticleHeader />
        <ArticleList contents={articles} />
      </table>
      {view ? (
        <button onClick={onWriteButtonClickHandler}>글쓰기</button>
      ) : (
        <ArticleWriter
          inputData={{ subject, membersVO, email, content }}
          onSubjectChange={onSubjectChangeHandler}
          onNameChange={onNameChangeHandler}
          onEmailChange={onEmailChangeHandler}
          onContentChange={onContentChangeHandler}
          onSaveButtonClick={onSaveButtonClickHandler}
          onCancelButtonClick={onCancelButtonClickHandler}
          onWriteButtonClick={onWriteButtonClickHandler}
        />
      )}
    </div>
  );
};

export default ArticleMain;
