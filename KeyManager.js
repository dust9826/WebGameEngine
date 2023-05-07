export default class KeyManager {
    static #instance;

    #isKeyDown = [];
    #arrKey = [];

    constructor() {
        if(KeyManager.#instance) return KeyManager.#instance;
        KeyManager.#instance = this; 
    }

    static getInstance() {
        if(KeyManager.#instance === undefined) {
            KeyManager.#instance = new KeyManager();
        }
        return KeyManager.#instance;
    }

    init() {
        window.addEventListener('keydown', (e) => this.OnKeyDown(e));
        window.addEventListener('keyup', (e) => this.OnKeyUp(e));

        for(let keyCode in Key)
        {
            this.#arrKey[Key[keyCode]] = new KeyInfo();
        }
    }

    update() {
        for(let key in this.#arrKey)
        {
            console.log(key);
            console.log(this.#isKeyDown[key]);
            console.log(this.#arrKey[key]);
            if(this.#isKeyDown[key] == true)
            {
                if(this.#arrKey[key].bPrevPush == true)
                {
                    this.#arrKey[key].eState = KeyState.HOLD;
                }
                else
                {
                    this.#arrKey[key].eState = KeyState.TAP;
                }
                this.#arrKey[key].bPrevPush = true;
            }
            else
            {
                if(this.#arrKey[key].bPrevPush == false)
                {
                    this.#arrKey[key].eState = KeyState.AWAY;
                }
                else
                {
                    this.#arrKey[key].eState = KeyState.UP;
                }
                this.#arrKey[key].bPrevPush = false;
            }
        }
    }

    getKey(keyCode) {
        console.log(keyCode);
        return this.#arrKey[keyCode].eState;
    }

    OnKeyDown(e) {
        if(e.key === 'Tab') e.preventDefault();
        this.#isKeyDown[e.key] = true;
        //console.log(e);
    }

    OnKeyUp(e) {
        this.#isKeyDown[e.key] = false;
        console.log(e);
    }
}

class KeyInfo {
    eState;
    bPrevPush;
    constructor() {
        this.eState = KeyState.NONE;
        this.bPrevPush = false;
    }
}

const KeyState = {
  NONE : Symbol(0),
  TAP : Symbol(1),
  HOLD : Symbol(2),
  AWAY : Symbol(2),
};

export const Key = {
    LEFT : 'ArrowLeft',
	RIGHT : 'ArrowRight',
	UP : 'ArrowUp',
	DOWN : 'ArrowDown',

	Q : 'q',
	W : 'w',
	E : 'e',
	R : 'r',
	A : 'a',
	S : 's',
	D : 'd',
	F : 'f',
}