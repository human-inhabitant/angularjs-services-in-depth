'use strict';

const express = require( 'express' );
const path = require( 'path' );
const favicon = require( 'serve-favicon' );
const logger = require( 'morgan' );
const cookieParser = require( 'cookie-parser' );
const bodyParser = require( 'body-parser' );

const routes = require( './server/routes/index' );
const users = require( './server/routes/users' );
const books = require( './server/routes/books' );

const app = express();

app.set( 'views', path.join( __dirname, '/server/views' ) );
app.set( 'view engine', 'jade' );

app.use( favicon( path.join( __dirname, 'public/favicon.ico' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', routes );
app.use( '/api/users', users );
app.use( '/api/books', books );
app.use( '/lib', express.static( path.join( __dirname, 'node_modules' ) ) );

app.use( ( req, res, next ) => {
  const err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
});

if ( app.get( 'env' ) === 'development' ) {
  app.use( ( err, req, res, next ) => {
    res.status( err.status || 500 );
    res.render( 'error', {
      message: err.message,
      error: err
    });
  });
}
app.use( ( err, req, res, next ) => {
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    error: {}
  });
});

const debug = require( 'debug' )( 'server' );

app.set( 'port', process.env.PORT || 3e3 );
app.listen( app.get( 'port' ), () => {
  console.info( 'Start: %s', new Date() );
  console.info( 'Listening on port: %d', app.get( 'port' ) );
});

module.exports = app;
