import React from "react";
import xlsx from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const FileToExcel = (data) => {
  let ws_data = [];

  if (data.data.length > 0) {
    let keysData = Object.keys(data.data[0]);
    let valuesData = [];
    data.data.map((item) => {
      valuesData.push(Object.values(item));
    });

    ws_data.push(keysData);
    ws_data.push(...valuesData);
  }

  let wb = xlsx.utils.book_new();
  wb.Props = {
    Title: "Reporte",
    Subject: "Reporte",
    Author: "User",
    CreatedDate: new Date(),
  };
  wb.SheetNames.push("Reporte Data");
  let ws = xlsx.utils.aoa_to_sheet(ws_data);
  wb.Sheets["Reporte Data"] = ws;
  var wbout = xlsx.write(wb, { bookType: "xlsx", type: "binary" });
  const s2ab = (s) => {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };
  const handleCreateFile = async () => {
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "Reporte.xlsx"
    );
  };
  return (
    <Button variant="contained" size="large" onClick={handleCreateFile}>
      Generar Reporte
    </Button>
  );
};
export default FileToExcel;
