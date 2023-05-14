export class Vec2 {
    x = 0;
    y = 0;
    
    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    normalize() {
        let delta = this.length();
        if(delta)
        {
            this.x /= delta;
            this.y /= delta;
        }
        else
        {
            this.x = 1;
        }
    }

    static GetDiff(a, b) {
        let tmp = new Vec2();
        tmp.x = a.x - b.x;
        tmp.y = a.y - b.y;
        return tmp;
    }
}