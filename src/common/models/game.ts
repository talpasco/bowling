"use strict";
const LoopBackContext = require("loopback-context");
const async = require("async");
module.exports = function (game) {
  game.observe("before save", async (ctx, next) => {
    let instance = ctx.instance || ctx.data;
    if (ctx.isNewInstance) {
      // create operation
      let curPlayer = instance.players.length > 0 ? instance.players[0] : null;
      if (!curPlayer) return next(new Error("Atleast 1 player is needed"));
      instance.currentFrame = 1;
      instance.currentPlayer = instance.currentPlayer || curPlayer;
      instance.startingPlayer = instance.startingPlayer || curPlayer;
    } else {
      let initialPlayers = await ctx.Model.find(ctx.where).players;
      let allPlayers = [...new Set([...initialPlayers, ...instance.players])];
      instance.players = allPlayers; // union all players of the game
    }
    next();
  });
};
