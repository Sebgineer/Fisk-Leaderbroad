
//#region Fetch data

const apiURL = "https://192.168.1.147:5000";

const getScore = (option = "points") => {
    try {
        fetch(`${apiURL}/${option}`, {
            method: "GET"
        })
        .then((response) => {
            response;
            if (response) {
                RenderData(response);
            }
        })
        .catch((error) => {
            console.error("fetch failed");
        });
    }
    catch {
        console.error("Failed to fetch");
    }
}

//#endregion

//#region Render Data

const dummyData = {"score": [
    {"total": 2, "name": "Kelvin", "grams": 2, "points": 2},
    {"total": 2, "name": "Marcus", "grams": 2, "points": 2},
    {"total": 2, "name": "Tobias", "grams": 2, "points": 2},
]};

const RenderData = (data) => {
    const tableBodyElement = document.getElementById('tablebody');
    tableBodyElement.innerHTML = "";

    data.forEach(dataElement => {
        let newRow = tableRowTemplate;
        newRow = newRow.replace("%NAME%", dataElement.name)
            .replace("%TOTAL%", dataElement.total)
            .replace("%GRAMS%", dataElement.grams)
            .replace("%POINTS%", dataElement.points);

        tableBodyElement.innerHTML += newRow;
    });
}

const tableRowTemplate = 
'<td>' +
'%NAME%' +
'</td>' +
'<td>' +
'%TOTAL% fisk' +
'</td>' +
'<td>' +
'%GRAMS% g' +
'</td>' +
'<td>' +
'%POINTS% p' +
'</td>';

//#endregion

//#region Events

let currentHeadElement = document.getElementById("header_points");
currentHeadElement.classList.add("star");

window.onload = (event) => {
    RenderData(dummyData.score);
};

const onClickHeaderLeader = (id, board) => {
    currentHeadElement.classList.remove("star");
    currentHeadElement = document.getElementById(id);
    currentHeadElement.classList.add("star");

    getScore(board);
}

//#endregion
