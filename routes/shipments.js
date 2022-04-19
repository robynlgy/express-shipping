"use strict";

const express = require("express");
const router = new express.Router();

const { shipProduct } = require("../shipItApi");
const jsonschema = require("jsonschema");
const shippingSchema = require("../schemas/shippingSchema.json");
const { BadRequestError } = require("../expressError");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const result = jsonschema.validate(req.body, shippingSchema);
  if (!result.valid) {
    let errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });

});


module.exports = router;