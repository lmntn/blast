"use strict";

import { Container } from "pixi.js";
import Board from "./board";

export default class GameScene extends Container {
    constructor(game) {
        super();
        this.game = game;
        this.setup();
    }
    
    setup() {
        this.board = new Board(this.game);
        this.addChild(this.board.container);
    }
}