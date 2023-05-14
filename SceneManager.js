import StartScene from './Scene/StartScene.js';
import MainScene from './Scene/MainScene.js';

export default class SceneManager {    
    static #instance;

    static getInstance() {
        if(SceneManager.#instance === undefined) {
            SceneManager.#instance = new SceneManager();
        }
        return SceneManager.#instance;
    }

    #arrScene;
    #curScene;

    constructor() {
        if(SceneManager.#instance) return SceneManager.#instance;
        SceneManager.#instance = this; 
    }

    init() {
        this.#arrScene['StartScene'] = new StartScene();
        this.#arrScene['MainScene'] = new MainScene();

        this.#curScene = this.#arrScene['StartScene'];
        this.#curScene.Enter();
    }

    update() {
        this.#curScene.update();
        this.#curScene.lateupdate();
    }

    render(ctx) {
        this.#curScene.render(ctx);
    }
    
    changeScene(sceneName) {
        this.#curScene.Exit();

        this.#curScene = this.#arrScene[sceneName];
        this.#curScene.Enter();
    }

    getCurrentScene() {
        return this.#curScene;
    }
}