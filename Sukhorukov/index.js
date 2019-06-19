const ansi = require('ansi');

const beeper = require('beeper');
const term = require( 'terminal-kit' ).terminal;

// beeper('**_**__**__***');



function question() {
    term( 'Do you like node_js? [Y|n]\n' );

    // Exit on y and ENTER key
    // Ask again on n
    term.yesOrNo( { yes: [ 'y' , 'yes', 'ENTER' ] , no: [ 'n', 'no' ] } , function( error , result ) {

        if ( result ) {
            term.green( "Yes! Good bye!\n" ) ;
            process.exit() ;
        }
        else {
            term.red( "No, are you sure?\n" ) ;
            question() ;
        }
    });
}

term.slowTyping(
    'What a wonderful world!\n' ,
    { flashStyle: term.brightWhite }
);

question();

