import { Validation } from "../service/validation.js";
import { Person } from "./person.js";

const validation = new Validation()

export class ListPerson extends Person {
    personList = [];
    constructor(id, name, address, email, position) {
        super(id, name, address, email, position)
    }

    addPerson(person) {
        // this.personList.push(person);
        this.personList = [...this.personList, person]
    }

    findIndex(id) {
        return this.personList.findIndex((element) => {
            return Number.parseFloat(element.id) === id;
        })
    }

    deletePerson(id) {
        const index = this.findIndex(id);
        this.personList.splice(index, 1);
    }

    editPerson = (id) => {
        return this.personList.find((element) => Number(element.id) == Number.parseFloat(id))
    }

    updatePerson(person) {
        const index = this.findIndex(person.id);
        this.personList[index] = person;
    }

    filterPerson = (type) => {
        return this.personList.filter((element) => {
            if (type === "all") {
                return true;
            }
            return element.position === type;
        })
    }
    filterByName = (keyWord) => {
        return this.personList.filter((element) => {
            const keyWordLocalCase = keyWord.toLowerCase().trim();
            const nameLocalCase = element.name.toLowerCase().trim();

            const keyWordRemoveVNLCase = validation.removeVietnamese(keyWordLocalCase);
            const nameRemoveVNLCase = validation.removeVietnamese(nameLocalCase);

            if (nameRemoveVNLCase.indexOf(keyWordRemoveVNLCase) !== -1) {
                return true;
            }

            return false;
        })
    } 
}