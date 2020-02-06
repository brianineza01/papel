function movediv1() {
    alert("js is working great");
    let val1=document.getElementById("accountinfo");
    let val2=document.getElementById("history");
    val2.style.display = "block" ;
}
function moveele() {
    let d = document.getElementById("debit");
    let s = document.getElementById("credit");
    d.style.display = "block";
    s.style.display = "none";
}
function moveelm() {
    let d = document.getElementById("debit");
    let s = document.getElementById("credit");
    d.style.display = "none";
    s.style.display = "block";
}


