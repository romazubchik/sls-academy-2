const readline = require('readline');
const questions = require('./components/questions');
const sortingMethods = require('./components/sortingMethods');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(questions.enterQuestion, (answer) => {
  if (answer.trim() === 'exit') {
    rl.close();
  } else {
    const data = answer.split(' ');
    const stringData = data.filter((i) => isNaN(i));
    const numberData = data.filter(Number);
    rl.setPrompt('Select (1 - 6) and press Enter: ');

    console.log(questions.sortQuestuon);
    rl.prompt();
    rl.on('line', (input) => {
      switch (input.trim()) {
        case 'exit':
          rl.close();
        case '1':
          console.log(sortingMethods.sortAZ(stringData));
          break;
        case '2':
          console.log(sortingMethods.sortIncreasing(numberData));
          break;
        case '3':
          console.log(sortingMethods.sortDecreasing(numberData));
          break;
        case '4':
          console.log(sortingMethods.sortWordsByLength(stringData));
          break;
        case '5':
          console.log(sortingMethods.showUniqueWords(stringData));
          break;
        case '6':
          console.log(sortingMethods.showUniqueElements(stringData));
          break;
        default:
          console.log(`Please enter a number from 1 - 6`);
          break;
      }
      rl.prompt();
    }).on('close', () => {
      console.log('Ok, Bye!');
      process.exit(0);
    });
  }
}
);