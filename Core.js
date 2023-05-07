import TimeManager from './TimeManager.js';
import KeyManager from './KeyManager.js';
import {Key, KeyState} from './KeyManager.js';

class Core {
    #canvasView;
    #ctxView;
    #canvasBuffer;
    #ctxBuffer;

    #width;
    #height;

    #x;
    #y;

    constructor(canvasView) {
        this.#canvasView = canvasView;
        this.#ctxView = this.#canvasView.getContext('2d');

        this.#canvasBuffer = document.createElement('canvas');
        this.#ctxBuffer = this.#canvasBuffer.getContext('2d');

        this.#width = window.innerWidth;
        this.#height = window.innerHeight;

        this.#x = this.#width / 2;
        this.#y = this.#height / 2;
    }

    init() {
        this.#canvasView.width = this.#width;
        this.#canvasView.height = this.#height;
        this.#canvasBuffer.width = this.#width;
        this.#canvasBuffer.height = this.#height;

        window.onresize = function() {
            this.#width = window.innerWidth;
            this.#height = window.innerHeight;
            this.#canvasView.width = this.#width;
            this.#canvasView.height = this.#height;
            this.#canvasBuffer.width = this.#width;
            this.#canvasBuffer.height = this.#height;
        }
        
        TimeManager.getInstance().init();
        KeyManager.getInstance().init();
        
        console.log('Init Core');
    }

    update() {
        TimeManager.getInstance().update();
        KeyManager.getInstance().update();

        if(KeyManager.getInstance().getKeyState(Key.D) === KeyState.HOLD)
        {
            this.#x += TimeManager.getInstance().DT * 30;
        }

        if(KeyManager.getInstance().getKeyState(Key.A) === KeyState.HOLD)
        {
            this.#x -= TimeManager.getInstance().DT * 30;
        }

        if(KeyManager.getInstance().getKeyState(Key.S) === KeyState.HOLD)
        {
            this.#y += TimeManager.getInstance().DT * 30;
        }

        if(KeyManager.getInstance().getKeyState(Key.W) === KeyState.HOLD)
        {
            this.#y -= TimeManager.getInstance().DT * 30;
        }

        console.log(KeyManager.getInstance().getKey(Key.A));
        this.render();
    }

    render() {
        console.log('run render');

        this.#ctxBuffer.clearRect(0, 0, this.#width, this.#height);
        this.#ctxBuffer.beginPath();
        this.#ctxBuffer.fillRect(this.#y, this.#x, 50, 50);
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