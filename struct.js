export class Vec2 {
    x;
    y;
    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }
    normalize() {
        let delta = this.length();
        this.x /= delta;
        this.y /= delta;
    }
}