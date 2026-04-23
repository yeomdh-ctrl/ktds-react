import ArticleHeader from "./ArticleHeader";
import articleData from "./articles.json";
import ArticleList from "./ArticleList";
import ArticleWriter from "./ArticleWriter";

const ArticleMain = () => {
  console.log(articleData);

  return (
    <div>
      <table>
        <ArticleHeader />
        <ArticleList articles={articleData.articles} />
      </table>
      <ArticleWriter />
    </div>
  );
};

export default ArticleMain;
