const mainMenuBtns = document.querySelectorAll("#calendar, #tasks-list, #notes");

mainMenuBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        mainMenuBtns.forEach(otherBtn => {
            otherBtn.classList.remove("active");
        });

        btn.classList.add("active");
    });
});