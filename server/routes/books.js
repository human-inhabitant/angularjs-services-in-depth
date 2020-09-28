'use strict';

const express = require( 'express' );
const fs = require( 'fs' );
const datafile = 'server/data/books.json';
const router = express.Router();

/* GET all books and POST new books */
router
  .route( '/' )
  .get( ( req, res ) => {
    const data = getBookData();
    res.send( data );
  })
  .post( ( req, res ) => {
    const data = getBookData();
    const nextID = getNextAvailableID( data );
    const newBook = {
      book_id: nextID,
      title: req.body.title,
      author: req.body.author,
      year_published: req.body.year_published
    };
    data.push( newBook );
    saveBookData( data );
    // res.set( 'Content-Type', 'application/json' );
    res.status( 201 ).send( newBook );
  })
;


/* GET, PUT and DELETE individual books */
router
  .route( '/:id' )
  .get( ( req, res ) => {
    // console.info( 'Retrieving book id: %d', req.params.id );
    const data = getBookData();
    const matchingBooks = data.filter( item => {
      return item.book_id === req.params.id;
    });
    if ( matchingBooks.length === 0 ) {
      res.sendStatus( 404 );
    } else {
      res.send( matchingBooks[0] );
    }
  })
  .delete( ( req, res ) => {
    const data = getBookData();
    const pos = data
      .map( e => {
        return e.book_id;
      })
      .indexOf( parseInt( req.params.id, 10 ) )
    ;
    if ( pos > -1 ) {
      data.splice( pos, 1 );
    } else {
      res.sendStatus( 404 );
    }
    saveBookData( data );
    res.sendStatus( 204 );
  })
  .put( ( req, res ) => {
    const data = getBookData();
    const matchingBooks = data.filter( item => item.book_id === req.params.id );

    if ( matchingBooks.length === 0 ) {
      res.sendStatus( 404 );
    } else {
      const bookToUpdate = matchingBooks[0];
      bookToUpdate.title = req.body.title;
      bookToUpdate.author = req.body.author;
      bookToUpdate.year_published = req.body.year_published;
      saveBookData( data );
      res.sendStatus( 204 );
    }
  })
;

function getNextAvailableID( allBooks ) {
  let maxID = 0;
  allBooks.forEach( ( element, index, array ) => {
    if ( element.book_id > maxID ) {
      maxID = element.book_id;
    }
  });
  return ++maxID;
}
function getBookData() {
  const data = fs.readFileSync( datafile, 'utf8' );
  return JSON.parse( data );
}
function saveBookData( data ) {
  fs.writeFile( datafile, JSON.stringify( data, null, 4 ), err => {
    if ( err ) {
      console.error( err );
    }
  });
}

module.exports = router;
