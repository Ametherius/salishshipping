var date = new Date();
let year = date.getFullYear();
var birthYear = 1989;

var age = year - birthYear;

document.getElementById('age').innerHTML = age;
document.getElementById('year').innerHTML = year;