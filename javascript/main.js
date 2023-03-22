
//#region Fetch data

const apiURL = "http://localhost:5000";
let refreshOption = "toppoints/15";

const getScore = async (option = null) => {
    try {
        if (option == null) {
            option = refreshOption;
        }
        refreshOption = option;
        const myRequest = new Request(`${apiURL}/${option}`);
        
        const response = await fetch(myRequest, {
            method: "GET",
        });
        const data = await response.json();
        console.log(data);
        RenderData(data);
    }
    catch {
        console.error("Failed to fetch");
    }
}

//#endregion

//#region Render Data

const RenderData = (data) => {
    const tableBodyElement = document.getElementById('tablebody');
    tableBodyElement.innerHTML = "";

    data.forEach(dataElement => {
        let newRow = tableRowTemplate;
        newRow = newRow.replace("%NAME%", dataElement.name)
            .replace("%TOTAL%", dataElement.mostFish)
            .replace("%GRAMS%", dataElement.highestWeight)
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
    getScore();
    setInterval(() => {
        getScore();
    }, 10000);
};

const onClickHeaderLeader = (id, board) => {
    currentHeadElement.classList.remove("star");
    currentHeadElement = document.getElementById(id);
    currentHeadElement.classList.add("star");

    getScore(board);
}

//#endregion
