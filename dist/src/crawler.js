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
const crawler = (function () {
    const { URL } = require("url");
    const app = require("./server.js");
    class CreateLink {
        constructor(linkURL, title, depth, parent, toCrawl) {
            this.url = linkURL.replace(/\/+$/g, "");
            this.title = title;
            this.depth = depth;
            this.parent = parent;
            this.children = [];
            this.toCrawl = toCrawl;
        }
    }
    function crawlComments(socket, startURL, maxComments = 50) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = {
                rootNode: {},
                currentNode: {},
                printQueue: [],
                maxCrawledComments: 15,
                mainDomain: null,
                mainParsedUrl: null,
                browser: null,
                ws: socket,
            };
            try {
                session.mainParsedUrl = new URL(startURL);
            }
            catch (e) {
                console.log("URL is not valid", e);
                return;
            }
            session.maxCrawledComments = maxComments;
            let startLinkObj = new CreateLink(startURL, startURL, 0, null, true);
            session.rootNode = session.currentNode = startLinkObj;
            let comments = yield findComments(session, session.currentNode);
            propegateMsg(comments, startURL, session.ws);
            closeSession(session);
        });
    }
    function loadContent(url, session) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    //Get the HTML raw text and fetch the links and titles.
    function findComments(session, linkObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    function closeSession(session) {
        let crawlRes = JSON.stringify({
            crawl_res: true,
        });
        session.ws.send(crawlRes);
        session.browser.close();
        session.browser = null;
    }
    function propegateMsg(resObj, mainDomain, ws) {
        app.models.game.set(mainDomain, resObj);
        ws.send(resObj);
    }
    return {
        crawlComments: crawlComments,
    };
})();
module.exports = crawler;
//# sourceMappingURL=crawler.js.map