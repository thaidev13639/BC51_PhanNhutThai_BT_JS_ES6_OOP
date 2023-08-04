import { Person } from "../models/person.js";
import { Validation } from "../service/validation.js";
import { Customers } from "../models/customers.js";
import { Employee } from "../models/employee.js";
import { Students } from "../models/students.js";
import { ListPerson } from "../models/controllerList.js";



const listPerson = new ListPerson()
const validation = new Validation();
const person = new Person();



const getFormValue = () => {
    const id = domEle("idCard").value * 1;
    const name = domEle("name").value;
    const address = domEle("address").value;
    const email = domEle("email").value;
    const position = domEle("inputSelc").value;

    const person = new Person(id, name, address, email, position);

    return person;
}

const display = (styleMaths, stylePhysical, styleChemistry, styleDateW, styleSalary, styleCompany, styleBill, styleComment) => {
    domEle("inputMaths").style.display = styleMaths;
    domEle("inputPhysical").style.display = stylePhysical;
    domEle("inputChemistry").style.display = styleChemistry;
    domEle("inputDateW").style.display = styleDateW;
    domEle("inputSalary").style.display = styleSalary;
    domEle("inputCompany").style.display = styleCompany;
    domEle("inputBill").style.display = styleBill;
    domEle("inputComment").style.display = styleComment;
}

// Open input 
domEle("inputSelc").onchange = () => {
    const type = domEle("inputSelc").value;

    switch (type) {
        case "none":
            display("none", "none", "none", "none", "none", "none", "none", "none");
            break;
        case "student":
            display("block", "block", "block", "none", "none", "none", "none", "none");
            break;
        case "employee":
            display("none", "none", "none", "block", "block", "none", "none", "none");
            break;
        case "customer":
            display("none", "none", "none", "none", "none", "block", "block", "block");
    };
}

const setLocalStore = (arr = listPerson.personList) => {
    const string = JSON.stringify(arr);
    localStorage.setItem("Person", string);
}

const getLocalStore = () => {
    const string = localStorage.getItem("Person");
    if (string) {
        listPerson.personList = JSON.parse(string);
    }

}

const renderTable = (arr = listPerson.personList) => {
    const content = arr.reduce((total, element) => {
        return total += `
            <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.address}</td>
                <td>${element.email}</td>
                <td>${element.position}</td>
                <td>
                    <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick = "editPer(${element.id})" >Edit</button>
                    <button class="btn btn-danger" onclick = "deletePer(${element.id})" >Delete</button>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick = "moreDetail(${element.id})" >More</button>
                </td>
            </tr>
        `
    }, "");

    domEle("tblDanhSachSP").innerHTML = content;
}

window.onload = () => {
    getLocalStore();
    renderTable();
}

const saveData = () => {
    setLocalStore();
    renderTable();
}

domEle("btnThemSP").onclick = () => {
    resetValueForm();
    resetError();
    domEle("idCard").disabled = false;
    document.querySelector(".modal-footer").innerHTML = `<button class="btn btn-success"  onclick="addPerson()">Add</button>`;
}

