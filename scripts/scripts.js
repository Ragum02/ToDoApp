// Get everything at loading ***************************************************************************************************************************************************************


document.addEventListener("DOMContentLoaded", () => {
    const loadTasks = () => {
        let taskData = JSON.parse(localStorage.getItem("data")) || [];
        taskDate = sortDate(taskData);
        updateTaskContainer(taskData);
        updateTaskListButton(taskData.length);
    };
    const actualNote = () => {
        const noteData = JSON.parse(localStorage.getItem("note-data")) || [];
        updateNoteDisplay(noteData);
        updateNoteBtn(noteData.length);
    };
    actualNote();
    loadTasks();
    const menuBody = document.getElementById("menu-body")
    menuBody.style.visibility = "visible";
    });


//Main menu ****************************************************************************************************************************************************************************

const mainMenuBtns = document.querySelectorAll("#tasks-list, #notes");
const contentSections = document.querySelectorAll("#taskslist-body, #notes-body");

function hideSection(section) {
    if (!section.classList.contains("active")) {
        section.classList.add("hidden");
    }
}

mainMenuBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        mainMenuBtns.forEach(otherBtn => {
            otherBtn.classList.remove("active");
        });
        btn.classList.add("active");

        contentSections.forEach((section, i) => {
            if (i === index) {

                section.style.transition = "transform 0.7s ease-in-out, opacity 0.5s ease-in-out";
                section.style.transform = "translate(50%,50%)";
                section.style.opacity = "1";
                section.style.zIndex = "1";
            } else {

                section.style.transition = "transform 0.7s ease-in-out, opacity 0.5s ease-in-out";
                section.style.transform = "translate(200%,50%)";
                section.style.opacity = "0";
                section.style.zIndex = "-1";
                setTimeout(() => {
                    hideSection(section);
                }, 500);
            }
        })
    })
});
//Calendar ****************************************************************************************************************************************************************************

const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".calendar-symbols span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const calendarRendering = () => {
    let firstDayofMonth = new Date (currYear, currMonth, 1).getDate();
    let lastDateofMonth = new Date(currYear, currMonth +1, 0).getDate();
    let lastDateofLastMonth= new Date(currYear, currMonth,0).getDate();
    let liTag= "";

    for (let i= firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        let monthClass = months[currMonth].toLowerCase();
        liTag += `<li class="${isToday} ${monthClass}">${i}</li>`;
    }

 currentDate.innerText = `${months[currMonth]} ${currYear}`;
 daysTag.innerHTML = liTag;
}
calendarRendering();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id=== "calendar-prev" ? currMonth -1 : currMonth +1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        calendarRendering();
    })
})


//Tasks *****************************************************************************************************************

const tasksInput = document.getElementById("usertext");
const addTaskBtn = document.getElementById("submit-btn");
const dateInput = document.getElementById("date-btn");
const taskContainer = document.getElementById("taskslist-entry")
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const addTask = () => {
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    const taskObj = {
        id: `${tasksInput.value.toLowerCase().split(" ").join(" ")}`,
        date : dateInput.value
    };
    if (dataArrIndex === -1) {
        taskData.unshift(taskObj);
    } else {
        taskData[dataArrIndex] = taskObj;
    }

localStorage.setItem("data", JSON.stringify(taskData));
updateTaskListButton(taskData.length);
updateTaskContainer();
reset();

};

const updateTaskContainer = () => {
    taskContainer.innerHTML = "";

    taskData.forEach(({id, date}) => {
        const formattedDate = new Date(date).toLocaleDateString();
        (taskContainer.innerHTML += `<div class="task" id="${id}">
        <p><strong>Date:</strong> ${formattedDate} <br>
        <strong>${id}</strong>        <button id="deleteTask" onclick="deleteTask(this)" type="button" class="btn">X</button></p>

        </div>`
        )
    }
);

};

const updateTaskListButton = (numberOfTasks) => {
    const taskListButton = document.getElementById("tasks-list");
    const tasksCount = numberOfTasks === undefined ? 0 : numberOfTasks;
    taskListButton.innerHTML = `Tasks lists  <br> <center>${tasksCount}`};

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex,1);
    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskListButton();
}
const reset = () => {
    tasksInput.value = "";
    dateInput.value = "";
    currentTask = {};
}

const sortDate = () => {
    taskData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });
};

addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(tasksInput.value.trim()==='' || dateInput.value.trim() === '') {
        alert('Please fill out all fields.');
        return;

    }

  
    addTask();
    sortDate();
});

// Notes ***********************************************************************************************************************************************
const noteInput = document.getElementById("notes-form");
const noteDisplay = document.getElementById("notes-display");
const noteSubBtn = document.getElementById("notes-sub-btn");
const noteData = JSON.parse(localStorage.getItem("note-data")) || [];
let currentNote = {};

const addNote = () => {
    const dataArrIndex = noteData.findIndex((item) => item.id === currentNote.id);
    const noteObj = {
        id: `${noteInput.value.toLowerCase().split(" ").join(" ")}`,
    };
    if (dataArrIndex === -1) {
        noteData.unshift(noteObj);
    } else {
       noteData[dataArrIndex] = noteObj;
    }

localStorage.setItem("note-data", JSON.stringify(noteData));
updateNoteBtn(noteData.length);
updateNoteDisplay();
resetNote();
};

const updateNoteDisplay = () => {
    noteDisplay.innerHTML = "";

    noteData.forEach(({id}) => {
        (noteDisplay.innerHTML += `<div class="note" id="${id}">
        <p class="note-p">${id}</p>
        <button id="deleteNote" onclick="deleteNote(this)" type="button" class="btn">X</button>
        </div>`
        )
    }
);
};

const updateNoteBtn = (actualNote) => {
    const noteButton = document.getElementById("notes");
    const noteCount = actualNote === undefined ? 0 : actualNote;
    noteButton.innerHTML = `Notes  <br> <center>${noteCount}`};

const deleteNote = (buttonEl) => {
    const dataArrIndex = noteData.findIndex((item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    noteData.splice(dataArrIndex,1);
    localStorage.setItem("note-data", JSON.stringify(noteData));
    updateNoteBtn();
}

const resetNote = () => {
    noteInput.value = "";
    currentNote = {};
}

noteSubBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(noteInput.value.trim()==='') {
        alert('Please fill the note fields.');
        return;

    }

    addNote();

});