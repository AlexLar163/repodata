const dataDate = (date1, date2, idSucursal) => {
  const url = `http://45.177.127.103:1337/report?sucursal=${idSucursal}&fechaInicio=${date1}&fechaFinal=${date2}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

export default dataDate;
