import Scene from './SceneManager';

export default class SceneManager {    
    static #instance;

    static getInstance() {
        if(SceneManager.#instance === undefined) {
            SceneManager.#instance = new SceneManager();
        }
        return SceneManager.#instance;
    }

    constructor() {
        if(SceneManager.#instance) return SceneManager.#instance;
        SceneManager.#instance = this; 
    }
}