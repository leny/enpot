"use strict";

module.exports = ( grunt ) => {

    require( "load-grunt-tasks" )( grunt );

    grunt.initConfig( {
        "eslint": {
            "src": [ "src/**/*.js" ]
        },
        "babel": {
            "options": {
                "presets": [ "es2015" ]
            },
            "src": {
                "files": [ {
                    "expand": true,
                    "cwd": "src/",
                    "src": [ "**/*.js" ],
                    "dest": "lib/"
                } ]
            }
        },
        "watch": {
            "src": {
                "files": "src/**/¨.js",
                "tasks": [ "default" ]
            }
        }
    } );

    grunt.registerTask( "default", [
        "eslint",
        "babel"
    ] );

    grunt.registerTask( "work", [
        "default",
        "watch"
    ] );

};
