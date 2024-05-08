// Avoid the transform at loading ***************************************************************************************************************************************************************

document.addEventListener("DOMContentLoaded", () => {
    const contentSections = document.querySelectorAll("calendar-body, #taskslist-body, #notes-body");
    contentSections.forEach(section => {
        section.style.visibility = "visible";
    })
})

//Main menu ****************************************************************************************************************************************************************************

const mainMenuBtns = document.querySelectorAll("#calendar, #tasks-list, #notes");
const contentSections = document.querySelectorAll("#calendar-body, #taskslist-body, #notes-body");

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
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth= new Date(currYear, currMonth,0).getDate();
    let liTag= "";

    for (let i= firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                    && currYear === new Date().getFullYear() ? "active" : "";
                            liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i- lastDayofMonth +1}</li>`
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
