import cookie from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useState } from "react";

const userContext = createContext();

const UserState = (props) => {
  const router = useRouter();
  const [duplicate, setduplicate] = useState(false);
  const [duplicateName, setduplicateName] = useState(false);
  const [wrongData, setwrongData] = useState(false);

  const handleSignOut = () => {
    ["token", "id", "username"].forEach(cookie.remove);
    router.push("/signup");
  };

  const handleAuth = async (url, body, isSignup = false) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}${url}`, body);
    const resjson = await res.json();

    if (resjson.error) return setduplicate(true);
    if (resjson.duplicateName) return setduplicateName(true);
    if (resjson.token) {
      ["token", "id", "username"].forEach((key) =>
        cookie.set(key, resjson[key], { expires: 1000 })
      );
      router.push("/");
    }
  };

  const handleOnSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    handleAuth("/api/auth/createUser", { method: "POST", body: formData }, true);
  };

  const handleOnSignIn = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    handleAuth("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  };

  return (
    <userContext.Provider
      value={{ handleOnSignUp, handleSignOut, duplicateName, handleOnSignIn, duplicate, wrongData }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
export { userContext };
