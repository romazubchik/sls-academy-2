import fs from 'fs';

export function writeFileInDB(myDB, answers) {
    try {
        myDB.push(answers);

        fs.writeFile('./db/db.txt', JSON.stringify(myDB), (err) => {
            if (err) throw err;
        });
        
        console.log(`User ${answers.name} successfully added`);
    } catch (error) {
        console.log(error.message);
    }
}

export function readFileDB() {
    try {
        let myObject = JSON.parse(fs.readFileSync('./db/db.txt'));

        return myObject;
    } catch (error) {
        console.log(error.message);
    }
}
