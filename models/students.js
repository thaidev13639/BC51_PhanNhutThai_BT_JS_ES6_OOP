import { Person } from "./person.js";

export class Students extends Person {  
    constructor(id,name,address,email,positon,maths,physical,chemistry){
        super(id,name,address,email,positon)
        this.maths = maths * 1;
        this.physical = physical * 1;
        this.chemistry = chemistry * 1;
    }
    score = () => {
        return (this.maths + this.physical + this.chemistry) / 3;
    }
}