"use strict";
module.exports = function (roll) {
    roll.once("attached", function () {
        roll.deleteById = function (filter, auth, cb) {
            cb(null, "This is a overridden method");
        };
    });
    roll.refreshReport = function (cb) {
        //    crawlComments(null, query, maxComments);
        cb(null, null);
    };
    roll.remoteMethod("refreshReport", {
        http: { verb: "post" },
        description: "refresh the report, and save within the DB",
        accepts: [],
        returns: { arg: "data", type: ["roll"], root: true },
    });
};
//# sourceMappingURL=roll.js.map