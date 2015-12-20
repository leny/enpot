#!/usr/bin/env node

/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/enpot.js - cli entry point, setup and runner
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _argumentsParser = require("./arguments-parser");

var _argumentsParser2 = _interopRequireDefault(_argumentsParser);

var _output = require("./output");

var _list = require("./gist/list");

var _list2 = _interopRequireDefault(_list);

var _download = require("./gist/download");

var _download2 = _interopRequireDefault(_download);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aArgv = process.argv.slice(2);

if (!aArgv[0] || ["-h", "--help"].indexOf(aArgv[0]) > -1) {
    (0, _output.help)();
}

if (["-v", "--version"].indexOf(aArgv[0]) > -1) {
    (0, _output.version)();
}

if (aArgv[0] === "completion") {
    (0, _output.completion)();
} else {
    (function () {
        var _argsParser = (0, _argumentsParser2.default)(aArgv);

        var sGistUser = _argsParser.user;
        var sGistID = _argsParser.gist;
        var sDestinationPath = _argsParser.destination;
        var bForceReload = _argsParser.force;
        var bShowFiles = _argsParser.show;

        if (_fs2.default.statSync(sDestinationPath).isDirectory() === false) {
            (0, _output.error)("Destination path isn't a directory.");
        }

        _output.spinner.start();

        (0, _list2.default)(sGistUser, bForceReload && !sGistID).then(function (oGists) {
            if (sGistID) {
                var oGist = undefined;
                if (!(oGist = oGists[sGistID])) {
                    (0, _output.error)("Unknown gist " + chalk.yellow(sGistID) + " from user " + chalk.cyan(sGistUser) + ".");
                }
                if (!oGist.files.length) {
                    (0, _output.error)("No downloadable files in " + chalk.yellow(sGistID) + " from user " + chalk.cyan(sGistUser) + ".");
                }
                if (bShowFiles) {
                    (0, _output.details)(oGist);
                }
                return (0, _download2.default)(oGist.files, sDestinationPath);
            }
            _output.spinner.stop(true);
            (0, _output.list)(sGistUser, oGists);
        }).then(function (aSavedFiles) {
            _output.spinner.stop(true);
            (0, _output.success)(sGistUser, sGistID, aSavedFiles);
        }).catch(_output.error);
    })();
}
