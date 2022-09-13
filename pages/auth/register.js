import react, { useState } from "react";
import { unauthPage } from "../../middlewares/authorizationPage";
export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}

export default function Register() {
  //mengambil data dari form
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  async function registerHendler(e) {
    e.preventDefault();
    setStatus("loading");
    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!registerReq.ok) return setStatus("error" + registerReq.status);
    const registerRes = await registerReq.json();
    setStatus("success");
  }

  function fieldHendler(e) {
    // setFields({ email: e.target.value });
    const name = e.target.getAttribute("name");

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }
  return (
    <div>
      <h1>register</h1>
      <form onSubmit={registerHendler.bind(this)}>
        <input
          name="email"
          onChange={fieldHendler.bind(this)}
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          name="password"
          onChange={fieldHendler.bind(this)}
          type="passsword"
          placeholder="Password"
        />
        <br />
        <button
          type="submit"
          class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </button>

        <div>output: {status}</div>
      </form>
    </div>
  );
}
