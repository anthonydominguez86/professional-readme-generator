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
      name: "description",
      message: "What is the description of your project?"
    },
    {
      type: "input",
      name: "contents",
      message: "List out your table of contents"
    },
    {
      type: "input",
      name: "install",
      message: "What is the installation instructions?"
    },
    {
      type: "input",
      name: "use",
      message: "How is this project used?"
    },
    {
      type: "input",
      name: "license",
      message: "Which type of license would you like to use?"
    },
    {
      type: "input",
      name: "contributions",
      message: "Please list any contributions made to the project."
    },
    {
      type: "input",
      name: "tests",
      message: "What is the test instructions for the project?"
    },
    {
      type: "input",
      name: "questions",
      message: "Please enter your GitHub username."
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your contact Email?"
    },
  ]);
}

function generateREAD(answers) {
  return `
  ## ${answers.title}

  ## Description 

  ${answers.description}
  
  ## Table of Contents 
  
  ${answers.contents}.
  
  ## Installation 
  
  ${answers.install}

  ## Usage 
  
  ${answers.use}

  ## License 
  
  ${answers.license}

  ## Contributing 
  
  ${answers.contributions}
  
  ## Tests 
  
  ${answers.test}

  ## Questions 
  
  ${answers.questions}
  
  Please Contact me at ${answers.email}
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
