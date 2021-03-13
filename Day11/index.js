const express = require("express");
const app = express();
app.listen(8080, "192.168.31.104", () => {
  console.log("server is running!");
});

function tinhTong(a, b) {
  let tong = parseInt(a) + parseInt(b);
  return tong;
}

app.get("/", (req, res) => {
  let { a, b } = req.query;
  res.send(
    '<div style="background-color:black;color:white;text-align: center;">'+
    '<h1>tong a va b la:</h1>' +
      "<h1>" +
      tinhTong(a, b) +
      "</h1></div>"
  );
});

app.get("/home", (req, res) => {
  console.log("home is being used");
  res.send(
    '<div style="text-align: center;background-color:black;color:white"><h1>hello</h1><h1>cmnm</h1></div>'
  );
});
