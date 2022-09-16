createButton();
initializeData();


//function to create buutons 
function createButton() {
    var btns = ""
    btns += `<button class = "myBtn" title = "userButton" onclick = "getEmployees()"><i class = "fa fa-user"></i></button>`
    for(let i = 65; i < 91; i++){
        var letter = String.fromCharCode(i);
        btns += `<button class = "myBtn pointerStyle" id = "alphaButton" onclick = "alphaFilter('${letter}')">${letter}</button>`
    }
    document.getElementById("alphaSearch").innerHTML=btns;
}


//event listener to open a form by clicking on add employee button

const btn = document.getElementById('addEmployee');

btn.addEventListener('click', () => {
const form = document.getElementById('addNewEmployee');

    if (form.style.display === 'none') {
    form.style.display = 'block';
    } else {
    form.style.display = 'none';
    }
});

// renderEmployees(emptyListInitialize);

var newId = 0;
var emptyListInitialize = [];

function initializeData() {
    if(localStorage.length === 0){
        // localStorage.clear();
        localStorage.setItem("latestId", 0);
        let employee1 = new Map();
        employee1.FirstName = "Adarsh";
        employee1.LastName = "Kumar";
        employee1.PreferredName = "Adarsh Kumar";
        employee1.Email = "adarsh.kr29@gmail.com";
        employee1.JobTitle = "Development Lead - Dot Net";
        employee1.Office = "India";
        employee1.Department = "IT";
        employee1.PhoneNumber = "8290226165";
        employee1.SkypeId = "345678";
        employee1.Image= "images/myPic.jpg"
        employee1.Id = ++newId;

        let employee2 = new Map();
        employee2.FirstName = "John";
        employee2.LastName = "Doe";
        employee2.PreferredName = "John Doe";
        employee2.Email = "john.doe@gmail.com";
        employee2.JobTitle = "BI Developer";
        employee2.Office = "Seattle";
        employee2.Department = "IT";
        employee2.PhoneNumber = "4463709868";
        employee2.SkypeId = "864478";
        employee2.Image = "images/Image1.png"
        employee2.Id = ++newId;

        let employee3 = new Map();
        employee3.FirstName = "Kristine";
        employee3.LastName = "Lee";
        employee3.PreferredName = "Kristine Lee";
        employee3.Email = "kristine.lee@gmail.com";
        employee3.JobTitle = "Recruiting Expert";
        employee3.Office = "Seattle";
        employee3.Department = "HR";
        employee3.PhoneNumber = "4469620708";
        employee3.SkypeId = "987623";
        employee3.Image = "images/Image2.png"
        employee3.Id = ++newId;

        emptyListInitialize.push(employee1);
        emptyListInitialize.push(employee2);
        emptyListInitialize.push(employee3);

        localStorage.setItem("latestId", newId);
        for(let i = 1; i <= newId; i++){
            localStorage.setItem(i, JSON.stringify(emptyListInitialize[i-1]));
        }
        renderEmployees(emptyListInitialize);
    }
}

//function to save data to local storage

function saveItem(event) {
    event.preventDefault();
    let employee= new Map();
    employee = {
        FirstName : "",
        LastName : "",
        PreferredName : "",
        Email : "",
        JobTitle : "",
        Office : "",
        Department : "",
        PhoneNumber : "",
        SkypeId : "",
        Image: "",
        Id: ""
    };    
    
    var inputs = document.getElementsByClassName("formData");
    employee.FirstName = inputs[0].value;
    employee.LastName = inputs[1].value;
    if(inputs[2].value === ""){
        employee.PreferredName = `${employee.FirstName} ${employee.LastName}`;
    } else {
        employee.PreferredName = inputs[2].value;
    }            
    employee.Email = inputs[3].value;
    employee.JobTitle = inputs[4].value;
    employee.Office = inputs[5].value;
    employee.Department = inputs[6].value;
    employee.PhoneNumber = inputs[7].value;
    employee.SkypeId = inputs[8].value;
    employee.Id = newId++;
    let base64String = "";
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        // console.log(reader);
        base64String = reader.result;
        employee.Image = base64String;
        localStorage.setItem(parseInt(localStorage.getItem("latestId"))+1, JSON.stringify(employee));
        const newLatestId = parseInt(localStorage.getItem("latestId"))+1;
        employee.Id = newLatestId;
        localStorage.setItem("latestId", newLatestId);

    }
    reader.readAsDataURL(file);
}

//function to render employees in required template
function renderEmployees(listOfEmployees) {
    var employeeHtmlTemplate = "";
    for(let i = 0; i < listOfEmployees.length; i++){
        employeeHtmlTemplate += `<div class="col-3" id = "imgList">
        <div><img src=${listOfEmployees[i].Image} alt="employee Pic" class = "employeeListImage"></div>
        <div class = "insiderContent">
            <h5><a href="" class = "pointerStyle">${listOfEmployees[i].PreferredName}</a></h5>
            <p>${listOfEmployees[i].JobTitle}</p>
            <p>${listOfEmployees[i].Department} Department</p>
            <a href="#"><i class="fa-solid fa-phone icons"></i></a>
            <a href="#"><i class="fa-sharp fa-solid fa-envelope icons"></i></a>
            <a href="#"><i class="fa-sharp fa-solid fa-comment icons"></i></a>
            <a href="#"><i class="fa-sharp fa-solid fa-star icons"></i></a>
            <a href="#"><i class="fa-sharp fa-solid fa-heart icons"></i></a>
        </div> 
    </div>`
    }
    document.getElementById("displayFilteredList").innerHTML = employeeHtmlTemplate;
}

//function to get employee list from local storage
function getEmployees() {
    let allEmployeeList = [];
    //for i to latestId (inclusive)
    for(let i = 1; i <= localStorage.getItem("latestId"); i++){
        const x = localStorage.getItem(i);
        if(x !== null){
            allEmployeeList.push(JSON.parse(x));
        }
    }
    renderEmployees(allEmployeeList);
    return allEmployeeList;
}


//function to search employee using alphabet
function alphaFilter(letter) {
    var employeeList = getEmployees();
    var filteredEmployeeList = [];
    for(let i = 0; i < employeeList.length; i++){
        if(employeeList[i].PreferredName.toLowerCase().startsWith(letter.toLowerCase())){
            filteredEmployeeList.push(employeeList[i]);
        }
    }
    renderEmployees(filteredEmployeeList);
}


//function to search employee using search bar
function searchByFilterList() {
    var searchInput = document.getElementById('search-input').value;
    const filterValue = document.querySelector('#filter').value;
    const filter = searchInput.toLowerCase();
    const listItems = getEmployees();
    var employeeListByFilter = [];
    listItems.forEach((item) =>{
        if(filterValue === 'FirstName'){
            let text = item.FirstName.toLowerCase();
            console.log(text, filter);
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'LastName'){
            let text = item.LastName.toLowerCase();
            const val = text.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'PreferredName'){
            let text = item.PreferredName.toLowerCase();
            const val = text.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'Email'){
            let text = item.Email.toLowerCase();
            const val = text.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'JobTitle'){
            let text = item.JobTitle.toLowerCase();
            const val = text.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'Office'){
            let text = item.Office.toLowerCase();
            const val = text.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'Department'){
            let text = item.Department.toLowerCase();
            const val = text.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        }
        renderEmployees(employeeListByFilter);    
    }
    );
}

let emplist = getEmployees();
renderEmployees(emplist);

//function to display employee details when clicking on employee name
function getEmployeeById(id) {
    const emp = localStorage.getItem(i);
    return emp;
}

function clearInput() {
    // document.getElementById("search-input").reset();
}

clearInput();