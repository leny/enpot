/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/output.js - output things to console
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

import { Spinner } from "cli-spinner"
import chalk from "chalk"
import Pandri from "pandri"
import tabtab from "tabtab"
import humanSize from "human-size";
import pkg from "../package.json";

let oSpinner,
    fError, fShowGists, fShowGistDetails, fShowHelp, fShowVersion, fCompletion, fSuccess;

// Spinner
oSpinner = new Spinner();
oSpinner.setSpinnerString( 9 );

// Error
fError = function( sErrorMessage ) {
    oSpinner.stop( true );
    console.log( "\n", chalk.red.bold( "✘ error:" ), sErrorMessage );
    process.exit( 1 );
};

// help
fShowHelp = function() {
    console.log( "\n", chalk.bold( "enpòt'" ), "v" + pkg.version );
    console.log( "\n  ", chalk.bold.yellow( "Usage:" ), "enpot", chalk.green( "[options]" ), chalk.cyan( "<user>" ) );
    console.log( "         ", chalk.gray( "List Gists from given user, stores in cache." ) );
    console.log( "         ", chalk.green.bold( "Options:" ), "-f, --force", chalk.gray( "Clean the cache and download the list from the server." ) );
    console.log( "\n         ", "enpot", chalk.green( "[options]" ), chalk.cyan( "<user>" ), chalk.cyan( "<gist-id>" ), chalk.green( "[destination-path]" ) );
    console.log( "         ", chalk.gray( "Download file(s) from the Gist to the given path." ) );
    console.log( "         ", chalk.green.bold( "Options:" ), "-s, --show", chalk.gray( "Show infos about the files of the gist. Doesn't download them." ) );
    console.log( "         ", chalk.bold( "Note:" ), chalk.gray( "If no path is given, enpot use the current path. Give path must be a directory." ) );
    console.log( "\n  ", chalk.bold.yellow( "Completion:" ), chalk.gray( "enable completion by adding" ), '"' + chalk.magenta( ". <(enpot completion)" ) + '"', chalk.gray( "to your" ), chalk.cyan( "~/.bashrc" ), chalk.gray( "or" ), chalk.cyan( "~/.zshrc" ), chalk.gray( "file." ) );
    console.log( "" );
    process.exit( 0 );
};

// version
fShowVersion = function() {
    console.log( chalk.yellow( "enpòt'" ), "v" + pkg.version );
    process.exit( 0 );
};

// completion
fCompletion = function() {
    new Pandri( "enpot", `${ __dirname }/enpot.cache.json`, ( oErr, oStore ) => {
        tabtab.complete( "enpot", ( oError, oData ) => {
            if ( oError || !oData ) {
                return;
            }

            if ( oData.words === 1 ) {
                return tabtab.log( Object.keys( oStore._content ), oData );
            }

            return tabtab.log( Object.keys( oStore.get( oData.prev ) ), oData );
        } );
    } );
};

// list
fShowGists = function( sUser, oGists ) {
    console.log( "\n", chalk.underline( `Gists from ${ chalk.cyan( sUser ) }:` ), "\n" );
    Object.keys( oGists ).forEach( function( sGistID ) {
        let oGist = oGists[ sGistID ];

        console.log( "  ", chalk.grey( "•" ), chalk.yellow.bold( sGistID ), chalk.magenta( `(${ oGist.files.length } file${ ( oGist.files.length > 1 ? "s" : "" ) })` ), oGist.description || chalk.gray( "No description provided." ) );
    } );
    process.exit( 0 );
};

// details
fShowGistDetails = function( oGist ) {
    console.log( "\n", chalk.underline( chalk.magenta( `(${ oGist.files.length } file${ ( oGist.files.length > 1 ? "s" : "" ) })` ) + " in " + chalk.yellow.bold( oGist.id ) + ":" ) );
    console.log( "  ", oGist.description || chalk.gray( "No description provided." ) );
    for( let oFile of oGist.files ) {
        console.log( "    ", chalk.grey( "•" ), chalk.cyan( oFile.name ), "-", chalk.magenta( humanSize( oFile.size ) ), "-", chalk.gray( oFile.type ) );
    }
    process.exit( 0 );
};

// success
fSuccess = function( sUser, sGistName, aDownloadedFiles ) {
    console.log( "\n", chalk.green.bold( "✔ success:" ), "" + aDownloadedFiles.length + " file" + ( aDownloadedFiles.length > 1 ? "s" : "" ) + " saved from " + chalk.cyan( sUser ) + "/" + chalk.yellow( sGistName ) + ":" );
    for( let oFile of aDownloadedFiles ) {
        console.log( "  ", chalk.grey( "•" ), chalk.magenta( oFile ) );
    }
    process.exit( 0 );
};

// exports
export {
    oSpinner as spinner,
    fError as error,
    fShowGists as list,
    fShowGistDetails as details,
    fShowHelp as help,
    fShowVersion as version,
    fCompletion as completion,
    fSuccess as success
};
