import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import FileToExcel from "./FileToExcel";

// Components
import TableData from "./TableData";

// Data
import fetchDataGet from "./fetchDataGet";
import dataDate from "./dataDate";

import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/lab";
moment.defineLocale("es", {
  months:
    "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
  monthsShort:
    "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
  weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#c5cae9",
    },
    title: {
      fontWeight: "bold",
      color: "#e8eaf6",
      margin: "15px",
    },
    select: {
      margin: "15px auto",
      width: "calc(100% - 250px)",
    },
    main: {
      display: "flex",
    },
    datePicker: {
      margin: "15px auto",
      backgroundColor: "#e8eaf6",
    },
    button: {
      padding: "15px",
    },
  })
);

const Search = () => {
  const classes = useStyles();
  const [dataSucursal, setDataSucursal] = useState([]);
  const [searchDataSucursal, setSearchDataSucursal] = useState([]);
  const [age, setAge] = useState("");
  const [dateNow, setDateNow] = useState(moment().format("L"));
  const [dateLater, setDateLater] = useState(
    moment().subtract(5, "days").format("L")
  );

  const handleChangeDataNow = (date) => {
    const newDate = moment(date).subtract(5, "days").format("L");
    setDateLater(newDate);
    setDateNow(date);
  };
  const handleChangeDataLater = (date) => {
    const newDate = moment(date).add(5, "days").format("L");
    setDateNow(newDate);
    setDateLater(date);
  };

  const handleChange = async (event) => {
    setAge(event.target.value);
    const sucursalSelected = await dataSucursal.filter((item) => {
      if (item.nombre === event.target.value) {
        return item;
      }
    });
    dataDate(
      moment(dateLater).format("YYYY-MM-DD"),
      moment(dateNow).format("YYYY-MM-DD"),
      sucursalSelected[0].id
    ).then((data) => {
      setSearchDataSucursal(data);
    });
    // dataDate("2021-11-21", "2021-11-26");
  };

  useEffect(() => {
    const setDataSync = async () => {
      setDataSucursal(
        await fetchDataGet().then((data) => {
          return data;
        })
      );
    };
    setDataSync();
  }, []);
  return (
    <>
      <header className={classes.root}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            className={classes.datePicker}
            label="Fecha 2"
            value={dateLater}
            onChange={(newValue) => {
              handleChangeDataLater(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider
          className={classes.datePicker}
          dateAdapter={AdapterDateFns}
        >
          <DatePicker
            label="Fecha 1"
            value={dateNow}
            onChange={(newValue) => {
              handleChangeDataNow(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </header>
      <main>
        <div className={classes.main}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
            className={classes.select}
          >
            {dataSucursal.map((sucursal) => {
              return (
                <MenuItem key={sucursal.id} value={sucursal.nombre}>
                  {sucursal.nombre}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <TableData data={searchDataSucursal}></TableData>;
        <FileToExcel data={searchDataSucursal}/>
      </main>
    </>
  );
};

export default Search;
