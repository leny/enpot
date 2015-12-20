/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/gist/download.js - download files from a given gist
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

import Promise from "bluebird";
import request from "request";
import fs from "fs";

let fDownload = function( aGistFiles, sDestinationPath ) {
    return Promise.all( aGistFiles.map( ( oGistFile ) => {
        let sFileDestinationPath = `${ sDestinationPath }/${ oGistFile.name }`;

        return new Promise( ( fResolve, fReject ) => {
            request
                .get( oGistFile.url )
                .on( "error", fReject )
                .pipe( fs.createWriteStream( sFileDestinationPath ) )
                .on( "finish", () => {
                    fResolve( oGistFile.name );
                } );
        } );
    } ) );
};

export default fDownload;
