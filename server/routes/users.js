'use strict';

const express = require( 'express' );
const router = express.Router();

/* GET users listing. */
router.get('/', ( req, res ) => {
  res.send( 'Respond with a resource' );
});

module.exports = router;
