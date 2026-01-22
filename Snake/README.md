# 🐍 Snake Game

A simple and fun Snake game built with HTML, CSS, and JavaScript. Control the snake to eat food and grow longer while avoiding walls and yourself!

## 🎮 How to Play

1. **Start the Game**: Click the "Start Game" button
2. **Control the Snake**: Use the arrow keys on your keyboard
   - ⬆️ **Up Arrow**: Move up
   - ⬇️ **Down Arrow**: Move down
   - ⬅️ **Left Arrow**: Move left
   - ➡️ **Right Arrow**: Move right
3. **Objective**: Eat the red food to grow longer and increase your score
4. **Scoring**: Each food eaten gives you 10 points
5. **Game Over**: The game ends if you:
   - Hit the walls
   - Hit your own body
6. **Restart**: Click "Play Again" or "Start Game" to start a new game

## 🚀 Getting Started

### Option 1: Open Directly in Browser (Easiest)

1. Download or clone this repository
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari)
3. That's it! Start playing!

### Option 2: Using a Local Server (Recommended)

If you have Python installed:

1. Open a terminal/command prompt in the project folder
2. Run one of these commands:

   **Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

3. Open your browser and go to: `http://localhost:8000`

## 📁 Files Included

- `index.html` - Main HTML structure
- `style.css` - Game styling and design
- `script.js` - Game logic and functionality
- `README.md` - This file with instructions

## 🎯 Features

- ✅ Smooth snake movement
- ✅ Score tracking
- ✅ High score saved in browser (localStorage)
- ✅ Pause/Resume functionality
- ✅ Game over detection
- ✅ Beautiful modern UI
- ✅ Responsive design

## 💡 Tips

- Plan your moves ahead to avoid getting trapped
- The snake moves continuously, so think about where you'll be in a few moves
- Try to create patterns that give you space to move
- Practice makes perfect!

## 🛠️ Customization

Want to make the game easier or harder? Edit `script.js`:

- **Change speed**: Modify the number in `setInterval(gameStep, 150)` - lower number = faster game
- **Change grid size**: Modify `GRID_SIZE` constant (currently 20)
- **Change score per food**: Modify the `score += 10` line

## 📝 Requirements

- Any modern web browser (no additional software needed!)
- No internet connection required (works offline)

## 🎨 Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Edge
- Safari
- Opera

Enjoy playing! 🎮
