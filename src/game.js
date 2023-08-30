"use strict";

import { Application } from "pixi.js";
import * as PIXI from "pixi.js";
import GameScene from "./game.scene";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export default class Game extends Application {
    constructor(col, row) {
        super({
            background: "#32607d",
            resizeTo: window,
            resolution: window.devicePixelRatio,
            autoResize: true
        });
        
        this.col = col;
        this.row = row;

        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);
        this.setup();
    }

    setup() {
        document.body.appendChild(this.view);
        this.gameScene = new GameScene(this);
        this.stage.addChild(this.gameScene);
    }
}