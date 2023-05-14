export default class TimeManager {
    static #instance;

    static getInstance() {
        if(TimeManager.#instance === undefined) {
            TimeManager.#instance = new TimeManager();
        }
        return TimeManager.#instance;
    }

    #preTime;
    #deltaTime;

    constructor() {
        if(TimeManager.#instance) return TimeManager.#instance;
        TimeManager.#instance = this; 
    }

    init() {
        this.#preTime = new Date();
    }

    update() {
        let curTime = new Date();
        this.#deltaTime = curTime - this.#preTime;
        this.#preTime = curTime;
    }

    get DT() {
        return this.#deltaTime / 1000;
    }
}