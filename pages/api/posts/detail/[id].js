import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";
export default async function handler(req, res) {
  //kondisi method
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  const auth = await authorization(req, res);
  // console.log(auth);
  const post = await db("posts").where({ id }).first();

  if (!post) return res.status(404).end();
  res.status(200);
  res.json({
    message: "Posts data",
    data: post,
  });
}
