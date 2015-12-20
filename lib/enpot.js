#!/usr/bin/env node
/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /lib/enpot.js - cli entry point, commander setup and runner
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

var chalk = require( "chalk" ),
    path = require( "path" ),
    fs = require( "fs" ),
    Spinner = require( "cli-spinner" ).Spinner,
    getAllGistsFromUser = require( "./gist-list" ),
    downloadGistFiles = require( "./gist-download" ),
    pkg = require( "../package.json" );

var aArgv = process.argv.slice( 2 ),
    oSpinner = new Spinner( "" ),
    sGistFilesDestination = process.cwd(),
    sUser, sGistName, bForceReload,
    fError, fShowGists, fShowHelp;

oSpinner.setSpinnerString( 9 );

fError = function ( sErrorMessage ) {
    oSpinner.stop( true );
    console.log( "\n", chalk.red.bold( "✘ error:" ), sErrorMessage );
    process.exit( 1 );
};

fShowGists = function( oGists ) {
    console.log( "\n", chalk.underline( "Gists from " + chalk.cyan( sUser ) + ":" ), "\n" );
    Object.keys( oGists ).forEach( function( sGistID ) {
        var oGist = oGists[ sGistID ];
        console.log( "  ", chalk.grey( "•" ), chalk.yellow.bold( sGistID ), chalk.magenta( "(" + oGist.files.length + " file" + ( oGist.files.length > 1 ? "s" : "" ) + ")" ), oGist.description || chalk.gray( "No description provided." ) );
    } );
    process.exit( 0 );
};

fShowHelp = function() {
    console.log( "\n", chalk.bold( "enpòt'" ), "v" + pkg.version );
    console.log( "\n  ", chalk.bold.yellow( "Usage:" ), "enpot", chalk.green( "[options]" ), chalk.cyan( "<user>" ) );
    console.log( "         ", chalk.gray( "List Gists from given user, stores in cache." ) );
    console.log( "         ", chalk.green.bold( "Options:" ), "-f, --force", chalk.gray( "Clean the cache and download the list from the server." ) );
    console.log( "\n         ", "enpot", chalk.cyan( "<user>" ), chalk.cyan( "<gist-id>" ), chalk.green( "[destination-path]" ) );
    console.log( "         ", chalk.gray( "Download file(s) from the Gist to the given path." ) );
    console.log( "         ", chalk.bold( "Note:" ), chalk.gray( "If no path is given, enpot use the current path. Give path must be a directory." ) );
    process.exit( 0 );
}

// parse arguments
if ( !aArgv[ 0 ] || [ "-h", "--help" ].indexOf( aArgv[ 0 ] ) > -1 ) {
    fShowHelp();
}

if ( [ "-v", "--version" ].indexOf( aArgv[ 0 ] ) > -1 ) {
    console.log( chalk.yellow( "enpòt'" ), "v" + pkg.version );
    process.exit( 0 );
}

if ( [ "-f", "--force" ].indexOf( aArgv[ 0 ] ) > -1 ) {
    bForceReload = true;
    aArgv.shift();
}

if ( !( sUser = aArgv.shift() ) ) {
    fShowHelp();
}

sGistName = aArgv.shift();

if ( fs.statSync( sGistFilesDestination = path.resolve( process.cwd(), aArgv.shift() || process.cwd() ) ).isDirectory() === false ) {
    fError( "Destination path isn't a directory." );
}

oSpinner.start();

getAllGistsFromUser( sUser, bForceReload && !sGistName )
    .then( function( oGists ) {
        if ( sGistName ) {
            if( !oGists[ sGistName ] ) {
                fError( "Unknown gist " + chalk.yellow( sGistName ) + " from user " + chalk.cyan( sUser ) + "." );
            }
            if ( !oGists[ sGistName ].files.length ) {
                fError( "No downloadable files in " + chalk.yellow( sGistName ) + " from user " + chalk.cyan( sUser ) + "." );
            }
            return downloadGistFiles( oGists[ sGistName ].files, sGistFilesDestination );
        }
        oSpinner.stop( true );
        fShowGists( oGists );
    } )
    .then( function( aSavedFiles ) {
        oSpinner.stop( true );
        console.log( "\n", chalk.green.bold( "✔ success:" ), "" + aSavedFiles.length + " file" + ( aSavedFiles.length > 1 ? "s" : "" ) + " saved from " + chalk.cyan( sUser ) + "/" + chalk.yellow( sGistName ) + ":" );
        aSavedFiles.forEach( function( oSavedFile ) {
            console.log( "  ", chalk.grey( "•" ), chalk.magenta( oSavedFile ) );
        } );
        process.exit( 0 );
    } )
    .catch( function( oError ) {
        fError( oError );
    } );
