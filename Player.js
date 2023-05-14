import KeyManager from './KeyManager.js';

export default class Player extends GameObject  {
    constructor() {}

    update() {
        
        const speed = 300;

        if( KeyManager.getInstance().getKeyState(Key.W) == KeyState.HOLD)
            this.#y -= TimeManager.getInstance().DT * speed;
            
        if( KeyManager.getInstance().getKeyState(Key.S) == KeyState.HOLD)
            this.#y += TimeManager.getInstance().DT * speed;
            
        if( KeyManager.getInstance().getKeyState(Key.A) == KeyState.HOLD)
            this.#x -= TimeManager.getInstance().DT * speed;
            
        if( KeyManager.getInstance().getKeyState(Key.D) == KeyState.HOLD)
            this.#x += TimeManager.getInstance().DT * speed;
    }
}