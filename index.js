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
      type: "checkbox",
      message: "Check which sections are needed for your table of contents",
      name: "contents",
      choices: [
        "Title",
        "Description",
        "Installation",
        "Use",
        "License",
        "Contributions",
        "Tests",
        "Questions",
      ]
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
      type: "list",
      message: "Which type of license would you like to use?",
      name: "license",
      choices: [
        "Apache License 2.0", 
        "MIT License", 
        "Boost Software License 1.0", 
        "Eclipse Public License 2.0"
      ]
    },
    {
      type: "input",
      name: "name",
      message: "What is your first and last name for copyright license?"
    },
    {
      type: "input",
      name: "contributions",
      message: "Please list any contributions made to the project."
    },
    {
      type: "input",
      name: "test",
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
  # ${answers.title}

  ## Description 

  ${answers.description}
  
  ## Table of Contents 
  
  ${answers.contents}
  
  ## Installation 
  
  ${answers.install}

  ## Usage 
  
  ${answers.use}

  ## License 
  
  ${answers.license}

  Copyright (c) 2021 ${answers.name} 

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  ## Contributing 
  
  ${answers.contributions}
  
  ## Tests 
  
  ${answers.test}

  ## Questions 
  
  If you have any questions or need any further assistance please see contact information below.

  My GitHub Username: https://github.com/${answers.questions}
  
  My Contact Email: ${answers.email}
`;
}

async function init() {
  try {
    const answers = await promptUser();

    const read = generateREAD(answers);

    await writeFileAsync("output/README.md", read);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();