const checkValid = () => {
    let valid = true;

    const id = domEle("idCard").value;
    const name = domEle("name").value;
    const address = domEle("address").value;
    const email = domEle("email").value;
    const position = domEle("inputSelc").value;

    const person = listPerson.editPerson(id);
    
    valid &= validation.checkempty(id, "errorID", "(*) Please do not leave it blank") && validation.checkNumber(id,"errorID","(*) ID min 1 max 1000", 1,1000 ) && validation.checkID(person,"errorID", "(*) ID already available") ;

    valid &= validation.checkempty(name, "errorName", "(*) Please do not leave it blank") && validation.checkLength(name,"errorName","(*) Name from 4 - 25", 4,25 ) && validation.checkPattern(name, "errorName", "(*)Please enter correct","^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");

    valid &= validation.checkempty(address, "errorAddress", "(*) Please do not leave it blank") && validation.checkLength(address, "errorAddress", "(*) Address form 4 keyword",4,100);
    valid &= validation.checkempty(email, "errorEmail", "(*) Please do not leave it blank") && validation.checkPattern(email, "errorEmail", "(*) Please enter correct",/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    valid &= validation.checkSelc("inputSelc", "errorSelc", "(*) Please choose position");

    if (position === "student") {
        const maths = domEle("maths").value;
        const physical = domEle("physical").value;
        const chemistry = domEle("chemistry").value;

        valid &= validation.checkempty(maths, "errorMaths", "(*) Please do not leave it blank") && validation.checkNumber(maths, "errorMaths","Score form 0 to 10",0,10);
        valid &= validation.checkempty(physical, "errorPhysical", "(*) Please do not leave it blank") && validation.checkNumber(physical, "errorPhysical","Score form 0 to 10",0,10);
        valid &= validation.checkempty(chemistry, "errorChemistry", "(*) Please do not leave it blank") && validation.checkNumber(chemistry, "errorChemistry","Score form 0 to 10",0,10);

    } else if (position === "employee") {
        const dateWork = domEle("dateWork").value;
        const salary = domEle("salary").value;

        valid &= validation.checkempty(dateWork, "errorDateWork", "(*) Please do not leave it blank") && validation.checkNumber (dateWork, "errorDateWork","Can work form 1 to 31 days",1,31);
        valid &= validation.checkempty(salary, "errorSalary", "(*) Please do not leave it blank") && validation.checkNumber (salary, "errorSalary","Salary min 1 and maximum's 200$ for 1 day",1,200);

    } else if (position === "customer") {
        const company = domEle("company").value;
        const bill = domEle("bill").value;
        const comment = domEle("comment").value;

        valid &= validation.checkempty(company, "errorCompany", "(*) Please do not leave it blank");
        valid &= validation.checkempty(bill, "errorBill", "(*) Please do not leave it blank") && validation.checkNumber(bill, "errorBill", "(*) Bill minimun 200$ and maximum 5000$",200,5000);
        valid &= validation.checkempty(comment, "errorComment", "(*) Please do not leave it blank");

    }

    return valid;
}
window.addPerson = () => {

    const person = getFormValue();
    const { id, name, address, email, position } = person;

    const valid = checkValid();

    if (valid) {
        if (position === "student") {

            const maths = domEle("maths").value;
            const physical = domEle("physical").value;
            const chemistry = domEle("chemistry").value;

            const student = new Students(id, name, address, email, position, maths, physical, chemistry)

            listPerson.addPerson(student);

            saveData()
        } else if (position === "employee") {

            const dateWork = domEle("dateWork").value;
            const salary = domEle("salary").value;

            const employee = new Employee(id, name, address, email, position, dateWork, salary);

            listPerson.addPerson(employee);

            saveData()
        } else if (position === "customer") {

            const company = domEle("company").value;
            const bill = domEle("bill").value;
            const comment = domEle("comment").value;

            const customer = new Customers(id, name, address, email, position, company, bill, comment);

            listPerson.addPerson(customer);

            saveData()
        }
    }
}

window.editPer = (idPer) => {
    resetError();
    const person = listPerson.editPerson(idPer);

    domEle("idCard").value = person.id;
    domEle("idCard").disabled = true;

    domEle("name").value = person.name;
    domEle("address").value = person.address;
    domEle("email").value = person.email;
    domEle("inputSelc").value = person.position;

    switch (person.position) {
        case "none":
            display("none", "none", "none", "none", "none", "none", "none", "none");
            break;
        case "student":
            display("block", "block", "block", "none", "none", "none", "none", "none");
            domEle("maths").value = person.maths;
            domEle("physical").value = person.physical;
            domEle("chemistry").value = person.chemistry;
            break;
        case "employee":
            display("none", "none", "none", "block", "block", "none", "none", "none");
            domEle("dateWork").value = person.dateWork;
            domEle("salary").value = person.salaryDate;
            break;
        case "customer":
            display("none", "none", "none", "none", "none", "block", "block", "block");
            domEle("company").value = person.company;
            domEle("bill").value = person.bill;
            domEle("comment").value = person.comment;
    };

    // domEle("addPerson").style.display = "none";
    document.querySelector(".modal-footer").innerHTML = `<button id="btnUpdate" class="btn btn-warning" style="display:"block" onclick="btnUpdate(${idPer})">Update</button>`
}

window.btnUpdate = (idPer) => {
    
    const person = getFormValue();
    const { id, name, address, email, position } = person;

    const type = domEle("inputSelc").value;

    if (type === "student") {

        const maths = domEle("maths").value;
        const physical = domEle("physical").value;
        const chemistry = domEle("chemistry").value;

        const student = new Students(id, name, address, email, position, maths, physical, chemistry)

        listPerson.updatePerson(student);

        saveData()
    } else if (type === "employee") {

        const dateWork = domEle("dateWork").value;
        const salary = domEle("salary").value;

        const employee = new Employee(id, name, address, email, position, dateWork, salary);

        listPerson.updatePerson(employee);

        saveData()
    } else if (type === "customer") {

        const company = domEle("company").value;
        const bill = domEle("bill").value;
        const comment = domEle("comment").value;

        const customer = new Customers(id, name, address, email, position, company, bill, comment);

        listPerson.updatePerson(customer);

        saveData()
    }
    domEle("close").click()
}

window.deletePer = (id) => {
    listPerson.deletePerson(id);
    saveData();
}

window.moreDetail = (idPer) => {
    const person = listPerson.editPerson(idPer);

    if (person.position === "student") {
        const { id, name, address, email, position, maths, physical, chemistry } = person;

        const student = new Students(id, name, address, email, position, maths, physical, chemistry)

        const score = student.score()

        domEle("moreInfor").innerHTML = `
        <h1>${student.name}</h1>
        <p>Maths : ${student.maths} point</p>
        <p>Physical : ${student.physical} point</p>
        <p>Chemistry : ${student.chemistry} point</p>
        <p>Medium Score : ${score} point</p>
        `
    } else if (person.position === "employee") {
        const { id, name, address, email, position, dateWork, salaryDate } = person;

        const employee = new Employee(id, name, address, email, position, dateWork, salaryDate);

        const salaryEmployee = employee.salary();

        domEle("moreInfor").innerHTML = `
        <h1>${employee.name}</h1>
        <p>Number of working days : ${employee.dateWork}</p>
        <p>Salary for 1 day : ${employee.salaryDate} $</p>
        <p>Salary total : ${salaryEmployee} $ </p>
        `
    } else if (person.position === "customer") {
        const { id, name, address, email, position, company, bill, comment } = person;

        const customer = new Customers(id, name, address, email, position, company, bill, comment)

        domEle("moreInfor").innerHTML = `
        <h1>${customer.name}</h1>
        <p>Company : ${customer.company}</p>
        <p>Bill for product : ${customer.bill} $</p>
        <p>Comment : ${customer.comment}</p>
        `
    } else {
        domEle("moreInfor").innerHTML = ""
    }
}

domEle("selc").onchange = () => {
    const type = domEle("selc").value;
    const listFilter = listPerson.filterPerson(type);

    renderTable(listFilter);
}

const searchName = () => {
    const keyword = domEle("searchName").value;
    const listByName = listPerson.filterByName(keyword);

    renderTable(listByName);
}

domEle("searchName").addEventListener("keyup", searchName);