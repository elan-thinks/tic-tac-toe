## tic-tac-toe


# Tic Tac Toe (Console Version)

A simple two-player **Tic Tac Toe** game built with vanilla JavaScript. This version runs entirely in the **browser console** and uses `prompt`/`alert` for user interaction.

---

## 🎮 How to Play

1. Clone or download this repository.
2. Open the `index.html` file in your browser.
3. Open your **browser's developer console** (usually F12 or right-click → Inspect → Console).
4. The game will prompt:
   - Player 1 to choose `'x'` or `'o'`
   - Each player will take turns entering coordinates to place their mark.
5. The game ends when:
   - A player wins (3 in a row)
   - The board is full (draw)

---

## 🧠 Features

- 3x3 grid logic using a 2D array
- Turn-based input via `prompt()`
- Win detection (rows, columns, diagonals)
- Draw detection when board is full
- Console-based game board rendering

---

## 🔍 Sample Output

```

## | x |   | o |

## | x | o |   |

## | x |   |   |

The winner is x

```

---

## 🚧 Planned Features (Next Commit)

- ✅ DOM-based graphical UI (instead of console)
- ✅ Clickable game board
- ✅ Improved user experience with styled elements
- ✅ Restart button and scoreboard

---

## 📁 Project Structure

```

tic-tac-toe/
├── index.html
└── script.js   ← (contains the game logic)

```

---

## 📜 License

This project is open-source and free to use under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

Inspired by classic beginner-friendly JavaScript projects. Built as a learning exercise to master logic, user input handling, and game state management.

```

---
By @elan-thinks
