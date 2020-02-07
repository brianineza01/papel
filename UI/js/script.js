function movediv1() {
    
    let val1=document.getElementById("accountinfo");
    let val2=document.getElementById("history");
    val2.style.display = "block" ;
    val1.style.right = -100 + "vw";
    val2.style.top = 100 + "px";
    alert("js is working great");
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


