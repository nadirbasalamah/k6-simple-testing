import { exec } from "child_process";
import inquirer from "inquirer";

const tests = ["src/get.js", "src/post.js", "src/put.js", "src/delete.js"];

const runTest = (choice) => {
  runCommand(tests[choice]);
};

const runCommand = (filename) => {
  console.log("please wait...");
  exec(`k6 run ${filename}`, (err, stdout, stderr) => {
    if (err) {
      return;
    }

    console.log(`${stdout}`);
  });
};

const displayMenu = () => {
  console.log("==FEATURE LIST==");
  console.log("1. Get all users");
  console.log("2. Create a new user");
  console.log("3. Update an user");
  console.log("4. Delete user");

  //TODO: get input from user

  const questions = [
    {
      type: "input",
      name: "choice",
      message: "Enter your choice (1-4): ",
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    //TODO: validation
    let choice = Number.parseInt(answers.choice) - 1;

    const isValid = choice >= 0 && choice < tests.length;

    if (isValid) {
      runTest(choice);
    } else {
      console.error("Invalid input");
    }
  });
};

displayMenu();
