/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/arguments-parser.js - parse given arguments
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

import path from "path";

const OPTION_PATTERN = /^--?\w+/i;

let fArgumentParser = function( aArgs ) {
    let iCurrentIndex = 0,
        bForceMode = false,
        bShowMode = false,
        sUser,
        sGistID,
        sDestinationPath;

    for ( let sArg of aArgs ) {
        if ( OPTION_PATTERN.test( sArg ) ) {
            switch ( sArg ) {
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
            switch ( iCurrentIndex ) {
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

    return {
        "user": sUser,
        "gist": sGistID,
        "destination": path.resolve( process.cwd(), sDestinationPath || process.cwd() ),
        "force": bForceMode,
        "show": bShowMode
    };
};

export default fArgumentParser;
