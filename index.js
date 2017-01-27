const program = require('commander');
const GitToFolder = require('./app/git-to-folder');
const Prompt = require('./app/prompt');
const pkg = require('./package.json');


class App{
    static main(args){
        let execAction;
        
        // commander config 
        program
        .version(pkg.version)
        .arguments('<extract|update>')
        .action((action)=>{

            execAction = action;
        })
        .parse(args);

        if(execAction ==='extract' || execAction =='update' ){
            let prompt = new Prompt();
            prompt.exec().then(options =>{
                let gtf = new GitToFolder(options);
                if(execAction === 'extract'){
                    gtf.branchToFolder()
                }else{
                    gtf.folderToBranch();
                }
                return Promise.resolve();
            })
            .catch(console.error);
        }else{
            console.log('usage : gtf <extract|update>');
        }
    }
}

App.main(process.argv);