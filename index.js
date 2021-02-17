const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the project?"
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?"
    },
    {
      type: "input",
      name: "hobby",
      message: "What is your favorite hobby?"
    },
    {
      type: "input",
      name: "food",
      message: "What is your favorite food?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]);
}

function generateREAD(answers) {
  return `
  ## ${answers.title}
    I am from ${answers.location}.
    My GitHub username is ${answers.github}
    LinkedIn URL ${answers.linkedin}
`;
}

async function init() {
//   console.log("hi")
  try {
    const answers = await promptUser();

    const read = generateREAD(answers);

    await writeFileAsync("README.md", read);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();
