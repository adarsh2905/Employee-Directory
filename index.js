createButton();
//function to create buutons 
function createButton() {
    var btns = "";
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

let newId = 0;
let employeeCount = [];
initializeData();
function initializeData() {
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
            employeeCount.push(emptyListInitialize[i-1].Id);
            localStorage.setItem(i, JSON.stringify(emptyListInitialize[i-1]));
        }
        renderEmployees(emptyListInitialize);
    }
}

//function to save data to local storage

function saveItem(event) {
    // event.preventDefault();
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
    employeeCount.push(employee.Id);
    let base64String = "";
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result;
        employee.Image = base64String;
        localStorage.setItem(parseInt(localStorage.getItem("latestId"))+1, JSON.stringify(employee));
        const newLatestId = parseInt(localStorage.getItem("latestId"))+1;
        employee.Id = newLatestId;
        localStorage.setItem("latestId", newLatestId);

    }
    reader.readAsDataURL(file);
}


let empDetailsPopup = [];
//function to render employees in required template
function renderEmployees(listOfEmployees) {
    var employeeHtmlTemplate = "";
    for(let i = 0; i < listOfEmployees.length; i++){
        empDetailsPopup.push(listOfEmployees[i].Id);
        employeeHtmlTemplate += `<div class="col-3" id = "imgList">
        <div><img src=${listOfEmployees[i].Image} alt="employee Pic" class = "employeeListImage"></div>
        <div class = "insiderContent">
            <h5><a href="" class = "pointerStyle popup" id = "employeeDetails" onclick = "getEmployeeById('${empDetailsPopup[i]}')">${listOfEmployees[i].PreferredName}</a></h5>
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

let emplist = getEmployees();
renderEmployees(emplist);


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
    const sideBarOfficeFilter = document.querySelector('#sideBarOfficeFilter').value;
    const filter = searchInput.toLowerCase();
    const listItems = getEmployees();
    var employeeListByFilter = [];
    listItems.forEach((item) =>{
        if(filterValue === 'FirstName'){
            let text = item.FirstName.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'LastName'){
            let text = item.LastName.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'PreferredName'){
            let text = item.PreferredName.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'Email'){
            let text = item.Email.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'JobTitle'){
            let text = item.JobTitle.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'Office'){
            let text = item.Office.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        } else if(filterValue === 'Department'){
            let text = item.Department.toLowerCase();
            if(text.includes(filter)){
                employeeListByFilter.push(item);
            }
        }

        if(sideBarOfficeFilter === 'India'){
            let text = item.Office;
            if(text === 'India'){
                console.log("India");
                employeeListByFilter.push(item);
            }
        }
        renderEmployees(employeeListByFilter);    
    }
    );
}

//function to display employee details when clicking on employee name
function getEmployeeById(id) {
    let emp = JSON.parse(localStorage.getItem(id));
    event.preventDefault();
    console.log(emp);
    displayEmployeeDetails(emp);
}

function displayEmployeeDetails(emp) {
    let htmlStr = `<div class="profilePopup popuptext" id = "employeeDetails">
        <img src="${emp.Image}" alt="employeePic" class = "employeePic">
        <h1>${emp.PreferredName}</h1>
        <p class="profileDescription"><strong>First Name : </strong>${emp.FirstName}</p>
        <p class="profileDescription"><strong>Last Name : </strong>${emp.LastName}</p>
        <p class="profileDescription"><strong>Email : </strong>${emp.Email}</p>
        <p class="profileDescription"><strong>Job Title : </strong>${emp.JobTitle}</p>
        <p class="profileDescription"><strong>Office : </strong>${emp.Office}</p>
        <p class="profileDescription"><strong>Department : </strong>${emp.Department}</p>
        <p class="profileDescription"><strong>Phone Number : </strong>${emp.PhoneNumber}</p>
        <p class="profileDescription"><strong>Skype ID : </strong>${emp.SkypeId}</p>
        <button class="btn btn-primary editButton" type="edit" id = "edit" value="Edit" onclick="">Edit</button>
        <button class="btn btn-secondary deleteButton" type="delete" id = "delete" value="Delete" onclick="">Delete</button>
    </div>`;
    var child = document.createElement('div');
    child.innerHTML = htmlStr;
    child = child.firstChild;
    document.getElementById('profileDetails').appendChild(child);
}


countOfEmployees(emplist);
function countOfEmployees(emplist) {
    var deptIT = 0, deptHR = 0, deptMD = 0, deptSales = 0, deptUX =0;
    var offIndia = 0, offSeattle = 0;
    var jobLeadEngineer = 0, jobPracticeHead = 0, jobRecruitExpert = 0, jobBIDeveloper = 0, jobAnlayst = 0; 
    var jobOpsManager = 0, jobProductManager = 0, jobNetworkEngineer = 0, jobTalentMagnet = 0, jobSoftwareEngineer = 0, jobUXDesigner = 0; 
    
    for(let i = 0; i < emplist.length; i++){
        var empDept = emplist[i].Department;
        var empOff = emplist[i].Office;
        var empJob = emplist[i].JobTitle;

        if (empDept === "IT"){
            deptIT++;
        }
        if (empDept === "HR"){
            deptHR++;
        }
        if (empDept === "MD"){
            deptMD++;
        }
        if (empDept === "Sales"){
            deptSales++;
        }
        if (empDept === "UX"){
            deptUX++;
        }

        if (empOff === "India"){
            offIndia++;
        }
        if (empOff === "Seattle"){
            offSeattle++;
        }

        if (empJob === "Development Lead - Dot Net"){
            jobLeadEngineer++;
        }
        if (empJob === "Practice Head"){
            jobPracticeHead++;
        }
        if (empJob === "Recruiting Expert"){
            jobRecruitExpert++;
        }
        if (empJob === "BI Developer"){
            jobBIDeveloper++;
        }
        if (empJob === "Analyst"){
            jobAnlayst++;
        }
        if (empJob === "Operations Manager"){
            jobOpsManager++;
        }
        if (empJob === "Product Manager"){
            jobProductManager++;
        }
        if (empJob === "Network Engineer"){
            jobNetworkEngineer++;
        }
        if (empJob === "Talent Magnet Jr."){
            jobTalentMagnet++;
        }
        if (empJob === "Software Engineer"){
            jobSoftwareEngineer++;
        }
        if (empJob === "UX Designer"){
            jobUXDesigner++;
        }
    }

    var navBar = "";
    navBar = `<nav>
        <h4>Departments</h4>
        <li><a href="" class = "pointerStyle textColor" onclick = "">IT (${deptIT})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">Human Resources (${deptHR})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">MD (${deptMD})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">UX (${deptUX})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">Sales (${deptSales})</a></li>
        <h4>Offices</h4>
        <li><a href="" value = "" class = "pointerStyle textColor" onclick = "">India (${offIndia})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">Seattle(${offSeattle})</a></li>
        <h4>Job Titles</h4>
        <li><a href="" class = "pointerStyle textColor" onclick = "">SharePoint Pratice Head (${jobPracticeHead})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">.NET Development Lead (${jobLeadEngineer})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">Recruiting Expert (${jobRecruitExpert})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">BI Developer (${jobBIDeveloper})</a></li>            <li><a href="" class = "pointerStyle textColor" onclick = "">Business Analyst (${jobAnlayst})</a></li>
        <div id = "displayHiddenList">
        <li><a href="" class = "pointerStyle textColor" onclick = "">Operations manager (${jobOpsManager})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">Product Manager (${jobProductManager})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">Network Engineer (${jobNetworkEngineer})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">Talent Magnet Jr. (${jobTalentMagnet})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">Software Engineer (${jobSoftwareEngineer})</a></li>
        <li><a href="" class = "pointerStyle textColor" onclick = "">UI Designer (${jobUXDesigner})</a></li>
        </div>
        <button id = "collapseButton" type = "button" onclick = "changeName()">view more</button>
    </nav>`
    document.getElementById("navbar").innerHTML = navBar;
}

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

function clearInput() {
    getEmployees();
    document.querySelector('#filter').value = 'FirstName';
}