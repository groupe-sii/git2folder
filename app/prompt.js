const fs = require('fs');
const inquirer = require('inquirer');

class Prompt {
    constructor() {
        this.questions = [
            {
                name: 'gitFolder',
                type: 'input',
                message: 'git repository folder (relative to current dir): ',
                validate: this.checkDir.bind(this)
            },
            {
                name: 'extractFolder',
                type: 'input',
                message: 'extract folder (relative to current dir): ',
                validate: this.checkDir.bind(this)
            }
        ];
    }

    checkDir(value) {
        let dir = process.cwd() + '/' + value;
        let result = fs.statSync(dir).isDirectory();
        return result ? result : `wrong path for ${dir}`;
    }

    exec() {
        return inquirer.prompt(this.questions);
    }
}

module.exports = Prompt;
