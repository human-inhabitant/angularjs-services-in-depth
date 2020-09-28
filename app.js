'use strict';

const express = require( 'express' );
const app = express();

app.set( 'port', 3e3 );
app.use( express.static( `${__dirname}/` ) );
app.listen( app.get( 'port' ), () => {
  console.info( 'Start: %s', new Date() );
  console.info( 'Listening on port: %d', app.get( 'port' ) );
});
