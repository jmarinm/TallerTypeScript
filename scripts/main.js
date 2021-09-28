import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var studentNameEl = document.getElementById('studentName');
var studentImgEl = document.getElementById('studentAvatar');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCreds = document.getElementById("button-filterByCreds");
var limInferior = document.getElementById("box-lim-inf");
var limSuperior = document.getElementById("box-lim-sup");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreds.onclick = function () { return applyFilterByCreds(); };
renderStudentInfo(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInfo(student) {
    console.log('Desplegando Informacion Estudiante');
    var trElement1 = document.createElement("tr");
    var trElement2 = document.createElement("tr");
    var trElement3 = document.createElement("tr");
    var trElement4 = document.createElement("tr");
    var trElement5 = document.createElement("tr");
    trElement1.innerHTML = "<td>Codigo</td>\n                           <td>" + student.codigo + "</td>";
    trElement2.innerHTML = "<td>Cedula</td>\n                           <td>" + student.cedula + "</td>";
    trElement3.innerHTML = "<td>Edad</td>\n                           <td>" + student.edad + " A\u00F1os </td>";
    trElement4.innerHTML = "<td>Direccion</td>\n                           <td>" + student.direccion + "</td>";
    trElement5.innerHTML = "<td>Telefono</td>\n                           <td>" + student.tel + "</td>";
    studentTbody.appendChild(trElement1);
    studentTbody.appendChild(trElement2);
    studentTbody.appendChild(trElement3);
    studentTbody.appendChild(trElement4);
    studentTbody.appendChild(trElement5);
    studentNameEl.innerHTML = student.name;
    studentImgEl.src = student.img;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByCreds() {
    var limIn = limInferior.valueAsNumber;
    var limSup = limSuperior.valueAsNumber;
    limIn = (limIn == null) ? 0 : limIn;
    limSup = (limSup == null) ? 100 : limSup;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreds(limIn, limSup, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreds(bottomLim, topLim, courses) {
    return courses.filter(function (c) { return (c.credits >= bottomLim && c.credits <= topLim); });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
