const csv = require("csvtojson");
const fs = require("fs");

csv()
  .fromFile("fletnix_data.csv")
  .then((jsonObj) => {
    fs.writeFileSync("fletnix_data.json", JSON.stringify(jsonObj, null, 2));
  });
