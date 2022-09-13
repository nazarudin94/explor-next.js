import cookies from "next-cookies";

export function unauthPage(ctx) {
  return new Promise((resolve) => {
    const allcookies = cookies(ctx);
    // console.log(!allcookies.token);
    if (allcookies.token)
      return ctx.res
        .writeHead(302, {
          Location: "/posts",
        })
        .end();

    return resolve("unauthorized");
  });
}

export function authPage(ctx) {
  return new Promise((resolve) => {
    const allcookies = cookies(ctx);
    // console.log(!allcookies.token);
    if (!allcookies.token)
      return ctx.res
        .writeHead(302, {
          Location: "/auth/login",
        })
        .end();

    return resolve({
      token: allcookies.token,
    });
  });
}
