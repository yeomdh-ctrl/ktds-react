/** @format */

export const fetchArticleList = async (pageNo = 0, listSize = 10) => {
  try {
    const fetchResult = await fetch(
      `http://192.168.211.15:8080/api/articles?pageNo=${pageNo}&listSize=${listSize}`,
    );

    const listResult = await fetchResult.json();
    return listResult;
  } catch (e) {
    return {
      result: { count: 0, result: [] },
      pagination: {},
      error: "서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.",
    };
  }
};

// 인증 정보 필요.
export const fetchAddArticle = async (jwt, subject, content, attachFile) => {
  try {
    // requestbody가 없을 때 (json이 아닐때) 아래처럼 보냄
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);
    // attachFile 같은 경우는 FileList 배열을 사용한다.
    // FileList 내에 존재하는 파일 객체들을 attachFile로 하나씩 할당
    for (const file of attachFile) {
      formData.append("attachFile", file);
    }

    const fetchResult = await fetch(`http://192.168.211.15:8080/api/articles`, {
      method: "post",
      headers: {
        Authorization: jwt,
      },
      body: formData,
    });

    const addResult = await fetchResult.json();
    return addResult;
  } catch (e) {
    return {
      result: false,
      error: "서비스가 잠시 중단되었습니다. 잠시 후 다시 시도해주세요.",
    };
  }
};
