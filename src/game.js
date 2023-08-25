"use strinc";

import { Application, Sprite } from "pixi.js";

export default class Game {
    constructor() {
        this.app = new Application({
            background: "#32607d",
            resizeTo: window,
        });

        document.body.appendChild(this.app.view);
    }

    start() {
        const bunny = Sprite.from('https://pixijs.com/assets/bunny.png');

        bunny.anchor.set(0.5);
        bunny.x = this.app.screen.width / 2;
        bunny.y = this.app.screen.height / 2;

        this.app.stage.addChild(bunny);
    }
}