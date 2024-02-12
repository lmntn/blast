import { Application } from "pixi.js";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import {GameScene } from "./scenes/game.scene";

export default class Game extends Application {
    constructor(col, row) {
        super({
            background: "#000",
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
        const game = new GameScene(this);
        this.stage.addChild(game);
    }
}