import Game from "./game";
import "./styles/main.less";
import { BLOCK_SIZE } from "./config";

const xBlocks = Math.floor(window.innerWidth / BLOCK_SIZE);
const yBlocks = Math.floor(window.innerHeight / BLOCK_SIZE);
const game = new Game(xBlocks, yBlocks);
// globalThis.__PIXI_APP__ = game;
game.start();