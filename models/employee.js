import { Person } from "./person.js";

export class Employee extends Person {
    constructor (id,name,address,email,positon,dateWork,salaryDate) {
        super(id,name,address,email,positon)
        this.dateWork = dateWork * 1;
        this.salaryDate = salaryDate * 1;
    }
    salary() {
        return this.dateWork * this.salaryDate;
    }
}