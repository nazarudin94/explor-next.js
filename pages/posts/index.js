import Router from "next/router";
import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);
  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const posts = await postReq.json();
  return {
    props: {
      token,
      post: posts.data,
    },
  };
}

export default function Postindex(props) {
  const [posts, setPosts] = useState(props.post);

  async function deleteHandler(id, e) {
    e.preventDefault(e);
    const { token } = props;
    const ask = confirm("Yakin data ini akan dihapus?");
    if (ask) {
      const delePost = await fetch("/api/posts/delete/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const res = await delePost.json();

      const postsFiltered = posts.filter((post) => {
        return post.id !== id && post;
      });
      setPosts(postsFiltered);
    }
  }

  function editHandler(id) {
    console.log(id);
    // Router.push("/posts/edit/update/");
    Router.push("/posts/edit/" + id);
  }
  return (
    <div>
      <h1>Posts</h1>
      <Nav />
      {posts.map((post) => (
        <div key={post.id}>
          <h6 class="h-4"> {post.title}</h6>
          <p>{post.content}</p>
          <div>
            <button onClick={editHandler.bind(this, post.id)}>Edit</button>
            <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
