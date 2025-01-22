import { error } from 'console';
import fs from 'fs';
import inquirer from 'inquirer'; 


  const promptUsers =[
    { type: 'input', name: 'title', message: 'What is the title of your project?' },    
    { type: 'input', name: 'description', message: 'Write a description of your project' },
    { type: 'input', name: 'installation', message: 'How should it be installed?' },
    { type: 'input', name: 'usage', message: 'What is the usage of your project?' },
    { type: 'input', name: 'contributing', message: 'What are the contribution guidelines?' },
    { type: 'input', name: 'tests', message: 'What are the test instructions?' },
    { type: 'list', name: 'license', message: 'Choose a license for your project:', choices: ['MIT', 'Apache-2.0', '0BSD', 'None'] },
    { type: 'input', name: 'github', message: 'Please enter your GitHub username:' },
    { type: 'input', name: 'email', message: 'Enter your email address:' },
];

  function renderLicenseBadges(badge) {
    if (badge === 'MIT') {
      return '![Badge: MIT](https://img.shields.io/badge/License-MIT-black)';
    } else if (badge === 'Apache-2.0') {
      return '![Badge](https://img.shields.io/badge/License-Apache_2.0-green)';
    } else if (badge === '0BSD') {
      return '![Badge](https://img.shields.io/badge/License-0BSD-red)';
    } else {
      return '';
    }
  }
  
// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    if (license === 'MIT') {
      return '[MIT](https://opensource.org/licenses/MIT)';
    } else if (license === 'Apache-2.0') {
      return '[Apache-2.0](https://opensource.org/licenses/Apache-2.0)';
    } else if (license === '0BSD') {
      return '[0BSD](https://opensource.org/licenses/0BSD)';
    } else {
      return '';
    }
}

// TODO: Create a function that returns the license section of README
function renderLicenseSection(license) {
if (license === 'MIT') {
    return '![license: MIT](https://opensource.org/licenses/MIT)';
} else if (license === 'Apache-2.0') {
    return '![license](https://opensource.org/licenses/Apache-2.0)';
} else if (license === '0BSD') {
    return '![license](https://opensource.org/licenses/0BSD)';
} else {
    return '';
}
}

function writeFile(README , data ) {
  fs.writeFile("README.md", data, (error) => {
    error ? console.error(error) : console.log('README.md generated successfully!');
  });
}

function generateMarkdown(data) {
  return `
# ${data.title}

${renderLicenseBadges(data.license)}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## Contributing
${data.contributing}

## Tests
${data.tests}

## Badges
${renderLicenseBadges(data.license)}

## License
${renderLicenseLink(data.license)}

## Questions
If you have any questions, please reach out:
- GitHub: https://github.com/${data.github}
- Email: [${data.email}](mailto:${data.email})
`;
}

function init() {
  inquirer.prompt(promptUsers).then((data) => {
    const readmeGenerator = generateMarkdown (data);
   writeFile("README.md", readmeGenerator);
  });
}

init();