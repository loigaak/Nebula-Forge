# Nebula Forge

Nebula Forge is a unique JavaScript-based strategy puzzle game where players align cosmic fragments to form stable nebulae. Match fragments (star, gas, dust) to stabilize the cosmos, earning points and advancing through galactic cycles. Built with Node.js and the `canvas` library, this game is designed for developers seeking a modular, extensible project.

## Features
- **Cosmic Gameplay**: Align fragments of the same type (star, gas, dust) horizontally or vertically to form stable nebulae.
- **Galactic Cycles**: Progress through cycles as you score, increasing fragment counts and stability.
- **Modular Design**: Clean, object-oriented JavaScript for easy integration and extension.
- **Canvas Rendering**: Server-side rendering with the `canvas` library, ideal for desktop or web applications.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nebula-forge.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nebula-forge
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Align adjacent fragments of the same type (star, gas, dust) horizontally or vertically by cycling their types.
- **Scoring**: Each alignment earns 20 points multiplied by the current cycle.
- **Cycle Progression**: Reach 200 points per cycle to advance, increasing fragment count and stability.
- **Interaction**: Use `game.handleClick(x, y)` to cycle fragment types (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `fragment.js`: Fragment class for cosmic entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. For interactive play, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Nebula Forge and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/your-username). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.