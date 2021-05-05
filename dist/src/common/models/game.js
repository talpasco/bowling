"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const LoopBackContext = require("loopback-context");
const async = require("async");
module.exports = function (game) {
    game.observe("before save", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let instance = ctx.instance || ctx.data;
        if (ctx.isNewInstance) {
            // create operation
            let curPlayer = instance.players.length > 0 ? instance.players[0] : null;
            if (!curPlayer)
                return next(new Error("Atleast 1 player is needed"));
            instance.currentFrame = 1;
            instance.currentPlayer = instance.currentPlayer || curPlayer;
            instance.startingPlayer = instance.startingPlayer || curPlayer;
        }
        else {
            let initialPlayers = yield ctx.Model.find(ctx.where).players;
            let allPlayers = [...new Set([...initialPlayers, ...instance.players])];
            instance.players = allPlayers; // union all players of the game
        }
        next();
    }));
};
//# sourceMappingURL=game.js.map