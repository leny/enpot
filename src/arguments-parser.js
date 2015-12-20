/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/arguments-parser.js - parse given arguments
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

import path from "path";

let rOptionPattern = /^--?\w+/i;

export default function( aArgs ) {
    let iCurrentIndex = 0,
        bForceMode = false,
        bShowMode = false,
        sUser,
        sGistID,
        sDestinationPath;

    for( let sArg of aArgs ) {
        if( rOptionPattern.test( sArg ) ) {
            switch( sArg ) {
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
            }
        } else {
            switch( iCurrentIndex ) {
                case 0:
                    sUser = sArg;
                    break;
                case 1:
                    sGistID = sArg;
                    break;
                case 2:
                    sDestinationPath = sArg;
                    break;
            }
            iCurrentIndex++;
        }
    }

    return {
        user: sUser,
        gist: sGistID,
        destination: path.resolve( process.cwd(), sDestinationPath || process.cwd() ),
        force: bForceMode,
        show: bShowMode
    };
};
