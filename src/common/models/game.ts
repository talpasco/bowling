"use strict";
const LoopBackContext = require("loopback-context");
const async = require("async");
import shortid from "shortid";
module.exports = function (game) {
  game.observe("before save", (ctx, next) => {
    if (!ctx.instance) {
      // create operation
      next();
    } else {
      //const userId = ctx.instance.userID;
      ctx.instance.id = shortid.generate();
    }
  });
};
