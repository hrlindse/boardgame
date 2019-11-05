<template>
  <div id="app">
    <div class="buttons">
      <div class="button" v-on:click="startGame()">
        <p>Start Game</p>
      </div>
      <div class="button" v-on:click="reset()">
        <p>Reset Game</p>
      </div>
      <div class="button" v-on:click="reset()">
        <p>{{winner}}</p>
      </div>
    </div>
    <div class="game">
      <div class="player1">
        <h1>Player 1</h1>
        <div class="board">
          <div class="row" v-for="(row, indexR) in plots1" v-bind:key="row">
            <div
              class="cell"
              v-for="(item, indexC) in row"
              v-bind:key="item"
              v-on:click="selectCell(indexR, indexC)"
            >
              <div v-if="item==0" class="empty">{{ item }}</div>
              <div v-else-if="item=='O'" class="wrong">{{ item }}</div>
              <div v-else-if="item=='+'" class="right">{{ item }}</div>
              <div v-else class="active">{{ item }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="guess">
        <h1>Guess Player 2</h1>
        <div class="board">
          <div class="row" v-for="(row, indexR) in guess" v-bind:key="row">
            <div
              class="cell"
              v-for="(item, indexC) in row"
              v-bind:key="item"
              v-on:click="guessHit(indexR, indexC)"
            >
              <div v-if="item==0" class="empty">{{ item }}</div>
              <div v-else-if="item=='O'" class="wrong">{{ item }}</div>
              <div v-else-if="item=='+'" class="right">{{ item }}</div>
              <div v-else class="active">{{ item }}</div>
            </div>
          </div>
        </div>
        <p>Player Guess: {{playerGuess}}</p>
        <p>Computer Guess: {{compGuess}}</p>
      </div>

      <div class="player2">
        <h1>Computer/Player 2</h1>
        <router-link to="/player2">Show Player 2 (for debugging)</router-link>
        <router-view name="player2"></router-view>
      </div>
    </div>
  </div>
</template>


<script>
import GameData from "./GameData.js";
// import Player2 from "./components/Player2.vue";

export default {
  name: "app",
  components: {},
  data: function() {
    return {
      plots1: GameData.plots1,
      guess: GameData.guess,
      playerGuess: "(null, null)",
      compGuess: "(null, null)",
      winner: "No Winner Yet!"
    };
  },

  methods: {
    selectCell: function(indexR, indexC) {
      GameData.plots1[indexR][indexC] = 1;
    },
    startGame: function() {
      //generate game
      this.reset();
      var pieces = [5, 4, 3, 3, 2];
      var boards = [this.plots1, GameData.plots2];

      for (var i = 0; i < boards.length; i++) {
        for (var x = 0; x < pieces.length; x++) {
          var loop = true;
          var loopcount = 0;
          cellX = Math.floor(Math.random() * 10);
          cellY = Math.floor(Math.random() * 10);
          var direction = Math.floor(Math.random() * 2);
          while (loop) {
            loopcount++;
            //vertical placement
            if (direction == 0) {
              //prevent infinate loop
              if (loopcount > 50) {
                direction = 1;
              }
              //if there is room
              if (cellY <= 10 - pieces[x] && boards[i][cellY][cellX] == 0) {
                //place x
                boards[i][cellY][cellX] = "X";
                //move up one space
                cellY++;
                // remove placed piece
                pieces[x]--;
              } else {
                // if cell y can't go any lower, go to the top and over one
                if (cellY < 0) {
                  cellY = 9;
                  // if you cant go over one, go to the beginning
                  if (cellX == 9) {
                    cellX = 0;
                  } else {
                    cellX++;
                  }
                } else {
                  cellY--;
                }
              }
            }
            //horizontal placement
            else if (direction == 1) {
              //prevent infinate loop
              if (loopcount > 50) {
                direction = 0;
              }
              //if there is room
              if (cellX <= 10 - pieces[x] && boards[i][cellY][cellX] == 0) {
                //place x
                boards[i][cellY][cellX] = "X";
                //move up one space
                cellX++;
                // remove placed piece
                pieces[x]--;
              } else {
                // if cell x can't go any lower, go to the top and over one
                if (cellX < 0) {
                  cellX = 9;
                  // if you cant go over one, go to the beginning
                  if (cellY == 9) {
                    cellY = 0;
                  } else {
                    cellY++;
                  }
                } else {
                  cellX--;
                }
              }
            }

            if (pieces[x] == 0) {
              loop = false;
            }
          }
        }
        pieces = [5, 4, 3, 3, 2];
      }

      var cellX = Math.floor(Math.random() * 10);
      var cellY = Math.floor(Math.random() * 10);
      //this.plots1[cellY][cellX] = 1;
      this.$forceUpdate();
    },
    reset: function() {
      this.plots1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
      GameData.plots2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
      this.$forceUpdate();
    },
    checkWin: function() {
      var boards = [this.plots1, GameData.plots2];
      var win = true;
      for (var i = 0; i < boards.length; i++) {
        for (var y = 0; y < boards[i].length; y++) {
          for (var x = 0; x < boards[i][y].length; x++) {
            if (boards[i][y][x] == "X") {
              win = false;
            }
          }
        }
        if (win) {
          if (i == 1) {
            this.winner = "Winner! Player 1!";
          }
          if (i == 0) {
            this.winner = "Winner! Player 2!";
          }
        } else {
          win = true;
        }
      }
      this.$forceUpdate();
    },
    guessHit: function(y, x) {
      //checks players guess
      this.playerGuess = "(" + (x + 1) + " , " + (y + 1) + ")";
      if (GameData.plots2[y][x] != 0) {
        this.guess[y][x] = "+";
        GameData.plots2[y][x] = "+";
      } else {
        this.guess[y][x] = "O";
      }
      //computer makes a guess
      var guessed = false;
      var loopcount = 0;
      while (!guessed) {
        var cellX = Math.floor(Math.random() * 10);
        var cellY = Math.floor(Math.random() * 10);
        this.compGuess = "(" + (cellX + 1) + " , " + (cellY + 1) + ")";
        if (this.plots1[cellY][cellX] == "X") {
          this.plots1[cellY][cellX] = "+";
          guessed = true;
        } else if (this.plots1[cellY][cellX] == 0) {
          this.plots1[cellY][cellX] = "O";
          guessed = true;
        } else if (loopcount > 100) {
          guessed = true;
        }
      }
      this.checkWin();
      this.$forceUpdate();
    }
  }
};

// function randPlot() {
//   //find random spot on board
// }
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.button p {
  padding: 20px;
  width: 100px;
  background-color: bisque;
  font-size: 22px;
  margin: 0;
}
.buttons {
  display: flex;
}

.button {
  margin: 20px;
}

.game {
  display: flex;
}

.game > div {
  padding: 20px;
}

.board {
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: space-around;
}
.cell {
  width: 35px;
  height: 35px;
  border: solid 1px white;
  margin: 0;
  color: white;
  padding: 0;
}
.empty {
  background-color: black;
  color: black;
  width: 100%;
  height: 100%;
}

.active {
  background-color: antiquewhite;
  color: antiquewhite;
  width: 100%;
  height: 100%;
}
.wrong {
  background-color: red;
  color: red;
  width: 100%;
  height: 100%;
}
.right {
  background-color: green;
  color: green;
  width: 100%;
  height: 100%;
}
</style>
