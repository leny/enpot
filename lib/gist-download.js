/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /lib/gist-download.js - download gist files and stores at given path
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

var Promise = require( "bluebird" ),
    request = require( "request" ),
    fs = require( "fs" ),
    Spinner = require( "its-thinking" );

var oSpinner = new Spinner( 1 );

module.exports = function ( aGistFiles, sDestinationPath ) {
    return Promise.all( aGistFiles.map( function( oGistFile ) {
        var sFileDestinationPath = sDestinationPath + "/" + oGistFile.name;

        return new Promise( function( fResolve, fReject ) {
            request
                .get( oGistFile.url )
                .on( "error", fReject )
                .pipe( fs.createWriteStream( sFileDestinationPath ) )
                .on( "finish", function() {
                    fResolve( oGistFile.name );
                } );
        } );
    } ) );
};
