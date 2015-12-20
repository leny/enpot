/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/gist/download.js - download files from a given gist
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (aGistFiles, sDestinationPath) {
    return _bluebird2.default.all(aGistFiles.map(function (oGistFile) {
        var sFileDestinationPath = sDestinationPath + "/" + oGistFile.name;

        return new _bluebird2.default(function (fResolve, fReject) {
            _request2.default.get(oGistFile.url).on("error", fReject).pipe(_fs2.default.createWriteStream(sFileDestinationPath)).on("finish", function () {
                fResolve(oGistFile.name);
            });
        });
    }));
};

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
