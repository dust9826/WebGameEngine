import KeyManager from './KeyManager.js';
import {Key, KeyState} from './KeyManager.js';
import GameObject from './GameObject.js';
import {ObjectType} from './GameObject.js';
import {Vec2} from './struct.js';
import TimeManager from './TimeManager.js';
import Missile from './Missile.js';
import SceneManager from './SceneManager.js'
import Scene from './Scene/Scene.js'

export default class Player extends GameObject  {
    constructor() {
        super();
    }

    init() {
        super.init();
        this.img.src = './Image/cat.png';
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
        missile.init();
        missile.direction = Vec2.GetDiff(KeyManager.getInstance().getMousePosition(), this.position);

        let curScene = SceneManager.getInstance().getCurrentScene();
        curScene.AddObject(missile, ObjectType.MISSILE);
        console.log(curScene.GetObjectByType(ObjectType.MISSILE));
    }
}