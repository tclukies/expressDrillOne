const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3002;
const csvToJson = require("convert-csv-to-json");
const cohorts = csvToJson.fieldDelimiter(",").getJsonFromCsv("./cohorts.csv");

app.use(cors());

function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        let holder = data[i].ID.toString();
        if (holder === id) {
            return data[i];
        }
    }
}

app.get("/", (req, res) => {
    res.json({ data: cohorts });
});

app.get("/:id", (req, res) => {
    var record = findById(cohorts, req.params.id);
    if (!record) {
        res.status = 404;
        res.json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        res.json({ data: record });
    }
});

app.listen(port, () => {
    console.log("listening on port", port);
});
