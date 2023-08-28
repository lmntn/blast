"use strict";

import { Container } from "pixi.js";
import Board from "./board";

export default class GameScene extends Container {
    constructor(game) {
        super();
        this.game = game;
        this.board = new Board(game);
        this.setup();
    }

    setup() {
        this.addChild(this.board);
    }
}