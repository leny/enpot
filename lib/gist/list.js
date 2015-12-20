/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/gist/list.js - gather gists from a user
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sUserName, bForce) {

    var oRequestOptions = Object.assign({}, oRequestDefaultOptions, {
        "url": sGitHubAPIBaseURL + "/users/" + sUserName + "/gists"
    });

    return new _bluebird2.default(function (fResolve, fReject) {
        var oCache = undefined;

        oCache = new _pandri2.default("enpot", __dirname + "/../enpot.cache.json", function () {
            if (!bForce && oCache.get(sUserName)) {
                return fResolve(oCache.get(sUserName));
            }
            (0, _request2.default)(oRequestOptions, function (oError, oResponse, sRawBody) {
                var oParsedGists = {};

                if (oError) {
                    return fReject(oError);
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    var _loop = function _loop() {
                        var oGistInfo = _step.value;

                        oParsedGists[oGistInfo.id] = {
                            "description": oGistInfo.description,
                            "files": Object.keys(oGistInfo.files).map(function (sFileName) {
                                var oFile = oGistInfo.files[sFileName];
                                return {
                                    "name": oFile.filename,
                                    "size": oFile.size,
                                    "type": (oFile.language || oFile.type).toLowerCase(),
                                    "url": oFile.raw_url
                                };
                            }),
                            "id": oGistInfo.id
                        };
                    };

                    for (var _iterator = JSON.parse(sRawBody)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _loop();
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

                oCache.set(sUserName, oParsedGists);
                oCache.save(function () {
                    return fResolve(oParsedGists);
                });
            });
        });
    });
};

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _pandri = require("pandri");

var _pandri2 = _interopRequireDefault(_pandri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sGitHubAPIBaseURL = "https://api.github.com",
    oRequestDefaultOptions = {
    "headers": {
        "User-Agent": "io.github.leny.enpot"
    }
};

;
