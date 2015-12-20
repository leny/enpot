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

import fs from "fs";
import argsParser from "./arguments-parser";
import { spinner, error, list, details, help, version, completion, success } from "./output";
import getUserGists from "./gist/list";
import downloadGistFiles from "./gist/download";

let aArgv = process.argv.slice( 2 );

if( !aArgv[ 0 ] || [ "-h", "--help" ].indexOf( aArgv[ 0 ] ) > -1 ) {
    help();
}

if( [ "-v", "--version" ].indexOf( aArgv[ 0 ] ) > -1 ) {
    version();
}

if( aArgv[ 0 ] === "completion" ) {
    completion();
} else {
    let {
        user: sGistUser,
        gist: sGistID,
        destination: sDestinationPath,
        force: bForceReload,
        show: bShowFiles
    } = argsParser( aArgv );

    if ( fs.statSync( sDestinationPath ).isDirectory() === false ) {
        error( "Destination path isn't a directory." );
    }

    spinner.start();

    getUserGists( sGistUser, bForceReload && !sGistID )
        .then( ( oGists ) => {
            if( sGistID ) {
                let oGist;
                if( !( oGist = oGists[ sGistID ] ) ) {
                    error( `Unknown gist ${ chalk.yellow( sGistID ) } from user ${ chalk.cyan( sGistUser ) }.` );
                }
                if ( !oGist.files.length ) {
                    error( `No downloadable files in ${ chalk.yellow( sGistID ) } from user ${ chalk.cyan( sGistUser ) }.` );
                }
                if( bShowFiles ) {
                    details( oGist );
                }
                return downloadGistFiles( oGist.files, sDestinationPath );
            }
            spinner.stop( true );
            list( sGistUser, oGists );
        } )
        .then( ( aSavedFiles ) => {
            spinner.stop( true );
            success( sGistUser, sGistID, aSavedFiles );
        } )
        .catch( error );
}
