# bowling

* Server
    * WS JS
    * Express JS
    * LoopBack JS
    * Redis - PubSub + cacheDB
    * MongoDB
* Client
    * Vue

## Requirements

* [Node.js](https://nodejs.org/) (this sample tested with 10.x)
* [Git](https://git-scm.com/downloads)
* REDIS: 
    - Windows: https://redislabs.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/
    - Linux: https://redis.io/topics/quickstart
* MongoDB:
    - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
    - Linux: https://docs.mongodb.com/manual/administration/install-on-linux/
## Get Code

* Clone or download this [repository](https://bitbucket.org/talpasco/bowling)
    * `git clone https://bitbucket.org/talpasco/bowling` 
* `cd bowling` - move into directory just created
* `npm install` to install dependencies

## Build website code
 
* `npm run prebuild` to prep directories
* `npm run build` to transpile typescript into javascript into `/dist` folder

## Run website code

* `npm run open` to open browser to http://localhost:3001
* `npm run start`


## Run process over and over

* `npm run start:all:again` - prebuilt, build, start, and open in browser

## API Explorer

* Added the bowling API, to search/post through bowling activities (And a fulll CRUD functionality - Strongloop API) : http://localhost:3001/explorer/#/

* Game API example:

```
1) POST: http://localhost:5000/api/games
Payload:
{"__v":0,"id":"_dVP2kEBC","status":"waiting","currentFrame":1,"currentPlayer":"Tal","startingPlayer":"Tal","_id":"609274feea7c9b64c407e032","frames":[],"players":["Tal"]}


2) GET: http://localhost:5000/api/games
Response:
[{"_id":"60927325ea7c9b64c407e030","id":"mADqs8ZJm","status":"in_progress","currentFrame":13,"currentPlayer":"Tal","startingPlayer":"Tal","__v":30,"frames":[{"result":9,"status":"completed","id":1,"rolls":[6,3],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":10,"status":"completed","id":2,"rolls":[10,0],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":9,"status":"completed","id":3,"rolls":[9,0],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":10,"status":"completed","id":4,"rolls":[9,1],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":6,"status":"completed","id":5,"rolls":[6,0],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":3,"status":"pending","id":5,"rolls":[3],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":4,"status":"pending","id":5,"rolls":[4],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":6,"status":"completed","id":6,"rolls":[6,0],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":10,"status":"completed","id":7,"rolls":[6,4],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":4,"status":"completed","id":8,"rolls":[2,2],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":5,"status":"completed","id":9,"rolls":[3,2],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":2,"status":"pending","id":9,"rolls":[2],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":3,"status":"completed","id":10,"rolls":[0,3],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":8,"status":"pending","id":10,"rolls":[8],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":7,"status":"completed","id":11,"rolls":[4,3],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":8,"status":"completed","id":12,"rolls":[5,3],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":1,"status":"pending","id":12,"rolls":[1],"gameId":"mADqs8ZJm","playerId":"Tal"},{"result":5,"status":"pending","id":13,"rolls":[5],"gameId":"mADqs8ZJm","playerId":"Tal"}],"players":["Tal"]},{"_id":"609273eaea7c9b64c407e031","id":"haiCRYXHJ","status":"waiting","currentFrame":1,"currentPlayer":"Tal","startingPlayer":"Tal","__v":0,"frames":[],"players":["Tal"]},{"_id":"609274feea7c9b64c407e032","id":"_dVP2kEBC","status":"waiting","currentFrame":1,"currentPlayer":"Tal","startingPlayer":"Tal","__v":0,"frames":[],"players":["Tal"]}]


3) GET Request URL: http://localhost:5000/api/games/_dVP2kEBC
Response:
{"_id":"609274feea7c9b64c407e032","id":"_dVP2kEBC","status":"waiting","currentFrame":1,"currentPlayer":"Tal","startingPlayer":"Tal","__v":0,"frames":[],"players":["Tal"]}

4) POST: http://localhost:5000/api/games/_dVP2kEBC
{"_id":"609274feea7c9b64c407e032","id":"_dVP2kEBC","status":"in_progress","currentFrame":2,"currentPlayer":"Tal","startingPlayer":"Tal","__v":2,"frames":[{"result":9,"status":"completed","id":1,"rolls":[9,0],"gameId":"_dVP2kEBC","playerId":"Tal"},{"result":9,"status":"pending","id":2,"rolls":[9],"gameId":"_dVP2kEBC","playerId":"Tal"}],"players":["Tal"]}
```

## TODOS:

* Sticky sessions and PubSub - Using Redis-PubSub and Redis-Store, making sure the socket would stick to that specific server instance (within the thread or via load-balancer)
* Unit Tests.
* Split the template.html file into html, scss , js and veu files