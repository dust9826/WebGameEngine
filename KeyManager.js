export default class KeyManager {
    static #instance;

    #isKeyDown = [];
    #arrKey = [];
    #isMouseDown;
    #mouseState;
    #mousePosition;

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
        window.addEventListener('mousedown', (e) => this.OnMouseDown(e));
        window.addEventListener('mouseup', (e) => this.OnMouseUp(e));
        window.addEventListener('mousemove', (e) => this.OnMouseMove(e));

        for(let keyCode in Key)
        {
            this.#arrKey[Key[keyCode]] = new KeyInfo();
            this.#isKeyDown[Key[keyCode]] = false;
        }

        this.#mouseState = new KeyInfo();
        this.#isMouseDown = false;
        this.#mousePosition = new Vec2();
    }

    update() {
        for(let key in this.#arrKey)
        {
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
                    this.#arrKey[key].eState = KeyState.NONE;
                }
                else
                {
                    this.#arrKey[key].eState = KeyState.AWAY;
                }
                this.#arrKey[key].bPrevPush = false;
            }
        }

        if(this.#isMouseDown == true)
        {
            if(this.#mouseState.bPrevPush == true)
            {
                this.#mouseState.eState = KeyState.HOLD;
            }
            else
            {
                this.#mouseState.eState = KeyState.TAP;
            }
            this.#mouseState.bPrevPush = true;
        }
        else
        {
            if(this.#mouseState.bPrevPush == false)
            {
                this.#mouseState.eState = KeyState.NONE;
            }
            else
            {
                this.#mouseState.eState = KeyState.AWAY;
            }
            this.#mouseState.bPrevPush = false;
        }
    }

    getKeyState(keyCode) {
        return this.#arrKey[keyCode].eState;
    }

    OnKeyDown(e) {
        if(e.key === 'Tab') e.preventDefault();
        this.#isKeyDown[e.key] = true;
    }
    OnKeyUp(e) {
        this.#isKeyDown[e.key] = false;
    }
    OnMouseDown(e) {
        console.log(e);
        this.#isMouseDown = true;
    }
    OnMouseUp(e) {
        console.log(e);
        this.#isMouseDown = false;
    }
    OnMouseMove(e) {
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

export const KeyState = {
  NONE : Symbol(0),
  TAP : Symbol(1),
  HOLD : Symbol(2),
  AWAY : Symbol(3),
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