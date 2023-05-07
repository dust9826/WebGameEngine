import TimeManager from './TimeManager.js';
import KeyManager from './KeyManager.js';
import {Key} from './KeyManager.js';

class Core {
    #canvasView;
    #ctxView;
    #canvasBuffer;
    #ctxBuffer;

    #width;
    #height;

    #x;

    constructor(canvasView) {
        this.#canvasView = canvasView;
        this.#ctxView = this.#canvasView.getContext('2d');

        this.#canvasBuffer = document.createElement('canvas');
        this.#ctxBuffer = this.#canvasBuffer.getContext('2d');

        this.#width = window.innerWidth;
        this.#height = window.innerHeight;

        this.#x = 0;
    }

    init() {
        this.#canvasView.width = this.#width;
        this.#canvasView.height = this.#height;
        this.#canvasBuffer.width = this.#width;
        this.#canvasBuffer.height = this.#height;
        
        TimeManager.getInstance().init();
        KeyManager.getInstance().init();
        
        console.log('Init Core');
    }

    update() {
        TimeManager.getInstance().update();
        KeyManager.getInstance().update();
        this.#x = this.#x + TimeManager.getInstance().DT * 10;
        console.log(KeyManager.getInstance().getKey(Key.A));
        this.render();
    }

    render() {
        console.log('run render');

        this.#ctxBuffer.clearRect(0, 0, this.#width, this.#height);
        this.#ctxBuffer.beginPath();
        this.#ctxBuffer.fillRect(20, 20 + this.#x, 50, 50);
        this.#ctxBuffer.stroke();

        // double buffering
        this.#ctxView.clearRect(0, 0, this.#width, this.#height);
        this.#ctxView.drawImage(this.#canvasBuffer, 0, 0);
    }


}

window.onload = function() {
    let canvasView = document.getElementById('game');
    let core = new Core(canvasView);
    core.init();

    setInterval(() => core.update(), 1000 / 1);
}