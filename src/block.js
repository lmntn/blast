"use strict";

import { Container, Sprite, Texture } from "pixi.js";
import { gsap } from "gsap";
import { BLOCK_SIZE } from "./config";

export const Color = ["red", "blue", "purple", "yellow", "green"];

export class Block extends Container {
    constructor(col, row, color) {
        super();
        this.col = col;
        this.row = row;
        this.checked = false;
        this.toRemove = false;
        this.color = color || Color[Math.floor(Math.random() * Color.length)];
        this.setup();
    }

    setup() {
        this.sprite = Sprite.from(`./assets/img/${this.color}.png`);
        this.sprite.width = 100;
        this.sprite.height = 112;
        this.sprite.position.set(this.col * BLOCK_SIZE, this.row * BLOCK_SIZE);
        this.addChild(this.sprite);
    }

    setSprite(color) {
        this.sprite.alpha = 1;
        this.color = color || Color[Math.floor(Math.random() * Color.length)];
        this.sprite.texture =
            Texture.from(`./assets/img/${this.color}.png`);
    }

    dropTo(position, duration, delay, ease) {
        return gsap.to(this.sprite, {
            duration,
            delay,
            ease,
            pixi: position
        });
    }
}