import { Container, NineSlicePlane, Texture } from "pixi.js";
import { Block, Color } from "./block";
import { BLOCK_SIZE } from "./config";

export default class Board extends Container {
    constructor(game) {
        super();
        this.game = game;
        this.marginLeft = 50;
        this.margintop = 58;
        this.setup();
    }

    setup() {
        this.scale.set(0.2);
        let texture = Texture.from('./assets/img/field_background.png');
        const bg = new NineSlicePlane(texture, 100, 100, 100, 100);
        bg.width = this.game.blocksWitdh * BLOCK_SIZE + this.marginLeft * 2;
        bg.height = this.game.blocksHeight * BLOCK_SIZE + this.margintop * 2;
        this.addChild(bg);

        this.blocks = new Container();
        this.blocks.position.set(50, 60);

        for (let h = this.game.blocksHeight - 1; h >= 0; h--) {
            for (let w = 0; w < this.game.blocksWitdh; w++) {
                const random = Math.floor(Math.random() * Object.keys(Color).length);
                const color = Color[Object.keys(Color)[random]];

                const block = new Block(color,
                    w * BLOCK_SIZE,
                    h * BLOCK_SIZE
                );

                this.blocks.addChild(block);
            }
        }

        this.addChild(this.blocks);
    }
}