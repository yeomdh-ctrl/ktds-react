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

export const fetchJsonWebToken = async (id, password) => {
  try {
    const fetchResult = await fetch(
      "http://192.168.211.15:8080/api/authorization",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: id,
          password: password,
        }),
      },
    );
    const authorizationResult = await fetchResult.json();
    return authorizationResult;
  } catch (e) {
    return {
      token: {},
      error: "아이디 또는 비밀번호가 일치하지 않습니다",
      status: 400,
    };
  }
};

// 인증 정보 필요.
export const fetchAddArticle = () => {};
