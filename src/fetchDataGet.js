const fetchDataGet = async() => {
  const url = "http://45.177.127.103:1337/sucursals";
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export default fetchDataGet;
