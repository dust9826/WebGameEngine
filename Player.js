import KeyManager from './KeyManager.js';
import {Key, KeyState} from './KeyManager.js';
import GameObject from './GameObject.js';
import TimeManager from './TimeManager.js';

export default class Player extends GameObject  {
    constructor() {
        super();
    }

    init() {
        super.init();
    }

    update() {
        const speed = 300;

        if( KeyManager.getInstance().getKeyState(Key.W) == KeyState.HOLD)
            this.position.y -= TimeManager.getInstance().DT * speed;
            
        if( KeyManager.getInstance().getKeyState(Key.S) == KeyState.HOLD)
        this.position.y += TimeManager.getInstance().DT * speed;
            
        if( KeyManager.getInstance().getKeyState(Key.A) == KeyState.HOLD)
        {
            // 좌우반전
            this.img.style.transform = 'scaleX(-1)';
            this.position.x -= TimeManager.getInstance().DT * speed;
        }
            
        if( KeyManager.getInstance().getKeyState(Key.D) == KeyState.HOLD)
        {
            this.img.style.transform = 'scaleX(1)';
            this.position.x += TimeManager.getInstance().DT * speed;
        }
    }

    lateupdate() {

    }

    render(ctx) {
        super.render(ctx);
    }
}