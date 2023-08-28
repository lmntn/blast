import { Container, Sprite } from "pixi.js";

export const Color = {
    Red: "red",
    Blue: "blue",
    Purple: "purple",
    Yellow: "yellow",
    Green: "green"
}

export class Block extends Container {
    constructor(color, x, y) {
        super();
        this.sprite = Sprite.from(`./assets/img/${color}.png`);
        this.sprite.width = 100;
        this.sprite.height = 112;
        this.position.set(x, y - 12);
        this.addChild(this.sprite);
    }
}