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
const minesweeperSelectA = "s"
const minesweeperSelectB = "S"
const minesweeperTileRingA = "p"
const minesweeperTileRingB = "P"
const minesweeperBlankRingA = "k"
const minesweeperBlankRingB = "K"
const minesweeperOneA = "1"
const minesweeperTwoA = "2"
const minesweeperThreeA = "3"
const minesweeperFourA = "4"
const minesweeperFiveA = "5"
const minesweeperSixA = "6"
const minesweeperSevenA = "7"
const minesweeperEightA = "8"
const flagIconA = "f"
const flagIconB = "F"

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
const movement = tune`
500: C4~500,
15500`

// 0 -> Unopened
// 1 -> Opened
// -1 -> Flagged
const currentBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]


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
................
................
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
..444444444444..
................
................`],
  [minesweeperTileB, bitmap`
................
................
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
................
................`],
  [minesweeperBlankA, bitmap`
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
  [minesweeperBlankB, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [minesweeperSelectA, bitmap`
6666666666666666
6666666666666666
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
66............66
6666666666666666
6666666666666666`],
  [minesweeperSelectB, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FF............FF
FF............FF
FF............FF
FF............FF
FF............FF
FF............FF
FF............FF
FF............FF
FF............FF
FF............FF
FF............FF
FF............FF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [minesweeperTileRingA, bitmap`
4444444444444444
4444444444444444
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
44............44
4444444444444444
4444444444444444`],
  [minesweeperTileRingB, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [minesweeperBlankRingA, bitmap`
1111111111111111
1111111111111111
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
1111111111111111
1111111111111111`],
  [minesweeperBlankRingB, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [minesweeperBoard, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [flagIconA, bitmap`
4444444444444444
4444444444444444
4444444444344444
4444444433344444
4443333333344444
4444333333344444
4444433333344444
4444443333344444
4444444433344444
4444444443344444
4444444444044444
4444444444044444
4444440000004444
4444400000000444
4444444444444444
4444444444444444`],
  [flagIconB, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDD3DDDDD
DDDDDDDD333DDDDD
DDD33333333DDDDD
DDDD3333333DDDDD
DDDDD333333DDDDD
DDDDDD33333DDDDD
DDDDDDDD333DDDDD
DDDDDDDDD33DDDDD
DDDDDDDDDD0DDDDD
DDDDDDDDDD0DDDDD
DDDDDD000000DDDD
DDDDD00000000DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [minesweeperOneA, bitmap`
................
................
..111111111111..
..111117711111..
..111117711111..
..111117711111..
..111117711111..
..111117711111..
..111117711111..
..111117711111..
..111117711111..
..111117711111..
..111117711111..
..111111111111..
................
................`],
  [minesweeperTwoA, bitmap`
................
................
..111111111111..
..1DDDDDDDDDD1..
..1DDDDDDDDDD1..
..111111111DD1..
..111111111DD1..
..1DDDDDDDDDD1..
..1DDDDDDDDDD1..
..1DD111111111..
..1DD111111111..
..1DDDDDDDDDD1..
..1DDDDDDDDDD1..
..111111111111..
................
................`],
  [minesweeperThreeA, bitmap`
................
................
..111111111111..
..1CCCCCCCCCC1..
..1CCCCCCCCCC1..
..111111111CC1..
..111111111CC1..
..1CCCCCCCCCC1..
..1CCCCCCCCCC1..
..111111111CC1..
..111111111CC1..
..1CCCCCCCCCC1..
..1CCCCCCCCCC1..
..111111111111..
................
................`],
  [minesweeperFourA, bitmap`
................
................
..111111111111..
..1HH111111HH1..
..1HH111111HH1..
..1HH111111HH1..
..1HH111111HH1..
..1HHHHHHHHHH1..
..1HHHHHHHHHH1..
..111111111HH1..
..111111111HH1..
..111111111HH1..
..111111111HH1..
..111111111111..
................
................`],
  [minesweeperFiveA, bitmap`
................
................
..111111111111..
..199999999991..
..199999999991..
..191111111111..
..191111111111..
..199999999991..
..199999999991..
..111111111991..
..111111111991..
..199999999991..
..199999999991..
..111111111111..
................
................`],
  [minesweeperSixA, bitmap`
................
................
..111111111111..
..155555555551..
..155555555551..
..155111111111..
..155111111111..
..155555555551..
..155555555551..
..155111111551..
..155111111551..
..155555555551..
..155555555551..
..111111111111..
................
................`],
  [minesweeperSevenA, bitmap`
................
................
..111111111111..
..188888888881..
..188888888881..
..111111111881..
..111111111881..
..111111188111..
..111111188111..
..111118811111..
..111118811111..
..111881111111..
..111881111111..
..111111111111..
................
................`],
  [minesweeperEightA, bitmap`
................
................
..111111111111..
..133333333331..
..133333333331..
..133111111331..
..133111111331..
..133333333331..
..133333333331..
..133111111331..
..133111111331..
..133333333331..
..133333333331..
..111111111111..
................
................`],
)

const levels = [
  map`
.....
.lcr.
.lcr.
.lcr.`,
  map`
gggggggggggggggggggg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggg..............gg
gggggggggggggggggggg`
]

var currentSong;

function initializeLevel(level) {
  clearText()
  if (level == 0) {
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
      playTune(movement)
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
      playTune(movement)
    })
  } else if (level = 1) {
    var selectedPosition = { x: 7, y: 7 }
    setMap(levels[1])
    for (let x = 0; x < 14; x++) {
      for (let y = 0; y < 14; y++) {
        if ((y + (x % 2)) % 2 == 0) {
          addSprite(4 + x, 1 + y, minesweeperTileA)
          addSprite(4 + x, 1 + y, minesweeperTileRingA)
        } else {
          addSprite(4 + x, 1 + y, minesweeperTileRingB)
          addSprite(4 + x, 1 + y, minesweeperTileB)
        }
      }
    }
    addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
    onInput("w", () => {
      if (selectedPosition.y > 0) {
        selectedPosition.y--      
        getAll(minesweeperSelectA).forEach((selector) =>
          selector.remove()
        )
        addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
      playTune(movement)
    })
    onInput("s", () => {
      if (selectedPosition.y < 13) {
        selectedPosition.y++
        getAll(minesweeperSelectA).forEach((selector) =>
          selector.remove()
        )
        addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
      playTune(movement)
    })
    onInput("a", () => {
      if (selectedPosition.x > 0) {
        selectedPosition.x--
        getAll(minesweeperSelectA).forEach((selector) =>
          selector.remove()
        )
        addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
      playTune(movement)
    })
    onInput("d", () => {
      if (selectedPosition.x < 13) {
        selectedPosition.x++
        getAll(minesweeperSelectA).forEach((selector) =>
          selector.remove()
        )
        addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
      playTune(movement)
    })
    onInput("i", () => {
      if (currentBoard[selectedPosition.x][selectedPosition.y] == 0) {
        clearTile(4 + selectedPosition.x, 1 + selectedPosition.y)
        currentBoard[selectedPosition.x][selectedPosition.y] = -1
        if ((selectedPosition.y + (selectedPosition.x % 2)) % 2 == 0) {
          addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileRingA)
          addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, flagIconA)

        } else {
          addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileRingB)
          addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, flagIconB)
        }
        addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      } else if (currentBoard[selectedPosition.x][selectedPosition.y] == -1) {
        clearTile(4 + selectedPosition.x, 1 + selectedPosition.y)
        currentBoard[selectedPosition.x][selectedPosition.y] = 0
        if ((selectedPosition.y + (selectedPosition.x % 2)) % 2 == 0) {
          addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileRingA)
          addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileA)

        } else {
          addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileRingB)
          addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileB)
        }
        addSprite(4 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
    })

  }
}
initializeLevel(0)
