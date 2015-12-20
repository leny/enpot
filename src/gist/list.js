/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /src/gist/list.js - gather gists from a user
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

import Promise from "bluebird";
import request from "request";
import Pandri from "pandri";

let sGitHubAPIBaseURL = "https://api.github.com",
    oRequestDefaultOptions = {
        "headers": {
            "User-Agent": "io.github.leny.enpot"
        }
    },
    fList;

fList = function( sUserName, bForce ) {

    let oRequestOptions = Object.assign( {}, oRequestDefaultOptions, {
        "url": `${ sGitHubAPIBaseURL }/users/${ sUserName }/gists`
    } );

    return new Promise( ( fResolve, fReject ) => {
        let oCache;

        oCache = new Pandri( "enpot", `${ __dirname }/../enpot.cache.json`, () => {
            if ( !bForce && oCache.get( sUserName ) ) {
                return fResolve( oCache.get( sUserName ) );
            }
            request( oRequestOptions, ( oError, oResponse, sRawBody ) => {
                let oParsedGists = {};

                if ( oError ) {
                    return fReject( oError );
                }

                for ( let oGistInfo of JSON.parse( sRawBody ) ) {
                    oParsedGists[ oGistInfo.id ] = {
                        "description": oGistInfo.description,
                        "files": Object.keys( oGistInfo.files ).map( ( sFileName ) => {
                            let oFile = oGistInfo.files[ sFileName ];

                            return {
                                "name": oFile.filename,
                                "size": oFile.size,
                                "type": ( oFile.language || oFile.type ).toLowerCase(),
                                "url": oFile.raw_url
                            };
                        } ),
                        "id": oGistInfo.id
                    };
                }

                oCache.set( sUserName, oParsedGists );
                oCache.save( () => fResolve( oParsedGists ) );
            } );
        } );
    } );
};

export default fList;
