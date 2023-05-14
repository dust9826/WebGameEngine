import {Vec2} from './struct.js';

export default class GameObject {
    #position = new Vec2();
    #scale = new Vec2();
    #img = new Image();

    constructor() {}

    init() {
        this.#img.src = './object.png';
        this.#position = {x: 100, y: 100};
        this.#scale = {x:64, y:64};
    }
    update() {


    }
    render(ctx) {
        ctx.drawImage(img
            , this.#position.x - this.#scale.x / 2
            , this.#position.y - this.#scale.y / 2
            , this.#scale.x
            , this.#scale.y);

    }
}