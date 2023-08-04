const domEle = (id) => document.getElementById(id);

const showError = (id,text) => {
    domEle(id).innerHTML = text;
    domEle(id).style.display = "block";
}

const hideError = (id) => {
    domEle(id).style.display = "none";
}

const resetValueForm = () => {
    domEle("idCard").value = "";
    domEle("name").value = "";
    domEle("address").value = "";
    domEle("email").value = "";
    domEle("inputSelc").value = "none";
    domEle("maths").value = "";
    domEle("physical").value = "";
    domEle("chemistry").value = "";
    domEle("company").value = "";
    domEle("bill").value = "";
    domEle("comment").value = "";
}
const resetError = () => {
    domEle("errorID").style.display = "none";
    domEle("errorName").style.display = "none";
    domEle("errorAddress").style.display = "none";
    domEle("errorEmail").style.display = "none";
    domEle("errorSelc").style.display = "none";
    domEle("errorMaths").style.display = "none";
    domEle("errorPhysical").style.display = "none";
    domEle("errorChemistry").style.display = "none";
    domEle("errorDateWork").style.display = "none";
    domEle("errorSalary").style.display = "none";
    domEle("errorCompany").style.display = "none";
    domEle("errorBill").style.display = "none";
    domEle("errorComment").style.display = "none";
}