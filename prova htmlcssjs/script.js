const ds = document.getElementById("dogState");
revive();

document.getElementById("killBtn").addEventListener("click", kill);
document.getElementById("reviveBtn").addEventListener("click", revive);

function kill() {
    ds.textContent = "dead";
}

function revive() {
    ds.textContent = "alive";
}