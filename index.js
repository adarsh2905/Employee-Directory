createButton();
let newId = 0;
initializeData();
let emplist = getEmployees();
renderEmployees(emplist);
countOfEmployees(emplist);

//function to create buttons 
function createButton() {
    var btns = "";
    btns += `<button class = "myBtn" onclick = "getEmployees()"><i class = "fa fa-user"></i></button>`
    for(let i = 65; i < 91; i++){
        var letter = String.fromCharCode(i);
        btns += `<button class = "myBtn pointerStyle" id = "alphaButton" onclick = "searchFilter('${letter}')">${letter}</button>`
    }
    document.getElementById("alphaSearch").innerHTML=btns;
}

//function to create sample employees
function initializeData() {
    let currentId = 0;
    if(localStorage.length === 0){
        localStorage.clear();
        localStorage.setItem("latestId", 0);
        let emptyListInitialize = [];
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
        employee1.Id = ++currentId;

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
        employee2.Id = ++currentId;

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
        employee3.Id = ++currentId;

        newId = currentId;
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
function saveItem() {
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
    employee.Id = parseInt(localStorage.getItem("latestId"))+1;
    let base64String = "";
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result;
        employee.Image = base64String;
        localStorage.setItem(parseInt(localStorage.getItem("latestId"))+1, JSON.stringify(employee));
        const newLatestId = parseInt(localStorage.getItem("latestId"))+1;
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
            <h5><a href="" class = "pointerStyle popup" data-bs-toggle = "modal" data-bs-target = "#employeeDetails" onclick = "getEmployeeById('${listOfEmployees[i].Id}')">${listOfEmployees[i].PreferredName}</a></h5>
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
function searchFilter(letter) {
    var employeeList = getEmployees();
    var filteredEmployeeList = [];
    const filterValue = document.querySelector('#filter').value;
    let text = letter.toLowerCase();
    employeeList.forEach((item) =>{
        if(item[filterValue].toLowerCase().includes(text)){
            filteredEmployeeList.push(item);
        }
        renderEmployees(filteredEmployeeList);
    });
}

//function call to search employee using search bar
var inputText = document.getElementById('search-input');
inputText.onkeyup = function(ev) {
    var searchInput = inputText.value;
    searchFilter(searchInput);
}

//function to search employee using side bar
function searchBySideBar(sideBarHeading, sideBarValue) {
    const listItems = getEmployees();
    var employeeListBySideBarFilter = [];
    listItems.forEach((item) =>{
        if(sideBarHeading === 'Department'){
            let text = item.Department;
            if(text === sideBarValue){
                employeeListBySideBarFilter.push(item);
            } 
        } else if(sideBarHeading === 'Office'){
            let text = item.Office;
            if(text === sideBarValue){
                employeeListBySideBarFilter.push(item);
            }
        } else if(sideBarHeading === 'Job Title'){
            let text = item.JobTitle;
            if(text === sideBarValue){
                employeeListBySideBarFilter.push(item);
            }
        }
        renderEmployees(employeeListBySideBarFilter); 
        event.preventDefault();   
    });
}

//function to display employee details when clicking on employee name
function getEmployeeById(id) {
    let emp = JSON.parse(localStorage.getItem(id));
    displayEmployeeDetails(emp);
}

// function to render employee popup profile 
function displayEmployeeDetails(emp) {
    var image = document.getElementById("employeeImage");
    image.src = emp.Image;
    var preferredName = document.getElementById("namePreferred");
    preferredName.innerHTML = emp.PreferredName;
    var firstName = document.getElementById("nameFirst");
    firstName.innerHTML = `<strong>First Name : </strong> ${emp.FirstName}`;
    var lastName = document.getElementById("nameLast");
    lastName.innerHTML = `<strong>Last Name : </strong> ${emp.LastName}`;
    var email = document.getElementById("emailId");
    email.innerHTML = `<strong>Email : </strong> ${emp.Email}`;
    var jobTitle = document.getElementById("job");
    jobTitle.innerHTML = `<strong>Job Title : </strong> ${emp.JobTitle}`;
    var office = document.getElementById("off");
    office.innerHTML = `<strong>Office : </strong> ${emp.Office}`;
    var department = document.getElementById("dept");
    department.innerHTML = `<strong>Department : </strong> ${emp.Department}`;
    var mobile = document.getElementById("cell");
    mobile.innerHTML = `<strong>Phone Number : </strong> ${emp.PhoneNumber}`;
    var skypeId = document.getElementById("idSkype");
    skypeId.innerHTML = `<strong>Skype ID : </strong> ${emp.SkypeId}`;
    document.getElementById("edit").onclick = function(ev){
        updateEmployee(emp);
    }
    document.getElementById("delete").onclick = function(ev){
        deleteEmployee(emp.Id);
    }
}

// function to get popup form to update employee details
function updateEmployee(emp) {
    document.getElementById("formHeading").innerHTML = "Update Employee";
    document.getElementById("fname").value = emp.FirstName;
    document.getElementById("lname").value = emp.LastName;
    document.getElementById("email").value = emp.Email;
    document.getElementById("jobTitle").value = emp.JobTitle;
    document.getElementById("office").value = emp.Office;
    document.getElementById("department").value = emp.Department;
    document.getElementById("telephone").value = emp.PhoneNumber;
    document.getElementById("skype").value = emp.SkypeId;
    var updateButton = document.getElementById("submit");
    updateButton.innerHTML = "Update";
    updateButton.onclick = function(ev){
        setUpdatedEmployeeData(emp.Id);
    }
}

//function to store updated employee data
function setUpdatedEmployeeData(id){
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
    employee.Id = id;
    let base64String = "";
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result;
        employee.Image = base64String;
        localStorage.setItem(parseInt(id), JSON.stringify(employee));
    }
    reader.readAsDataURL(file);
}

// function to create sidebar filter
function countOfEmployees(emplist) {
    var keys = ['IT', 'HR', 'MD',  'UX', 'Sales', 'India', 'Seattle', 'Practice Head', 
    'Development Lead - Dot Net', 'Recruiting Expert', 'BI Developer', 'Analyst', 'Operations Manager', 
    'Product Manager', 'Network Engineer', 'Talent Magnet Jr.', 'Software Engineer', 'UX Designer'];

    var map = new Map();
    for(var i = 0; i < keys.length; i++){
        map.set(keys[i], 0);
    }

    for(var i = 0; i < emplist.length; i++){
        var empDept = emplist[i].Department;
        var empOff = emplist[i].Office;
        var empJob = emplist[i].JobTitle;

        if(map.has(empDept)){
            map.set(empDept, map.get(empDept) + 1);
        }
        if(map.has(empOff)){
            map.set(empOff, map.get(empOff) + 1);
        }
        if(map.has(empJob)){
            map.set(empJob, map.get(empJob) + 1);
        }
    }

    var deptCount = ['IT', 'Human Resources', 'MD', 'UX', 'Sales'];
    var officeCount = ['India', 'Seattle'];
    var jobTitleCount = [ 'SharePoint Practice Head', '.NET Development Lead', 'Recruiting Expert',
    'BI Developer', 'Business Analyst', 'Operations Manager', 'Product Manager', 'Network Engineer',
    'Talent Magnet Jr.', 'Software Engineer', 'UX Designer'];

    var deptLength = deptCount.length;
    var officeLength = officeCount.length;
    var jobTitleLength = jobTitleCount.length;
    var navBar = "";
    navBar += `<nav>
    <h4>Departments</h4>`
    for(var i = 0; i < deptLength; i++){
        navBar += `<li><a href="" class = "pointerStyle textColor" onclick = "searchBySideBar('Department', '${keys[i]}')"> ${deptCount[i]} (${map.get(keys[i])})</a></li>`
    }
    navBar += `<h4>Offices</h4>`
    for(var i = 0; i < officeLength; i++){
        navBar += `<li><a href="" class = "pointerStyle textColor" onclick = "searchBySideBar('Office', '${keys[i+deptLength]}')"> ${officeCount[i]} (${map.get(keys[i+deptLength])})</a></li>`
    }
    navBar += `<h4>Job Titles</h4>`
    for(var i = 0; i < 5; i++){
        navBar += `<li><a href="" class = "pointerStyle textColor" onclick = "searchBySideBar('Job Title', '${keys[i+deptLength+officeLength]}')"> ${jobTitleCount[i]} (${map.get(keys[i+deptLength+officeLength])})</a></li>`
    }
    navBar += `<div id = "displayHiddenList">`
    for(var i = 5; i < jobTitleLength; i++){
        navBar += `<li><a href="" class = "pointerStyle textColor" onclick = "searchBySideBar('Job Title', '${keys[i+deptLength+officeLength]}')"> ${jobTitleCount[i]} (${map.get(keys[i+deptLength+officeLength])})</a></li>`
    }
    navBar += `</div>
            <button id = "collapseButton" type = "button" onclick = "changeName()">view more</button>
    </nav>`
    document.getElementById("navbar").innerHTML = navBar;
}

//function to get toggle in side bar 
function changeName(){
    var buttonValue = document.getElementById("collapseButton").innerHTML;
    var x = document.getElementById("displayHiddenList");

    if(buttonValue === "view more"){
        x.style.display = "block";
        document.getElementById("collapseButton").innerHTML = "view less";
    } else {
        x.style.display = "none";
        document.getElementById("collapseButton").innerHTML = "view more";
    }
}

//function to set default values on click of clear button
function clearInput() {
    getEmployees();
    document.querySelector('#filter').value = 'FirstName';
}

// function to delete an employee
function deleteEmployee(id){
    localStorage.removeItem(parseInt(id));
    window.location.reload();
}