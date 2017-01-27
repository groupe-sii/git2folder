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
- `update`: to create one branc per directory on a targeted git repository

Branches `develop` and `master` are ignored, the git repository must have at least a `master` branch

> WARNING : the `extractFolder`  is cleaned when `extract` is called and `branches` are destroyed on `update`.

each action prompts questions :
> `gitFolder` : to indicate git repository folder (relative to current dir)

> `extractFolder` : to indicate the directory where branches will be extracted or where it should take folder (depending of the action)


## License

ISC License

Copyright (c) 2017 Groupe SII