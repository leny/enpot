"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.success = exports.completion = exports.version = exports.help = exports.details = exports.list = exports.error = exports.spinner = undefined;

var _cliSpinner = require("cli-spinner");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _pandri = require("pandri");

var _pandri2 = _interopRequireDefault(_pandri);

var _tabtab = require("tabtab");

var _tabtab2 = _interopRequireDefault(_tabtab);

var _humanSize = require("human-size");

var _humanSize2 = _interopRequireDefault(_humanSize);

var _package = require("../package.json");

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/output.js - output things to console
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

/* eslint-disable no-console */

var oSpinner = undefined,
    fError = undefined,
    fShowGists = undefined,
    fShowGistDetails = undefined,
    fShowHelp = undefined,
    fShowVersion = undefined,
    fCompletion = undefined,
    fSuccess = undefined;

// Spinner
exports.spinner = oSpinner = new _cliSpinner.Spinner();
oSpinner.setSpinnerString(9);

// Error
exports.error = fError = function (sErrorMessage) {
    oSpinner.stop(true);
    console.log("\n", _chalk2.default.red.bold("✘ error:"), sErrorMessage);
    process.exit(1);
};

// help
exports.help = fShowHelp = function () {
    console.log("\n", _chalk2.default.bold("enpòt'"), "v" + _package2.default.version);
    console.log("\n  ", _chalk2.default.bold.yellow("Usage:"), "enpot", _chalk2.default.green("[options]"), _chalk2.default.cyan("<user>"));
    console.log("         ", _chalk2.default.gray("List Gists from given user, stores in cache."));
    console.log("         ", _chalk2.default.green.bold("Options:"), "-f, --force", _chalk2.default.gray("Clean the cache and download the list from the server."));
    console.log("\n         ", "enpot", _chalk2.default.green("[options]"), _chalk2.default.cyan("<user>"), _chalk2.default.cyan("<gist-id>"), _chalk2.default.green("[destination-path]"));
    console.log("         ", _chalk2.default.gray("Download file(s) from the Gist to the given path."));
    console.log("         ", _chalk2.default.green.bold("Options:"), "-s, --show", _chalk2.default.gray("Show infos about the files of the gist. Doesn't download them."));
    console.log("         ", _chalk2.default.bold("Note:"), _chalk2.default.gray("If no path is given, enpot use the current path. Give path must be a directory."));
    console.log("\n  ", _chalk2.default.bold.yellow("Completion:"), _chalk2.default.gray("enable completion by adding"), "\"" + _chalk2.default.magenta(". <(enpot completion)") + "\"", _chalk2.default.gray("to your"), _chalk2.default.cyan("~/.bashrc"), _chalk2.default.gray("or"), _chalk2.default.cyan("~/.zshrc"), _chalk2.default.gray("file."));
    console.log("");
    process.exit(0);
};

// version
exports.version = fShowVersion = function () {
    console.log(_chalk2.default.yellow("enpòt'"), "v" + _package2.default.version);
    process.exit(0);
};

// completion
exports.completion = fCompletion = function () {
    return new _pandri2.default("enpot", __dirname + "/enpot.cache.json", function (oErr, oStore) {
        _tabtab2.default.complete("enpot", function (oError, oData) {
            if (oError || !oData) {
                return;
            }

            if (oData.words === 1) {
                return _tabtab2.default.log(Object.keys(oStore._content), oData);
            }

            return _tabtab2.default.log(Object.keys(oStore.get(oData.prev)), oData);
        });
    });
};

// list
exports.list = fShowGists = function (sUser, oGists) {
    console.log("\n", _chalk2.default.underline("Gists from " + _chalk2.default.cyan(sUser) + ":"), "\n");
    Object.keys(oGists).forEach(function (sGistID) {
        var oGist = oGists[sGistID];

        console.log("  ", _chalk2.default.grey("•"), _chalk2.default.yellow.bold(sGistID), _chalk2.default.magenta("(" + oGist.files.length + " file" + (oGist.files.length > 1 ? "s" : "") + ")"), oGist.description || _chalk2.default.gray("No description provided."));
    });
    process.exit(0);
};

// details
exports.details = fShowGistDetails = function (oGist) {
    console.log("\n", _chalk2.default.underline(_chalk2.default.magenta("(" + oGist.files.length + " file" + (oGist.files.length > 1 ? "s" : "") + ")"), " in ", _chalk2.default.yellow.bold(oGist.id), ":"));
    console.log("  ", oGist.description || _chalk2.default.gray("No description provided."));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = oGist.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var oFile = _step.value;

            console.log("    ", _chalk2.default.grey("•"), _chalk2.default.cyan(oFile.name), "-", _chalk2.default.magenta((0, _humanSize2.default)(oFile.size)), "-", _chalk2.default.gray(oFile.type));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    process.exit(0);
};

// success
exports.success = fSuccess = function (sUser, sGistName, aDownloadedFiles) {
    console.log("\n", _chalk2.default.green.bold("✔ success:"), aDownloadedFiles.length + " file" + (aDownloadedFiles.length > 1 ? "s" : "") + " saved from " + _chalk2.default.cyan(sUser) + "/" + _chalk2.default.yellow(sGistName) + ":");
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = aDownloadedFiles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var oFile = _step2.value;

            console.log("  ", _chalk2.default.grey("•"), _chalk2.default.magenta(oFile));
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    process.exit(0);
};

// exports
exports.spinner = oSpinner;
exports.error = fError;
exports.list = fShowGists;
exports.details = fShowGistDetails;
exports.help = fShowHelp;
exports.version = fShowVersion;
exports.completion = fCompletion;
exports.success = fSuccess;
