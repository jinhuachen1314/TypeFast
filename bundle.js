/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./js/game.js");


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext('2d');

  const startBtn = document.getElementById("start-btn");
  const startHeader = document.getElementById("start-header");  
  const audio = document.getElementById("audio");
  const music = document.getElementById("music");
  const input = document.getElementById("input");

  audio.autoplay = false;
  music.style.display = "none";
  input.style.display = "none";

  startBtn.addEventListener("click", () => {
    startHeader.style.display = "none";
    startGame();
  })

  function startGame() {
    let game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](c);
    game.playGame();
  }
});

/***/ }),

/***/ "./js/box.js":
/*!*******************!*\
  !*** ./js/box.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Box {
  constructor(c, x, y, text) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.text = text;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Box);

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./box */ "./js/box.js");


class Game {
  constructor(c) {
    // initialize board, boxes, speed, music
    this.c = c;
    this.score = document.getElementById("score");
    this.audio = document.getElementById("audio");
    this.music = document.getElementById("music");
    this.input = document.getElementById("input");
    this.startHeader = document.getElementById("start-header");

    // when game starts
    this.currentScore = 0;
    this.gameOver = false;
    this.spawnY = 25;
    this.spawnRate = 1500;
    this.spawnRateOfDescent = 0.50;
    this.lastSpawn = -1;
    this.boxes = [];
    this.startTime = Date.now();
    this.audio.load();
    this.animate = this.animate.bind(this);
    this.spawnRandomObject = this.spawnRandomObject.bind(this);
  } 

  // function to start the game
  playGame() {
    this.music.style.display = "flex";
    this.input.style.display = "flex";
    this.music.addEventListener("click", () => {
      const span = this.music.firstChild;
      if (this.music.className === "btn-mute") {
        this.audio.pause();
        this.music.className = "btn-unmute"
        span.innerHTML = "PLAY"
      } else {
        this.audio.play();
        this.music.className = "btn-mute"
        span.innerHTML = "PAUSE"
      }
    })

    this.audio.play();
    this.animate();
   }

  animate() {
    if (!this.gameOver) {
      this.input.addEventListener("input", e => {
        if (e.target.value === this.boxes[0].text) {
          this.boxes.shift();
          e.target.value = "";
          this.currentScore++;
          this.score.innerText = "Score: " + this.currentScore;
        }
      })

      const time = Date.now();

      if (time - this.startTime > 60000) {
        this.spawnRateOfDescent += 0.5;
        this.startTime = time;
      }

      if (time > (this.lastSpawn + this.spawnRate)) {
        this.lastSpawn = time;
        this.spawnRandomObject();
      }

      requestAnimationFrame(this.animate);

      this.c.clearRect(0, 0, this.c.canvas.width, this.c.canvas.height);

      // this.c.beginPath();
      // this.c.moveTo(0, this.spawnY);
      // this.c.lineTo(this.c.canvas.width, this.spawnY);
      // this.c.stroke();

      for (let i = 0; i < this.boxes.length; i++) {
        const box = this.boxes[i];
        box.y += this.spawnRateOfDescent;
        this.c.beginPath();
        this.c.fillStyle = "#000000";
        this.c.fillText(box.text, box.x, box.y);
        this.c.font = "30px fantasy"
        this.c.closePath();
      }

      if (this.boxes[0].y >= 800) {
        this.gameOver = true;
      }
    } else {
      this.startHeader.style.display = "flex";
    }
  }

  randomString() {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const length = Math.floor(Math.random() * 8);
    const wordLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * wordLength));
    }
    return result;
  }


  spawnRandomObject() {
    const str = this.randomString();
    let x = Math.random() * (this.c.canvas.width);
    console.log("prev x " + x);
    console.log(x + this.c.measureText(str).width);
    while (x + this.c.measureText(str).width > 1000) {
      x -= 100;
    }
    console.log("now x " + x);
    const box = new _box__WEBPACK_IMPORTED_MODULE_0__["default"](this.c, 
      x,
      this.spawnY,
      str
    );

    this.boxes.push(box);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map