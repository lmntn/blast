"use strict";

import { Container, NineSlicePlane, Texture } from "pixi.js";
import { Block } from "./block";
import { BLOCK_SIZE } from "./config";

export default class Board {
    constructor(game) {
        this.container = new Container();
        this.fields = [];
        this.game = game;
        this.marginLeft = 0;
        this.margintop = 0;
        this.fallDelay = 0;
        this.matchCount = 0;
        this.lock = false;
        this.setup();
    }

    setBackground() {
        const texture = Texture.from('./assets/img/field_background.png');
        const bg = new NineSlicePlane(texture, 100, 100, 100, 100);
        bg.width = this.game.col * BLOCK_SIZE;
        bg.height = this.game.row * BLOCK_SIZE;
        bg.position.set(0, 0)
        this.container.addChild(bg);
    }

    setup() {
        this.container.scale.set(0.2);
        this.setBackground();

        this.blocks = [];
        // this.container.position.set(50, 60);

        for (let row = this.game.row - 1; row >= 0; row--) {
            for (let col = 0; col < this.game.col; col++) {
                const block = this.createBlock(col, row);
                this.blocks.push(block);
            }
        }
    }

    createBlock(col, row) {
        let block = new Block(col, row);
        block.sprite.eventMode = "dynamic";
        block.sprite.on('pointerdown', () => this.onClick(block));
        this.container.addChild(block.sprite);
        return block;
    }

    onClick(block) {
        console.log(this.blocks.length)
        if (this.lock) return;
        
        this.fallDelay = 0;
        this.matchCount = 0;
        this.clickedBlock = block;
        this.setMatchesToRemove(block);
        
        if (this.matchCount < 2) {
            block.toRemove = false;
            block.checked = false;
            return;
        }
        
        this.lock = true;

        this.removeBlocks();
        this.fallingBlocks();
    }

    removeBlocks() {
        this.blocks.forEach(block => {
            if (!block.toRemove) return;
            block.sprite.alpha = 0;
            this.countOfRemoved++;
        });
    }

    setMatchesToRemove(block) {
        if (!block ||
            block.checked ||
            block.color !== this.clickedBlock.color) return;

        block.checked = true;
        block.toRemove = true;
        this.matchCount += 1;

        this.setMatchesToRemove(this.getBlock(block.col, block.row - 1)); //top
        this.setMatchesToRemove(this.getBlock(block.col + 1, block.row)); //right
        this.setMatchesToRemove(this.getBlock(block.col, block.row + 1)); //bottom
        this.setMatchesToRemove(this.getBlock(block.col - 1, block.row)); //left
    }

    getBlock(col, row) {
        return this.blocks.find(b => col == b.col && row == b.row);
    }

    fallingBlocks() {
        for (let row = this.game.row - 1; row >= 0; row--) {
            for (let col = 0; col < this.game.col; col++) {
                const block = this.getBlock(col, row);

                if (block && block.toRemove) {
                    this.fallBlocksTo(block).then(() => this.addBlocks());
                }
            }
        }
    }

    addBlocks() {
        if (this.lock) {
            this.blocks.forEach(block => {
                if (block.toRemove) {
                    // block.sprite.alpha=1;
                    block.setSprite();

                    const positionTo = {
                        x: block.col * BLOCK_SIZE,
                        y: block.row * BLOCK_SIZE
                    };

                    block.sprite.y = -200;

                    block.dropTo(positionTo, .5, this.fallDelay, "bounce.out")
                        .then(() => {
                            block.toRemove = false;
                            block.checked = false;
                            this.lock = false;
                        });
                }
            });
        }

        this.lock = false;
    }

    fallBlocksTo(emptyBlock) {
        return new Promise(resolve => {
            for (let row = emptyBlock.row; row >= 0; row--) {
                const fallingBlock = this.getBlock(emptyBlock.col, row);

                if (fallingBlock && !fallingBlock.toRemove) {
                    const emptyCol = emptyBlock.col;
                    const emptyRow = emptyBlock.row;

                    emptyBlock.toRemove = true;
                    emptyBlock.col = fallingBlock.col;
                    emptyBlock.row = fallingBlock.row;

                    fallingBlock.toRemove = false;
                    fallingBlock.col = emptyCol;
                    fallingBlock.row = emptyRow;

                    this.fallDelay += 0.005;

                    const positionTo = {
                        x: emptyCol * BLOCK_SIZE,
                        y: emptyRow * BLOCK_SIZE
                    };

                    fallingBlock.dropTo(positionTo, .5, this.fallDelay, "bounce.out");

                    return;
                }
            }
            resolve();
        });
    }
}