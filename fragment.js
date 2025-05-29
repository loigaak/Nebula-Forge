class Fragment {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // 0: star, 1: gas, 2: dust
    this.stability = Math.random() * 40 + 60;
  }

  draw(ctx) {
    ctx.fillStyle = this.type === 0 ? '#ffd700' : this.type === 1 ? '#00b7eb' : '#ff69b4';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, this.stability / 6, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.stability -= 0.3;
    return this.stability <= 0;
  }
}

module.exports = Fragment;
