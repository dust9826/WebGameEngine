import KeyManager from './KeyManager.js';
import {Key, KeyState} from './KeyManager.js';
import GameObject from './GameObject.js';
import {ObjectType} from './GameObject.js';
import TimeManager from './TimeManager.js';
import Missile from './Missile.js';
import SceneManager from './SceneManager.js'
import Scene from './Scene/Scene.js'

export default class Player extends GameObject  {
    constructor() {
        super();
        this.img.src = './Image/cat.png';
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

        if(KeyManager.getInstance().getMouseState() == KeyState.TAP)
        {
            this.shootMissile();
        }
    }

    lateupdate() {

    }

    render(ctx) {
        super.render(ctx);
    }

    shootMissile() {
        let missile = new Missile();
        missile.direction = KeyManager.getInstance().getMousePosition() - this.position;
        missile.direction.normalize();

        SceneManager.getInstance().getCurrentScene().AddObject(missile, ObjectType.MISSILE);
    }
}