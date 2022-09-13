import { authPage } from "../../../middlewares/authorizationPage";
import React, { useState } from "react";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const { id } = ctx.query;
  const postReq = await fetch("http://localhost:3000/api/posts/detail/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const res = await postReq.json();
  // console.log(res);
  return {
    props: {
      token,
      post: res.data,
    },
  };
}

export default function postEdit(props) {
  const { post } = props;

  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });
  const [status, setStatus] = useState("normal");
  async function updateHendler(e) {
    e.preventDefault();
    // return console.log(fields);
    setStatus("loading");
    const { token } = props;
    const update = await fetch("/api/posts/update/" + post.id, {
      method: "PUT",
      //mengirim token
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      //mengirim data lewat body
      body: JSON.stringify(fields),
    });
    if (!update.ok) return setStatus("error");
    const res = await update.json();
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
      <h1>Edit a Post</h1>
      <p>Post ID:{post.id}</p>
      <form onSubmit={updateHendler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Title"
          name="title"
          defaultValue={post.title}
        />
        <br />
        <textarea
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Content"
          name="content"
          defaultValue={post.content}
        ></textarea>
        <br />
        <button type="submit">Save change</button>
        <div>status: {status}</div>
      </form>
    </div>
  );
}
