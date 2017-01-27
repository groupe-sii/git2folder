const fs = require('fs');
const inquirer = require('inquirer');
const program = require('commander');
const pkg = require('../package.json');


class Prompt{

    constructor(){
        this.questions = [
            {
                name:'gitFolder',
                type:'input',
                message:'git repository folder (relative to current dir): ',
                validate:this.checkDir.bind(this)
            },
            {
                name:'extractFolder',
                type:'input',
                message:'extract folder (relative to current dir): ',
                validate:this.checkDir.bind(this)
            }
            // ,
            // {
            //     name:'deleteBanch',
            //     type:'confirm',
            //     default:true,
            //     message: 'delete branch on update: '
            // },
            // {
            //     name:'deleteFolder',
            //     type:'confirm',
            //     defualt:true,
            //     message: 'delete folders on extract: '
            // }
        ]

        
    }

    checkDir(value){
        let dir = process.cwd()+'/'+value;
        let result= fs.statSync(dir).isDirectory();
        return result ? result : `wrong path for ${dir}`;
    }

    exec(){
        return inquirer.prompt(this.questions); 
    }

}

module.exports = Prompt;