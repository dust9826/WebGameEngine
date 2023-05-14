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
        for(let type of ObjectType) {
            for(let obj of this.#arrGameObject[type]) {
                obj.init();
            }
        }
    }
    update() {
        for(let type of ObjectType) {
            for(let obj of this.#arrGameObject[type]) {
                obj.update();
            }
        }
    }
    lateupdate() {
        for(let type of ObjectType) {
            for(let obj of this.#arrGameObject[type]) {
                obj.lateupdate();
            }
        }
    }
    render(ctx) {
        for(let type of ObjectType) {
            for(let obj of this.#arrGameObject[type]) {
                obj.render(ctx);
            }
        }
    }
    Exit() {}

    AddObject(gameObj, type) {
        this.#arrGameObject[type].push(gameObj);
    }
}