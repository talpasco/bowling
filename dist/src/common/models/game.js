"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoopBackContext = require("loopback-context");
const async = require("async");
const shortid_1 = __importDefault(require("shortid"));
module.exports = function (game) {
    game.observe("before save", (ctx, next) => {
        if (!ctx.instance) {
            // create operation
            next();
        }
        else {
            //const userId = ctx.instance.userID;
            ctx.instance.id = shortid_1.default.generate();
        }
    });
    game.refreshReport = function (cb) {
        cb(null, null);
    };
    game.remoteMethod("refreshReport", {
        http: { verb: "post" },
        description: "refresh the report, and save within the DB",
        accepts: [],
        returns: { arg: "data", type: ["game"], root: true },
    });
};
//# sourceMappingURL=game.js.map