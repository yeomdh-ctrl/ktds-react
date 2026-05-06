import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../http/articles/fetchArticles";
import { handleFileDownload } from "../../utils/download";

export const ArticleDetail = () => {
  const { id } = useParams(); // {id: BO-yyyymmdd-000001}
  const [article, setArticle] = useState();
  useEffect(() => {
    const loadArticleById = async () => {
      const articleResult = await fetchArticleById();
      if (!articleResult.error) {
        setArticle(articleResult);
      } else {
        alert(articleResult.error);
      }
    };
    loadArticleById();
  }, [id]);
  if (!article) {
    return <div>불러오는 중..</div>;
  }
  return (
    <div>
      {id}게시글의 상세내용입니다.
      <div>{article.id}</div>
      <div>{article.subject}</div>
      <div>{article.content}</div>
      <div>
        {article.membersVO.name}({article.email})
      </div>
      <div>{article.viewCnt}</div>
      <div>{article.crtDt}</div>
      <div>{article.mdfyDt}</div>
      <ul>
        {article.files.map((f) => (
          <li key={`${f.fileNum}_${f.fileGroupId}`}>
            {f.displayName}
            <a
              onClick={handleFileDownload.bind(
                this,
                `http://192.168.211.15:8080/file/${f.fileGroupId}/${f.fileNum}`,
              )}
            >
              {f.displayName} ({f.fileLength} bytes)
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
