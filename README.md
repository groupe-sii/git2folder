# git2folder
> `git2folder` is a Command-Line Interface to extract branches of a git repository into folder and vice versa.

## Usage

`git2folder` is usable with the Command-Line Interface way

### Installation

```sh
$ npm install git2folder -g           // For CLI use
```

### Command-Line Interface

Launch the CLI by calling:

```sh
$ git2folder [options] <extract|update>
```

#### Options

The command line utility has 2 possibles arguments=. You can view help detailed by running `git2folder -h`.

```sh
Usage: git2folder [options]

Options:

  -h, --help           output usage information
  -V, --version        output the version number
```

### Actions

git2folder provides 2 actions :

- `extract` : to copy all branches of a repository on a targeted folder
- `update`: to create one branch per directory on a targeted git repository

Branches `develop` and `master` are ignored, the git repository must have at least a `master` branch

> WARNING : the `extractFolder`  is cleaned when `extract` is called and `branches` are destroyed on `update`.

each action prompts questions :
> `gitFolder` : to indicate git repository folder (relative to current dir)
> `extractFolder` : to indicate the directory where branches will be extracted or where it should take folder (depending of the action)

### Examples

Imagine you have a working directory `trainings` :

```sh
├── trainings
└── 
│   ├── angular-tps
│   └── typescript-tps
```

And you want to extract all the branches of `typescript-tps`, stay at the root of `trainings`, make a tmp directory, and launch git2folder:

```sh
mkdir typescript-tps-tmp
git2folder extract
> ./typescript-tps
> ./typescript-tps-tmp
```

Work on the updates you want, and after reload git2folder with `update` command

```sh
git2folder update
> ./typescript-tps
> ./typescript-tps-tmp
```

## License

ISC License

Copyright (c) 2017 Groupe SII
