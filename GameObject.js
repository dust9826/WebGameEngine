import {Vec2} from './struct.js';

export default class GameObject {
    #position = new Vec2();
    #scale = new Vec2();
    #img = new Image();

    constructor() {}

    init() {
        this.#img.src = './Image/box.png';
        this.#position.set(100, 100);
        this.#scale.set(64, 64);
        console.log(this);
    }
    
    update() {


    }

    lateupdate() {
        
    }

    render(ctx) {
        ctx.drawImage(this.#img
            , this.#position.x - this.#scale.x / 2
            , this.#position.y - this.#scale.y / 2
            , this.#scale.x
            , this.#scale.y);

    }

    get position() {return this.#position;}
    set position(value) {this.#position = value;}

    get scale() {return this.#scale;}
    set scale(value) {this.#scale = value;}

    get img() {return this.#img;}
    set img(value) {this.#img = value;}
}

export const ObjectType = {
    PLAYER : Symbol(0),
    ENEMY : Symbol(1),
    MISSILE : Symbol(2),
    TILE : Symbol(3),
    UI : Symbol(31),
}