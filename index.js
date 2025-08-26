let editSvg = `<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="size-6"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
/>
</svg>`;
let removeSvg = `<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="size-6"
>
<path
stroke-linecap="round"
stroke-linejoin="round"
d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
/>
</svg>`;
const inputField = document.getElementById("input-field");
const clearBtn = document.getElementById("clear");
const saveBtn = document.getElementById("save");
const colorPicker = document.querySelectorAll(".color-picker");
const tableBody = document.getElementById("tbody");
const dataPicker = document.getElementById("data");
const timePicker = document.getElementById("time");
const tagsPicker = document.getElementById("tags");
const emptyInput = document.getElementById("empty-input");



colorPicker.forEach(colorPicker => {
    colorPicker.addEventListener("click", function (event) {
        console.log(event.target.style.backgroundColor)
        let color1 = event.target.style.backgroundColor;
        console.log(color1);
        inputField.style.color = color1;
        inputField.style.borderColor = color1;
    })

});

function createRow() {


    //----create new row-----

    let newRow = document.createElement("tr");
    newRow.className = "table-row";

    //----create new id---

    let newIdTd = document.createElement("td");
    newIdTd.className = "task-id";
    let circle = document.createElement("button");
    circle.className = "circle";
    circle.innerHTML = ++tableBody.childElementCount;
    let taskColor = inputField.style.color;
    circle.style.backgroundColor = taskColor;
    newIdTd.append(circle);
    // newIdTd.innerHTML = "1";

    //----create new task name---- 

    if (inputField.value === "What needs to be done?") {
        emptyInput.style.display = "block";
    } else {
        emptyInput.style.display = "none";

    }

    let newTaskNameTd = document.createElement("td");
    newTaskNameTd.className = "task-name";
    let taskNameBtn = document.createElement("button");
    taskNameBtn.classList = "task-btn";
    taskNameBtn.innerHTML = inputField.value;
    newTaskNameTd.append(taskNameBtn);
    inputField.value = "What needs to be done?";


    //----create new task time---- 
    if (timePicker.value = "") {
        emptyInput.style.display = "block";
    } else {
        emptyInput.style.display = "none";

    }

    let newTaskTime = document.createElement("td");

    newTaskTime.className = "task-time";
    newTaskTime.innerHTML = dataPicker.value + "<br>" + timePicker.value;
    timePicker.value = "";
    dataPicker.value = "";




    //----create new task tags---- 
    let newTaskTags = document.createElement("td");
    newTaskTags.className = "task-tags";
    let newTaskTagsBtn = document.createElement("button");
    newTaskTagsBtn.className = "tags-btn";
    newTaskTagsBtn.innerHTML = "#" + tagsPicker.value;
    newTaskTags.append(newTaskTagsBtn);
    tagsPicker.value = "";


    //----create new task status---- 

    let newTaskStatusTd = document.createElement("td");
    newTaskStatusTd.className = "task-status";
    let newTaskStatusTdBtn = document.createElement("button");
    newTaskStatusTdBtn.className = "status-button";
    newTaskStatusTdBtn.innerHTML = "in progress";
    newTaskStatusTd.append(newTaskStatusTdBtn);

    //----create new task edit icon---- 

    let newTaskEditTd = document.createElement("td");
    newTaskEditTd.className = "edit-td";
    let newTaskEditTdBtn = document.createElement("button");
    newTaskEditTdBtn.className = "edit-btn";
    newTaskEditTdBtn.innerHTML = editSvg;
    newTaskEditTd.append(newTaskEditTdBtn);

    //----create new task remove icon---- 
    let newTaskRemoveTd = document.createElement("td");
    newTaskRemoveTd.className = "remove-td";
    let newTaskRemoveTdBtn = document.createElement("button");
    newTaskRemoveTdBtn.className = "remove-btn";
    newTaskRemoveTdBtn.innerHTML = removeSvg;
    newTaskRemoveTd.append(newTaskRemoveTdBtn);


    //----append all new element to tr---

    newRow.append(newIdTd,
        newTaskNameTd,
        newTaskTime,
        newTaskTags,
        newTaskStatusTd,
        newTaskEditTd,
        newTaskRemoveTd)

    console.log();

    tableBody.append(newRow);
    newTaskStatusTdBtn.addEventListener("click", function (event) {
        event.target.remove()
        let inProgressBtn = document.createElement("button");
        inProgressBtn.className = "status-button-inProgress";
        inProgressBtn.innerHTML = "in progress"
        newTaskStatusTd.append(inProgressBtn);

        inProgressBtn.addEventListener("click", function (event) {
            event.target.remove()
            let DoneBtn = document.createElement("button");
            DoneBtn.className = "status-button-done";
            DoneBtn.innerHTML = "Done"
            newTaskStatusTd.append(DoneBtn);
        })

    })
    newTaskRemoveTdBtn.addEventListener("click", function () {
        newRow.remove();
    })

    console.log(tableBody.childElementCount);

}

clearBtn.addEventListener('click', function () {
    inputField.value = "What needs to be done?";
    inputField.style.color = "#333333";
    inputField.style.borderColor = "#333333";
    dataPicker.value = "";
    timePicker.value = "";
    tagsPicker.value = "";

})


saveBtn.addEventListener("click", createRow)

