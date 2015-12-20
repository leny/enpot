# enpòt'

[![NPM version](http://img.shields.io/npm/v/enpot.svg)](https://www.npmjs.org/package/enpot) ![Dependency Status](https://david-dm.org/leny/enpot.svg) ![Downloads counter](http://img.shields.io/npm/dm/enpot.svg)

> List gists from users & download them to current folder.

* * *

## How it works?

By running `$ enpot [user]`, you get all the public gists from the given user, then you can use `$ enpot [user] [id]` to download the files of the selected gist to the current folder. Simple as that. Useful for configuration files, license stuffs, every file you copy/paste from projects to projects.

## Usage

### Installation

**enpòt'** is a command-line tool, it is preferable to instal it globally.

    (sudo) npm install -g enpot

### Documentation

Using **enpòt'** is simple :

    enpot [options] <user> - List Gists from given user, stores in cache.

        Options:
            -f, --force Clean the cache and download the list from the server.

    enpot [options] <user> <gist-id> [destination-path] - Download file(s) from the Gist to the given path.

        Options:
            -s, --show Show infos about the files of the gist. Doesn't download them.

        Note: If no path is given, enpot use the current path. Give path must be a directory.

    Completion: enable completion by adding ". <(enpot completion)" to your ~/.bashrc or ~/.zshrc file.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style, enforced by [eslint](http://eslint.org/) configuration. **enpòt'** is develloped with ES2015. Lint & compile your code with [Grunt](http://gruntjs.com/).

## Release History

* **0.1.0**: Initial release _(20/12/2015)_

## License

Copyright (c) 2015 Leny  
Licensed under the MIT license.
