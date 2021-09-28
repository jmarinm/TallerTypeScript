import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
let studentNameEl: HTMLElement = document.getElementById('studentName')!;
let studentImgEl = document.getElementById('studentAvatar')! as HTMLImageElement;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnfilterByCreds: HTMLElement = document.getElementById("button-filterByCreds")!;
const limInferior: HTMLInputElement = <HTMLInputElement> document.getElementById("box-lim-inf")!;
const limSuperior: HTMLInputElement = <HTMLInputElement> document.getElementById("box-lim-sup")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreds.onclick = () => applyFilterByCreds();

renderStudentInfo(dataStudent);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInfo(student: Student): void {
    console.log('Desplegando Informacion Estudiante');
    let trElement1 = document.createElement("tr");
    let trElement2 = document.createElement("tr");
    let trElement3 = document.createElement("tr");
    let trElement4 = document.createElement("tr");
    let trElement5 = document.createElement("tr");
    trElement1.innerHTML = `<td>Codigo</td>
                           <td>${student.codigo}</td>`
    trElement2.innerHTML = `<td>Cedula</td>
                           <td>${student.cedula}</td>`
    trElement3.innerHTML = `<td>Edad</td>
                           <td>${student.edad} Años </td>`
    trElement4.innerHTML = `<td>Direccion</td>
                           <td>${student.direccion}</td>`
    trElement5.innerHTML = `<td>Telefono</td>
                           <td>${student.tel}</td>`
    studentTbody.appendChild(trElement1);
    studentTbody.appendChild(trElement2);
    studentTbody.appendChild(trElement3);
    studentTbody.appendChild(trElement4);
    studentTbody.appendChild(trElement5);
    studentNameEl.innerHTML = student.name;
    studentImgEl.src = student.img;
            
}
function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByCreds(){
    let limIn = limInferior.valueAsNumber;
    let limSup = limSuperior.valueAsNumber;
    limIn = (limIn == null) ? 0 : limIn;
    limSup = (limSup == null) ? 100 : limSup;

    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCreds(limIn,limSup, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByCreds(bottomLim: number, topLim: number, courses: Course[]){
    return courses.filter(c=> (c.credits >= bottomLim && c.credits <= topLim ));
}
function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}