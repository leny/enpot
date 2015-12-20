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
    Spinner = require( "cli-spinner" ).Spinner,
    getAllGistsFromUser = require( "./gist-list" ),
    downloadGistFiles = require( "./gist-download" );

var sCommand = process.argv[ 2 ] || "",
    aCommandParts = sCommand.split( "/" ),
    sUser = aCommandParts[ 0 ],
    sGistName = aCommandParts[ 1 ],
    oSpinner = new Spinner( "" ),
    sGistFilesDestination = process.cwd(),
    fError, fShowGists;

oSpinner.setSpinnerString( 9 );

fError = function ( sErrorMessage ) {
    oSpinner.stop( true );
    console.log( chalk.red.bold( "✘ error:" ), sErrorMessage );
    process.exit( 1 );
};

fShowGists = function( oGists ) {
    console.log();
    console.log( chalk.underline( "Gists from " + chalk.cyan( sUser ) + ":" ) );
    console.log();
    Object.keys( oGists ).forEach( function( sGistID ) {
        var oGist = oGists[ sGistID ];
        console.log( "  ", chalk.grey( "•" ), chalk.yellow.bold( sGistID ), chalk.magenta( "(" + oGist.files.length + " file" + ( oGist.files.length > 1 ? "s" : "" ) + ")" ), oGist.description || chalk.gray( "No description provided." ) );
    } );
    process.exit( 0 );
};

if ( !sUser ) {
    fError( "please provide a GitHub username to list the Gists." );
}

oSpinner.start();

getAllGistsFromUser( sUser )
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
        console.log( chalk.green.bold( "✔ success:" ), "" + aSavedFiles.length + " file" + ( aSavedFiles.length > 1 ? "s" : "" ) + " saved from " + chalk.cyan( sUser ) + "/" + chalk.yellow( sGistName ) + ":" );
        aSavedFiles.forEach( function( oSavedFile ) {
            console.log( "  ", chalk.grey( "•" ), chalk.magenta( oSavedFile ) );
        } );
        process.exit( 0 );
    } )
    .catch( function( oError ) {
        fError( oError );
    } );
