import KeyManager from './KeyManager.js';

export default class Player extends GameObject  {
    constructor() {}

    update() {

        const speed = 300;

        if( KeyManager.getInstance().getKeyState(Key.W) == KeyState.HOLD)
            this.position.y -= TimeManager.getInstance().DT * speed;
            
        if( KeyManager.getInstance().getKeyState(Key.S) == KeyState.HOLD)
        this.position.y += TimeManager.getInstance().DT * speed;
            
        if( KeyManager.getInstance().getKeyState(Key.A) == KeyState.HOLD)
            this.position.x -= TimeManager.getInstance().DT * speed;
            
        if( KeyManager.getInstance().getKeyState(Key.D) == KeyState.HOLD)
            this.position.x += TimeManager.getInstance().DT * speed;
    }
}