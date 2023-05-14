import KeyManager from './KeyManager.js';
import {Key, KeyState} from './KeyManager.js';
import GameObject from './GameObject.js';
import TimeManager from './TimeManager.js';
import {Vec2} from './struct.js';

export default class Missile extends GameObject  {
    #direction = new Vec2();
    
    constructor() {
        super();
    }

    init() {
        super.init();
        this.#direction.x = 1;
    }

    update() {
        const speed = 300;
        let dir = this.#direction;
        this.position.add(dir.multi(speed * TimeManager.getInstance().DT));
    }

    lateupdate() {

    }

    render(ctx) {
        super.render(ctx);
    }

    get direction() {return this.#direction;}
    set direction(value) {value.normalize();this.#direction = value;}
}