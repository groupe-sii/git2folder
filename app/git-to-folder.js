const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');


class GitToFolder{

    constructor(options){
        if(!options.gitFolder || !options.extractFolder){
            throw new Error('git repository and extract folder is needed');
        }
        
        options.gitFolder = this.cleanSlash(options.gitFolder);
        options.extractFolder = this.cleanSlash(options.extractFolder);
        
        this.gitFolder =  process.cwd() + '/'+options.gitFolder;
        this.extractFolder =  process.cwd() + '/'+options.extractFolder;
        this.gitExecOptions = {
            cwd:this.gitFolder,
            encoding:'utf8'
        }

        this.excludedBranches = [
            'develop',
            'master'
        ]
    }

    cleanSlash(directory){
        if(directory.endsWith('/')){
            directory = directory.substring(0,directory.length-1)
        }
        return directory;
    }

    getDirectories(){
        return fs.readdirSync(this.extractFolder).filter(file => fs.statSync(path.join(this.extractFolder)).isDirectory());
    }

    getBranches(){
        let str_branches = execSync('git branch',this.gitExecOptions);
        // remove referecne of current branch
        str_branches = str_branches.replace('*','');
        str_branches = str_branches.replace('  ','');
        // clean space with trim  
        str_branches = str_branches.trim();
        // store in array the list
        let branches = str_branches.split('\n');
        // clean spaces on each elements
        branches = branches.map(element => element.trim());
        // eclude non tp branches
        branches = branches.filter(element =>{
            element = element.trim();
            return this.excludedBranches.indexOf(element) !== -1 ? false : true;
        });
        console.log(branches);
        
        return branches;
    }


    branchToFolder(){
        console.log('repositionning on master branch');
        execSync(`git checkout master`,this.gitExecOptions);

        let branches = this.getBranches();

        
        for(let branch of branches){
            const destFolder = this.extractFolder+'/'+branch+'/'; 
            
            // clean extractFolder
            if(fs.existsSync(destFolder)){
                rimraf.sync(destFolder);    
            }
            fs.mkdirSync(destFolder);
            
            console.log(`checking out ${branch}`);
            execSync(`git checkout ${branch}`, this.gitExecOptions);

            console.log(`coping file to ${destFolder}`);
            execSync(`cp -r * ${destFolder}`, this.gitExecOptions);

        }

        process.exit(0);
    }



    folderToBranch(){
        
        console.log('repositionning on master branch');
        execSync(`git checkout master`,this.gitExecOptions);
        console.log('end repositionning master branch');
        // 1 - retrieve brnanches name
        let branches = this.getDirectories();


        // 2 - destroy existing branches in git repository
        for(let branch of branches){
            try{
                let branchName = execSync(`git branch | grep -w ${branch}`, this.gitExecOptions);
                if(branchName.trim() === branch){
                    console.log(`suppression de la branche  ${branch} `)
                    execSync(`git branch -D ${branch}`, this.gitExecOptions);
                }
            }catch(e){
                // ugly catch to prevent error when branch doesn't exist
            }
        }
        for(let branch of branches){   
            execSync(`git checkout -b ${branch}`,this.gitExecOptions);
            console.log(`copie des source de ${branch}`);
            execSync(`cp -r ${this.extractFolder}/${branch}/. ${this.gitFolder}`);
            console.log(`commit de ${branch}`);
            execSync(`git add --all && git commit -m 'update ${branch}'`, this.gitExecOptions);
        }

        process.exit(0);
    }

}

module.exports = GitToFolder;