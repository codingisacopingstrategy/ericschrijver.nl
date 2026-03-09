function showEnglish(e) {
    if (e) e.preventDefault();
    document.querySelector(".project-content").classList.remove("hide-english");
    document.querySelector(".project-content").classList.add("hide-french");
}
function showFrench(e) {
    if (e) e.preventDefault();
    document.querySelector(".project-content").classList.remove("hide-french");
    document.querySelector(".project-content").classList.add("hide-english");
}
document.getElementById("language-show-english")?.addEventListener("click", showEnglish);
document.getElementById("language-show-french")?.addEventListener("click", showFrench);
