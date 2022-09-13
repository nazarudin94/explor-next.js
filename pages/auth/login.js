import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import cookies from "next-cookies";
import { unauthPage } from "../../middlewares/authorizationPage";
export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}
export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");
  useEffect(() => {
    const token = Cookie.get("token");
    // if (token) return Router.push("/posts");
  }, []);
  async function loginHendler(e) {
    e.preventDefault();
    // console.log(fields);
    setStatus("loading");
    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    if (!loginReq.ok) return setStatus("error" + loginReq.status);
    const loginRes = await loginReq.json();
    setStatus("success");
    Cookie.set("token", loginRes.token);
    //redirect
    Router.push("/posts");
  }

  function fieldsHendler(e) {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginHendler.bind(this)}>
        <input
          onChange={fieldsHendler.bind(this)}
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          onChange={fieldsHendler.bind(this)}
          type="password"
          name="password"
          placeholder="password"
        />
        <button
          type="submit"
          class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
        <div>Status:{status}</div>
      </form>
    </div>
  );
}
