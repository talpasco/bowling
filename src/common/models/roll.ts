"use strict";
module.exports = function (roll) {

    function calcFrameResult(rolls) {
        let result = 0;
        for (let i = 0; i < rolls.length; i++) {
            result += rolls[i];
        }
        return result;
    }

    function isComplete(game) {
        let isComplete = true;
        for (let frame of game.frames) {
            if (frame.status != 'complete') {
                isComplete = false;
            }
        }
        return isComplete;
    }

    roll.observe("before save", async (ctx, next) => {
        let gameId = ctx.instance.gameId,
            frameId = ctx.instance.frameId,
            playerId = ctx.instance.playerId,
            knockedPins = ctx.instance.knockedPins;
        //if (!ctx.instance) {// create operation}

        let gameModel = roll.dataSource.models.game;
        let game = await gameModel.findOne({ where: { id: gameId } });

        //console.log(`Player ${user} rolls: [${knockedPins}] on frame ${frameId}
        let frames = game.frames && Array.isArray(game.frames) ? game.frames : [];
        //console.log("Rolls before push: " + JSON.stringify(frames));
        let currentPlayerFrameIndex = game.frames.findIndex(f => f.playerId == playerId && f.id == game.currentFrame);
        let currentPlayerFrame = game.frames[currentPlayerFrameIndex];
        //console.log("Current player frame: " + JSON.stringify(currentPlayerFrame) + " , " + currentPlayerFrameIndex);
        let toPush = {};
        if (currentPlayerFrame) {
            //console.log(`Updating the rolls of current frame ${currentPlayerFrame.id}...`);
            if (currentPlayerFrame.rolls.length < 2) {
                currentPlayerFrame.rolls.push(knockedPins);
                currentPlayerFrame.result = calcFrameResult(currentPlayerFrame.rolls)
            }
            if (currentPlayerFrame.rolls.length == 2) {
                currentPlayerFrame.status = "completed";
            }

            if (currentPlayerFrameIndex) {
                frames[currentPlayerFrameIndex] = currentPlayerFrame;
            }
        } else {
            //console.log(`Pushing new frame`);
            toPush = {
                playerId: playerId,
                gameId: game.id,
                rolls: [knockedPins],
                id: frameId,
                status: "pending",
                result: calcFrameResult([knockedPins])
            };
            currentPlayerFrame = toPush;
            frames.push(toPush);
        }

        //console.log("Frames so far: " + JSON.stringify(frames));

        game.frames = frames;
        let playersCount = game.players.length;
        let currentFrames = [];
        game.frames.array.forEach(frame => {
            if (frame.id == game.currentFrame) {
                currentFrames.push(frame);
            }
        });
        if (currentFrames.length == playersCount && currentFrames.every((status) => status === "completed")) {
            game.currentFrame += 1;
        }
        let playerIndex = game.players.findIndex(p => {
            return p == playerId;
        });
        if (currentPlayerFrame && currentPlayerFrame.rolls.length > 1) {
            if (playerIndex + 1 >= game.players.length) {
                game.currentPlayer = game.players[0];
            } else {
                game.currentPlayer = game.players[playerIndex + 1];
            }
        }

        if (isComplete(game)) {
            game.status = 'finished';
            game.winner = playerId;
        } else {
            game.status = 'in_progress';
        }
        gameModel.upsert(game, function (err, data) {
            // if (!err) {
            //     ws.send(JSON.stringify(data));
            // } else {
            //     ws.send(JSON.stringify(err));
            // }
        });
        next();
    });
};