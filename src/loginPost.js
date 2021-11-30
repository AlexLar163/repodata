const url = "http://45.177.127.103:1337/empleados/login";

const loginPost = (body) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export default loginPost;
