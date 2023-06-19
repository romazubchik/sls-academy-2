import inquirer from 'inquirer';
import { readFileDB, writeFileInDB } from './components/dbOperations.js';

let myDB = readFileDB();

function startApp() {
    addUser();
}

function addUser() {
    try {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "Enter the user's name. To cancel press ENTER: "
                },
                {
                    when: (answers) => answers.name.trim() === '',
                    type: 'confirm',
                    message: 'Would you to search values in DB?: ',
                    name: 'searchInDBConfirmation',

                },
                {
                    when: (answers) => answers.name.trim() !== '',
                    type: 'list',
                    name: 'gender',
                    message: "Choose users Gender: ",
                    choices: ['male', 'female', 'intersex'],
                },
                {
                    when: (answers) => answers.name.trim() !== '',
                    type: 'input',
                    name: 'age',
                    message: "Enter the user's age: ",
                    validate: (input) => {
                        const age = parseInt(input);
                        if (isNaN(age))
                            return "Age should be a number";
                        return true;
                    },
                },
            ])
            .then(answers => {
                switch (answers.searchInDBConfirmation) {
                    case true:
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    message: 'Enter name you want to find in DB (To see all users, enter "all"): ',
                                    name: 'search',
                                },
                            ])
                            .then((answers) => {
                                answers.search === "all" ? console.info(myDB) : searchData(answers.search);
                            });
                        break;
                    case false:
                        process.exit(0);
                    default:
                        writeFileInDB(myDB, answers);
                        addUser();
                        break;
                }
            });
    } catch (error) {
        console.log(error.message);
    }
}

function searchData(answer) {
    try {
        let dataFound = false;

        myDB.map((i) => {
            if (i.name.toLowerCase() === answer.toLowerCase()) {
                console.info(i);
                dataFound = true;
            }
        });

        dataFound ? console.log(`User ${answer} does exist`) : console.log(`User ${answer} does not exist`);

    } catch (error) {
        console.log(error.message);
    }
}

startApp();