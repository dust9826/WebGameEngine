import KeyManager from './KeyManager.js';
import {Key, KeyState} from './KeyManager.js';
import GameObject from './GameObject.js';
import TimeManager from './TimeManager.js';

export default class Missile extends GameObject  {
    #direction = new Vec2();
    
    constructor() {
        super();
    }

    init() {
        super.init();
    }

    update() {
        const speed = 300;

        this.position += this.#direction * speed * TimeManager.getInstance().DT;
    }

    lateupdate() {

    }

    render(ctx) {
        super.render(ctx);
    }

    get direction() {return this.#direction;}
    set direction(value) {this.#direction = value;}
}