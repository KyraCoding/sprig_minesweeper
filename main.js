/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Minesweeper
@author: KyraCoding/MrMeCoding
@tags: ["game"]
@addedOn: 2024-00-00
*/

const boxLeft = "l"
const boxCenter = "c"
const boxRight = "r"
const boxLeftSelected = "L"
const boxCenterSelected = "C"
const boxRightSelected = "R"
const minesweeperTileA = "t"
const minesweeperTileB = "T"
const minesweeperBlankA = "b"
const minesweeperBlankB = "B"
const minesweeperBoard = "g"
const minesweeperOne = "1"
const flagIcon = "f"

const menuSong = tune`
500: C4~500 + C5^500 + G5/500,
500: F5/500,
500: E4~500 + G4^500 + E5/500,
500: D5/500,
500: F4~500 + A4^500 + E5/500,
500: F5/500,
500: G4~500 + B4^500,
500: G4~500 + B4^500,
500: C4~500 + C5^500 + G5/500,
500: F5/500,
500: E4~500 + G4^500 + E5/500,
500: D5/500,
500: F4~500 + A4^500,
500,
500: G4~500 + B4^500,
500: G4~500 + B4^500,
500: C4~500 + C5^500,
500,
500: E4~500 + G4^500 + E5/500,
500: D5/500,
500: F4~500 + A4^500 + E5/500,
500: F5/500,
500: G4~500 + B4^500 + E5/500,
500: G4~500 + B4^500 + D5/500,
500: C4~500 + C5^500,
500,
500: E4~500 + G4^500,
500,
500: F4~500 + A4^500 + E5/500,
500: F5/500,
500: G4~500 + B4^500 + E5/500,
500: G4~500 + B4^500 + D5/500`

setLegend(
  [boxLeft, bitmap`
................
................
..00000000000000
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
..00000000000000
................
................`],
  [boxCenter, bitmap`
................
................
0000000000000000
................
................
................
................
................
................
................
................
................
................
0000000000000000
................
................`],
  [boxRight, bitmap`
................
................
00000000000000..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
.............0..
00000000000000..
................
................`],
  [boxLeftSelected, bitmap`
................
.555555555555555
.5..............
.5..............
.5..............
.5..............
.5..............
.5..............
.5..............
.5..............
.5..............
.5..............
.5..............
.5..............
.555555555555555
................`],
  [boxCenterSelected, bitmap`
................
5555555555555555
................
................
................
................
................
................
................
................
................
................
................
................
5555555555555555
................`],
  [boxRightSelected, bitmap`
................
555555555555555.
..............5.
..............5.
..............5.
..............5.
..............5.
..............5.
..............5.
..............5.
..............5.
..............5.
..............5.
..............5.
555555555555555.
................`],
  [minesweeperTileA, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [minesweeperTileB, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [minesweeperBlankA, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [minesweeperBlankB, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [minesweeperBoard, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [flagIcon, bitmap`
................
................
...........3....
.........333....
....33333333....
.....3333333....
......333333....
.......33333....
.........333....
..........33....
...........0....
...........0....
.......000000...
......00000000..
................
................`],
  [minesweeperOne, bitmap`
1111111111111111
1111111111111111
1122222222222211
1122222222222211
1122333333332211
1122322222232211
1122322222232211
1122322222232211
1122322222232211
1122322222232211
1122322222232211
1122333333332211
1122222222222211
1122222222222211
1111111111111111
1111111111111111`]
)

const levels = [
  map`
.....
.lcr.
.lcr.
.lcr.`,
  map`
gggggggggggggggggggg
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
ggg................g
gggggggggggggggggggg`
]

var currentSong;
function initializeLevel(level) {
  clearText()
  switch (level) {
    case 0:
      setMap(levels[0])
      addText("MINESWEEPER", {
        x: 4,
        y: 2,
        color: color`0`
      })
      addText("PLAY", {
        x: 8,
        y: 5,
        color: color`0`
      })
      addText("SETTINGS", {
        x: 6,
        y: 9,
        color: color`0`
      })
      addText("CREDITS", {
        x: 6,
        y: 13,
        color: color`0`
      })
      var selected = 0
      const playback = playTune(menuSong, Infinity)
      onInput("w", () => {
        getAll(boxLeftSelected).forEach((selector) =>
          selector.remove()
        )
        getAll(boxCenterSelected).forEach((selector) =>
          selector.remove()
        )
        getAll(boxRightSelected).forEach((selector) =>
          selector.remove()
        )
        selected = Math.max(selected - 1, 0)
        addSprite(1, selected + 1, boxLeftSelected)
        addSprite(2, selected + 1, boxCenterSelected)
        addSprite(3, selected + 1, boxRightSelected)

      })
      onInput("s", () => {
        getAll(boxLeftSelected).forEach((selector) =>
          selector.remove()
        )
        getAll(boxCenterSelected).forEach((selector) =>
          selector.remove()
        )
        getAll(boxRightSelected).forEach((selector) =>
          selector.remove()
        )
        selected = Math.min(selected + 1, 2)
        addSprite(1, selected + 1, boxLeftSelected)
        addSprite(2, selected + 1, boxCenterSelected)
        addSprite(3, selected + 1, boxRightSelected)
      })
    case 1:
      setMap(levels[1])
  }
}
initializeLevel(1)
