import TimeManager from './TimeManager.js';
import KeyManager from './KeyManager.js';
import {Key, KeyState} from './KeyManager.js';
import Player from './Player';

class Core {
    #canvasView;
    #ctxView;
    #canvasBuffer;
    #ctxBuffer;

    #width;
    #height;

    #x;
  	#y;

    player;

    constructor(canvasView) {
        this.#canvasView = canvasView;
        this.#ctxView = this.#canvasView.getContext('2d');

        this.#canvasBuffer = document.createElement('canvas');
        this.#ctxBuffer = this.#canvasBuffer.getContext('2d');

        this.#width = window.innerWidth;
        this.#height = window.innerHeight;

        this.#x = window.innerWidth / 2;
        this.#y = window.innerHeight / 2;
    }

    init() {
        this.#canvasView.width = this.#width;
        this.#canvasView.height = this.#height;
        this.#canvasBuffer.width = this.#width;
        this.#canvasBuffer.height = this.#height;

        TimeManager.getInstance().init();
        KeyManager.getInstance().init();
        
        player = new Player();

        console.log('Init Core');
    }

    update() {
        TimeManager.getInstance().update();
        KeyManager.getInstance().update();

        player.update();

        this.render();
    }

    render() {
        console.log('run render');

        this.#ctxBuffer.clearRect(0, 0, this.#width, this.#height);
        this.#ctxBuffer.beginPath();
        this.#ctxBuffer.fillRect(this.#x, this.#y, 50, 50);
        this.#ctxBuffer.stroke();

        player.render(this.#ctxBuffer);

        // double buffering
        this.#ctxView.clearRect(0, 0, this.#width, this.#height);
        this.#ctxView.drawImage(this.#canvasBuffer, 0, 0);
    }

    OnResizeWindow() {
        this.#width = window.innerWidth;
        this.#height = window.innerHeight;
        
        this.#canvasView.width = this.#width;
        this.#canvasView.height = this.#height;
        this.#canvasBuffer.width = this.#width;
        this.#canvasBuffer.height = this.#height;
    }
}

window.onload = function() {
    let canvasView = document.getElementById('game');
    let core = new Core(canvasView);
    core.init();
    
    window.onresize = () => core.OnResizeWindow();

    setInterval(() => core.update(), 1000 / 60);
}
