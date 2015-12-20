"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTION_PATTERN = /^--?\w+/i; /* enpòt'
                                  * https://github.com/leny/enpot
                                  *
                                  * JS Document - /src/arguments-parser.js - parse given arguments
                                  *
                                  * Copyright (c) 2015 Leny
                                  * Licensed under the MIT license.
                                  */

var fArgumentParser = function fArgumentParser(aArgs) {
    var iCurrentIndex = 0,
        bForceMode = false,
        bShowMode = false,
        sUser = undefined,
        sGistID = undefined,
        sDestinationPath = undefined;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = aArgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var sArg = _step.value;

            if (OPTION_PATTERN.test(sArg)) {
                switch (sArg) {
                    case "-f":
                    case "--force":
                        bForceMode = true;
                        break;
                    case "-s":
                    case "--show":
                        bShowMode = true;
                        break;
                    case "-sf":
                    case "-fs":
                        bShowMode = true;
                        bForceMode = true;
                        break;

                    // no default
                }
            } else {
                    switch (iCurrentIndex) {
                        case 0:
                            sUser = sArg;
                            break;
                        case 1:
                            sGistID = sArg;
                            break;
                        case 2:
                            sDestinationPath = sArg;
                            break;

                        // no default
                    }
                    iCurrentIndex++;
                }
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

    return {
        "user": sUser,
        "gist": sGistID,
        "destination": _path2.default.resolve(process.cwd(), sDestinationPath || process.cwd()),
        "force": bForceMode,
        "show": bShowMode
    };
};

exports.default = fArgumentParser;
