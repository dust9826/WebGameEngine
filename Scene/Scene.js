import GameObject from '../GameObject.js';
import {ObjectType} from '../GameObject.js';

export default class Scene {
    
    #arrGameObject = [];
    
    constructor() {
        for(let type in ObjectType) {
            this.#arrGameObject[ObjectType[type]] = [];
        }
    }

    Enter() {}
    init() {
        for(let type in ObjectType) {
            for(let obj in this.#arrGameObject[ObjectType[type]]) {
                console.log(this);
                console.log(obj);
                obj.init();
            }
        }
    }
    update() {
        for(let type in ObjectType) {
            for(let obj in this.#arrGameObject[ObjectType[type]]) {
                obj.update();
            }
        }
    }
    lateupdate() {
        for(let type in ObjectType) {
            for(let obj in this.#arrGameObject[ObjectType[type]]) {
                obj.lateupdate();
            }
        }
    }
    render(ctx) {
        for(let type in ObjectType) {
            for(let obj in this.#arrGameObject[ObjectType[type]]) {
                obj.render(ctx);
            }
        }
    }
    Exit() {}

    AddObject(gameObj, type) {
        this.#arrGameObject[type].push(gameObj);
    }
}