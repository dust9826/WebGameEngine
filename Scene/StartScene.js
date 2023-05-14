import Scene from './Scene.js';
import Player from '../Player.js'
import {ObjectType} from '../GameObject.js'

export default class StartScene {
    
    constructor() {}

    Enter() {
        let player = new Player();
        super.AddObject(player, ObjectType.PLAYER);
    }
    init() {super.init();}
    update() {super.update();}
    lateupdate() {super.lateupdate();}
    render(ctx) {super.render(ctx);}
    Exit() {}

}