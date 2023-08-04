import { Person } from "./person.js";

export class Customers extends Person {
    constructor (id,name,address,email,positon,company,bill,comment) {
        super(id,name,address,email,positon)
        this.company = company;
        this.bill = bill;
        this.comment = comment;
    }
}