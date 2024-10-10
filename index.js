import { exec } from "child_process";
import inquirer from "inquirer";
import ora from "ora";

const tests = ["src/get.js", "src/post.js", "src/put.js", "src/delete.js"];

const runTest = (choice) => {
  runCommand(tests[choice]);
};

const runCommand = (filename) => {
  const spinner = ora("Running test...").start();
  exec(`k6 run ${filename}`, (err, stdout, stderr) => {
    if (err) {
      spinner.fail("test failed");
      return;
    }

    console.log(`${stdout}`);
    spinner.succeed("Test completed");
  });
};

const displayMenu = () => {
  console.log("==FEATURE LIST==");
  console.log("1. Get all users");
  console.log("2. Create a new user");
  console.log("3. Update an user");
  console.log("4. Delete user");

  const questions = [
    {
      type: "input",
      name: "choice",
      message: "Enter your choice (1-4): ",
    },
  ];
  inquirer.prompt(questions).then((answers) => {
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
