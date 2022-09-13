import { authPage } from "../../middlewares/authorizationPage";
import React, { useState } from "react";
import Router from "next/router";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return {
    props: {
      token,
    },
  };
}

export default function postCreate(props) {
  const [fields, setFields] = useState({
    title: "",
    content: "",
  });
  const [status, setStatus] = useState("normal");
  async function createHendler(e) {
    e.preventDefault();
    setStatus("loadeing");
    const { token } = props;
    const create = await fetch("/api/posts/create", {
      method: "POST",
      //mengirim token
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      //mengirim data lewat body
      body: JSON.stringify(fields),
    });
    if (!create.ok) return setStatus("error");
    const res = await create.json();
    setStatus("succeess");
    Router.push("/posts");
  }

  function fieldHandler(e) {
    const target = e.target;
    const name = e.target.getAttribute("name");
    const value = target.value;
    setFields({
      ...fields,
      [name]: value,
    });
  }
  return (
    <div>
      <h1>Create a Post</h1>
      <Nav />
      <form onSubmit={createHendler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Title"
          name="title"
        />
        <br />
        <textarea
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Content"
          name="content"
        ></textarea>
        <br />
        <button type="submit">Create Post</button>
        <div>status: {status}</div>
      </form>
    </div>
  );
}
