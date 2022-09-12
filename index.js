
// function to create buttons for searching by alphabet

function createButton() {
    var btns = ""
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var letterArray = letters.split("")
    btns += '<button class = "myBtn" title = "userButton"><i class = "fa fa-user"></i></button>'
    for(let i = 0; i < 26; i++){
        var letter = letterArray.shift()
        btns += `<button class = "myBtn">${letter}</button>`
    }
    document.getElementById("alphaSearch").innerHTML=btns;
}

createButton();


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

// function to get data from form and store in local storage

(function () {
    var Employee = {
        FirstName : "",
        LastName : "",
        PreferredName : "",
        Email : "",
        JobTitle : "",
        Office : "",
        Department : "",
        PhoneNumber : "",
        SkypeId : ""
    };

    var appLogic = {
        clearUIelements: function() {
            var inputs = document.getElementsByClassName("formData");
            for(let i = 0; i < inputs.length; i++){
                inputs[i].value = "";
            }
        },

        saveitem : function () {
            var lscount = localStorage.length;
            var inputs = document.getElementsByClassName("formData");
            Employee.FirstName = inputs[0].value;
            Employee.LastName = inputs[1].value;
            if(inputs[2].value === ""){
                Employee.PreferredName = FirstName + " " + LastName;
            } else {
                Employee.PreferredName = inputs[2].value;
            }            
            Employee.Email = inputs[3].value;
            Employee.JobTitle = inputs[4].value;
            Employee.Office = inputs[5].value;
            Employee.Department = inputs[6].value;
            Employee.PhoneNumber = inputs[7].value;
            Employee.SkypeId = inputs[8].value;

            localStorage.setItem("Employee_" + lscount, JSON.stringify(Person));

            location.reload();
        }
    };

    var saveButton = document.getElementById("submit")
    saveButton.addEventListener('click', appLogic.saveitem, false)
})

