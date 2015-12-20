/* enpòt'
 * https://github.com/leny/enpot
 *
 * JS Document - /lib/gist-list.js - list gists from a given user, stores into cache
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

var Promise = require( "bluebird" ),
    request = require( "request" ),
    lodash = require( "lodash" ),
    Pandri = require( "pandri" );

var sGitHubAPIBaseURL = "https://api.github.com",
    oRequestDefaultOptions = {
        "headers": {
            "User-Agent": "com.github.leny.enpot"
        }
    };

module.exports = function( sUserName, bForce ) {
    var oRequestOptions = lodash.assign( {}, oRequestDefaultOptions, {
        "url": sGitHubAPIBaseURL + "/users/" + sUserName + "/gists"
    } );

    return new Promise( function( fResolve, fReject ) {
        var oCache;

        oCache = new Pandri( "enpot", __dirname + "/enpot.cache.json", function() {
            if ( !bForce && oCache.get( sUserName ) ) {
                return fResolve( oCache.get( sUserName ) );
            }
            request( oRequestOptions, function( oError, oResponse, sRawBody ) {
                var oParsedGists = {};

                if ( oError ) {
                    return fReject( oError );
                }
                JSON.parse( sRawBody ).forEach( function( oGistInfo ) {
                    oParsedGists[ oGistInfo.id ] = {
                        "description": oGistInfo.description,
                        "files": lodash.map( Object.keys( oGistInfo.files ), function( sFileName ) {
                            return {
                                "name": oGistInfo.files[ sFileName ].filename,
                                "url": oGistInfo.files[ sFileName ].raw_url
                            };
                        } )
                    };
                } );
                oCache.set( sUserName, oParsedGists );
                oCache.save( function() {
                    fResolve( oParsedGists );
                } );
            } );
        } );
    } );
};
