import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isString } from "../../utils/type";
import {
  articleAction,
  userThunks,
} from "../../stores/toolkit/slices/articleSlice";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const storeDispatcher = useDispatch();

  const {
    token,
    info,
    error: loginErrors,
  } = useSelector((store) => store.article);

  useEffect(() => {
    storeDispatcher(articleAction.autoLogin());
    storeDispatcher(userThunks.loadMyInfo());
  }, [token]);

  if (token) {
    const onLogoutButtonClickHandler = () => {
      storeDispatcher(userThunks.logout());
    };
    // 비동기 이므로 info를 가져올 때 정보가 없을 경우도 있으므로 nullish 사용
    return (
      <div>
        {info?.name} ({info?.email}){" "}
        <button onClick={onLogoutButtonClickHandler}>로그아웃</button>
      </div>
    );
  }

  const onLoginButtonClickHandler = () => {
    storeDispatcher(
      userThunks.login(emailRef.current.value, passwordRef.current.value),
    );
  };

  return (
    <div>
      {isString(loginErrors) && <div>{loginErrors}</div>}

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
        {loginErrors?.email && <div>{loginErrors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
        {loginErrors?.password && <div>{loginErrors.password}</div>}
      </div>
      <button type="button" onClick={onLoginButtonClickHandler}>
        로그인
      </button>
    </div>
  );
};
export default Login;
