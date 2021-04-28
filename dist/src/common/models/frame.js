"use strict";
module.exports = function (frame) {
    frame.refreshReport = function (cb) {
        //    crawlComments(null, query, maxComments);
        cb(null, null);
    };
    frame.remoteMethod("refreshReport", {
        http: { verb: "post" },
        description: "refresh the report, and save within the DB",
        accepts: [],
        returns: { arg: "data", type: ["frame"], root: true },
    });
};
//# sourceMappingURL=frame.js.map