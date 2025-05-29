const { createCanvas } = require('canvas');
const Fragment = require('./fragment.js');

class NebulaForge {
  constructor() {
    this.canvas = createCanvas(480, 640);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 12;
    this.rows = 16;
    this.fragments = [];
    this.score = 0;
    this.cycle = 1;
    this.maxFragments = 4;
    this.spawnFragment();
  }

  spawnFragment() {
    if (this.fragments.length >= this.maxFragments) return;
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * (this.rows - 2)) + 2; // Avoid top rows for UI
    const type = Math.floor(Math.random() * 3); // 0: star, 1: gas, 2: dust
    this.fragments.push(new Fragment(col * this.gridSize, row * this.gridSize, type));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#5a5a5a';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#0f0f1f';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.fragments.length - 1; i >= 0; i--) {
      this.fragments[i].draw(this.ctx);
      if (this.fragments[i].update()) {
        this.fragments.splice(i, 1);
        this.spawnFragment();
      }
    }

    this.checkAlignments();
    this.drawUI();
  }

  checkAlignments() {
    const toRemove = [];
    for (let i = 0; i < this.fragments.length; i++) {
      for (let j = i + 1; j < this.fragments.length; j++) {
        const f1 = this.fragments[i];
        const f2 = this.fragments[j];
        if (
          f1.type === f2.type &&
          (
            (Math.abs(f1.x - f2.x) <= this.gridSize && f1.y === f2.y) || // Horizontal
            (Math.abs(f1.y - f2.y) <= this.gridSize && f1.x === f2.x)    // Vertical
          )
        ) {
          this.ctx.strokeStyle = f1.type === 0 ? '#ffd700' : f1.type === 1 ? '#00b7eb' : '#ff69b4';
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(f1.x + this.gridSize / 2, f1.y + this.gridSize / 2);
          this.ctx.lineTo(f2.x + this.gridSize / 2, f2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 20 * this.cycle;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.fragments.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnFragment();
      if (this.score >= this.cycle * 200) this.advanceCycle();
    }
  }

  advanceCycle() {
    this.cycle++;
    this.maxFragments = Math.min(this.maxFragments + 1, 8);
    this.fragments.forEach(f => (f.stability = Math.min(f.stability + 15, 100)));
    this.spawnFragment();
  }

  drawUI() {
    this.ctx.fillStyle = '#00ffcc';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Cycle: ${this.cycle}`, 10, 45);
  }

  handleClick(x, y) {
    for (const fragment of this.fragments) {
      const d = Math.sqrt(
        Math.pow(x - (fragment.x + this.gridSize / 2), 2) +
        Math.pow(y - (fragment.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        fragment.type = (fragment.type + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.fragments = [];
    this.score = 0;
    this.cycle = 1;
    this.maxFragments = 4;
    this.spawnFragment();
  }
}

// Example usage (for testing in Node.js)
const game = new NebulaForge();
game.update();
console.log('Nebula Forge game initialized. Use a UI framework or save canvas to render.');
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);
