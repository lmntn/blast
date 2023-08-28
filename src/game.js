"use strict";

import { Application } from "pixi.js";
import GameScene from "./game.scene";

export default class Game extends Application {
    constructor(blocksWitdh, blocksHeight) {
        super({
            background: "#32607d",
            resizeTo: window,
            resolution: window.devicePixelRatio,
            autoResize: true
        });
        this.blocksWitdh = blocksWitdh;
        this.blocksHeight = blocksHeight;
        this.setup();
    }

    setup() {
        document.body.appendChild(this.view);
        this.gameScene = new GameScene(this);
        this.stage.addChild(this.gameScene);
    }
}