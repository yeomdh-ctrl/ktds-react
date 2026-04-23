const ArticleList = ({ articles }) => {
  return (
    <tbody>
      {articles.map((article) => (
        <>
          <tr>
            <td>{article.id}</td>
            <td>{article.subject}</td>
            <td>{article.email}</td>
            <td>{article.viewCnt}</td>
            <td>{article.crtDt}</td>
          </tr>
          <tr>
            <td>제목: {article.subject}</td>
            <td>이메일: {article.email}</td>
            <td>이름: {article.membersVO.name}</td>
          </tr>
          <tr>
            <td>내용: {article.content}</td>
          </tr>
        </>
      ))}
    </tbody>
  );
};

export default ArticleList;
