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
const minesweeperBoard = "g"
const minesweeperSelectA = "s"
const minesweeperSelectB = "S"
const minesweeperTileRingA = "p"
const minesweeperTileRingB = "P"
const minesweeperBlankRingA = "k"
const minesweeperBlankRingB = "K"
const minesweeper0A = "0"
const minesweeper1A = "1"
const minesweeper2A = "2"
const minesweeper3A = "3"
const minesweeper4A = "4"
const minesweeper5A = "5"
const minesweeper6A = "6"
const minesweeper7A = "7"
const minesweeper8A = "8"
const minesweeper0B = ")"
const minesweeper1B = "!"
const minesweeper2B = "@"
const minesweeper3B = "#"
const minesweeper4B = "$"
const minesweeper5B = "%"
const minesweeper6B = "^"
const minesweeper7B = "&"
const minesweeper8B = "("
const timeIcon = "<"
const bombIconA = "["
const bombIconB = "]"
const flagIconA = "f"
const flagIconB = "F"
const flagIconC = ">"
const bombIconC = "?"
const minesweeperWhiteBoard = "G"
const minesweeperGrayBoard = "y"

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
const gameSong = tune`
500: E5~500,
500: E5~500,
500: F5~500,
500: F5~500,
500: G5~500,
500: G5~500 + E4~500,
500: F4~500,
500: G4~500,
500: G5~500,
500: G5~500,
500: F5~500,
500: F5~500,
500: E5~500,
500: E5~500 + G4~500,
500: F4~500,
500: E4~500,
500: E5~500,
500: E5~500,
500: F5~500,
500: F5~500,
500: G5~500,
500: G5~500 + E4~500,
500: F4~500,
500: G4~500,
500: E5~500,
500: E5~500,
500: D5~500,
500: D5~500,
500: C5~500,
500: C5~500 + F4~500,
500: E4~500,
500: D4~500`
const movement = tune`
500: C4~500,
15500`
const confirm = tune`
125: E5^125,
125: C5^125,
125: G5^125,
3625`
const placeFlag = tune`
125: G5^125,
125: G5^125,
3750`
const removeFlag = tune`
125: G5^125,
125: F5^125,
3750`

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
  [minesweeperWhiteBoard, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [minesweeper0A, bitmap`
................
................
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..
................
................`],
  [minesweeper0B, bitmap`
................
................
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
................
................`],
  [minesweeper1A, bitmap`
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
  [minesweeper2A, bitmap`
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
  [minesweeper3A, bitmap`
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
  [minesweeper4A, bitmap`
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
  [minesweeper5A, bitmap`
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
  [minesweeper6A, bitmap`
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
  [minesweeper7A, bitmap`
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
  [minesweeper8A, bitmap`
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
  [minesweeper1B, bitmap`
................
................
..LLLLLLLLLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLL77LLLLL..
..LLLLLLLLLLLL..
................
................`],
  [minesweeper2B, bitmap`
................
................
..LLLLLLLLLLLL..
..LDDDDDDDDDDL..
..LDDDDDDDDDDL..
..LLLLLLLLLDDL..
..LLLLLLLLLDDL..
..LDDDDDDDDDDL..
..LDDDDDDDDDDL..
..LDDLLLLLLLLL..
..LDDLLLLLLLLL..
..LDDDDDDDDDDL..
..LDDDDDDDDDDL..
..LLLLLLLLLLLL..
................
................`],
  [minesweeper3B, bitmap`
................
................
..LLLLLLLLLLLL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LLLLLLLLLCCL..
..LLLLLLLLLCCL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LLLLLLLLLCCL..
..LLLLLLLLLCCL..
..LCCCCCCCCCCL..
..LCCCCCCCCCCL..
..LLLLLLLLLLLL..
................
................`],
  [minesweeper4B, bitmap`
................
................
..LLLLLLLLLLLL..
..LHHLLLLLLHHL..
..LHHLLLLLLHHL..
..LHHLLLLLLHHL..
..LHHLLLLLLHHL..
..LHHHHHHHHHHL..
..LHHHHHHHHHHL..
..LLLLLLLLLHHL..
..LLLLLLLLLHHL..
..LLLLLLLLLHHL..
..LLLLLLLLLHHL..
..LLLLLLLLLLLL..
................
................`],
  [minesweeper5B, bitmap`
................
................
..LLLLLLLLLLLL..
..L9999999999L..
..L9999999999L..
..L9LLLLLLLLLL..
..L9LLLLLLLLLL..
..L9999999999L..
..L9999999999L..
..LLLLLLLLL99L..
..LLLLLLLLL99L..
..L9999999999L..
..L9999999999L..
..LLLLLLLLLLLL..
................
................`],
  [minesweeper6B, bitmap`
................
................
..LLLLLLLLLLLL..
..L5555555555L..
..L5555555555L..
..L55LLLLLLLLL..
..L55LLLLLLLLL..
..L5555555555L..
..L5555555555L..
..L55LLLLLL55L..
..L55LLLLLL55L..
..L5555555555L..
..L5555555555L..
..LLLLLLLLLLLL..
................
................`],
  [minesweeper7B, bitmap`
................
................
..LLLLLLLLLLLL..
..L8888888888L..
..L8888888888L..
..LLLLLLLLL88L..
..LLLLLLLLL88L..
..LLLLLLL88LLL..
..LLLLLLL88LLL..
..LLLLL88LLLLL..
..LLLLL88LLLLL..
..LLL88LLLLLLL..
..LLL88LLLLLLL..
..LLLLLLLLLLLL..
................
................`],
  [minesweeper8B, bitmap`
................
................
..LLLLLLLLLLLL..
..L3333333333L..
..L3333333333L..
..L33LLLLLL33L..
..L33LLLLLL33L..
..L3333333333L..
..L3333333333L..
..L33LLLLLL33L..
..L33LLLLLL33L..
..L3333333333L..
..L3333333333L..
..LLLLLLLLLLLL..
................
................`],
  [bombIconA, bitmap`
................
................
..111000000111..
..100000000001..
..100000000001..
..000300003000..
..000030030000..
..000003300000..
..000003300000..
..000030030000..
..000300003000..
..100000000001..
..100000000001..
..111000000111..
................
................`],
  [bombIconB, bitmap`
................
................
..LLL000000LLL..
..L0000000000L..
..L0000000000L..
..000300003000..
..000030030000..
..000003300000..
..000003300000..
..000030030000..
..000300003000..
..L0000000000L..
..L0000000000L..
..LLL000000LLL..
................
................`],
  [flagIconC, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL3LLLLL
LLLLLLLL333LLLLL
LLL33333333LLLLL
LLLL3333333LLLLL
LLLLL333333LLLLL
LLLLLL33333LLLLL
LLLLLLLL333LLLLL
LLLLLLLLL33LLLLL
LLLLLLLLLL0LLLLL
LLLLLLLLLL0LLLLL
LLLLLL000000LLLL
LLLLL00000000LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [timeIcon, bitmap`
LLLLLLLLLLLLLLLL
LLLLLL66666LLLLL
LLLLLLL666LLLLLL
LLLLL6666666LLLL
LLLL666606666LLL
LLL66666066666LL
LL6666660666666L
LL6666660666666L
LL6666660666666L
LL6666660666666L
LL6666606666666L
LL6666066666666L
LL6660666666666L
LLL66666666666LL
LLLL666666666LLL
LLLLL6666666LLLL`],
  [bombIconC, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL000000LLLLL
LLL0000000000LLL
LLL0000000000LLL
LL000300003000LL
LL000030030000LL
LL000003300000LL
LL000003300000LL
LL000030030000LL
LL000300003000LL
LLL0000000000LLL
LLL0000000000LLL
LLLLL000000LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [minesweeperGrayBoard, bitmap`
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
1111111111111111`]
)

const levels = [
  map`
.....
.lcr.
.lcr.
.lcr.`,
  map`
<gggGGGGGGGGGGGGGGGG
>gggG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyG..............G
yyyyGGGGGGGGGGGGGGGG`
]

var currentSong;
var currentLevel;
var selectedPosition = { x: 7, y: 7 }
var generatedLevel;
var selected = null

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

// generate 14x14
function generateLevel(x, y) {
  // CONFIG
  // Number of mines
  const totalMines = 42
  // Do not spawn mines within this radius of x and y
  const radius = 2

  var generatedBoard = [
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
  var mineLocations = []


  for (var i = 0; i < totalMines; i++) {
    var location = [Math.floor(Math.random() * 14), Math.floor(Math.random() * 14)]
    while (calcDistance(location[0], location[1], x, y) < radius || generatedBoard[location[0]][location[1]] == -1) {
      location = [Math.floor(Math.random() * 14), Math.floor(Math.random() * 14)]
    }
    generatedBoard[location[0]][location[1]] = -1
    mineLocations.push(location)
  }
  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]
  mineLocations.forEach((mine) => {
    neighbors.forEach((loc) => {
      if (!(mine[0] + loc[0] > 13 || mine[0] + loc[0] < 0 || mine[1] + loc[1] > 13 || mine[1] + loc[1] < 0 || generatedBoard[mine[0] + loc[0]][mine[1] + loc[1]] == -1)) {
        generatedBoard[mine[0] + loc[0]][mine[1] + loc[1]]++
      }
    })
  })
  return generatedBoard
}
console.log(generateLevel(7, 7))

function initializeLevel(level) {
  currentLevel = level;
  clearText()
  try { currentSong.end() } catch {}
  getAll().forEach((element) => {
    element.remove();
  })
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
    //currentSong = playTune(menuSong, Infinity)
  } else if (level = 1) {
    //currentSong = playTune(gameSong, Infinity)
    setMap(levels[1])
    for (let x = 0; x < 14; x++) {
      for (let y = 0; y < 14; y++) {
        if ((y + (x % 2)) % 2 == 0) {
          addSprite(5 + x, 1 + y, minesweeperTileA)
          addSprite(5 + x, 1 + y, minesweeperTileRingA)
        } else {
          addSprite(5 + x, 1 + y, minesweeperTileRingB)
          addSprite(5 + x, 1 + y, minesweeperTileB)
        }
      }
    }
    addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
  }
}
initializeLevel(0)

    onInput("w", () => {
      if (currentLevel != 0) return;
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
      if (currentLevel != 0) return;
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
    onInput("k", () => {
      if (currentLevel != 0) return;
      if (selected == 0) {
        playTune(confirm)
        initializeLevel(1)
      }
    })
onInput("w", () => {
      if (currentLevel != 1) return;
      if (selectedPosition.y > 0) {
        selectedPosition.y--
        getAll(minesweeperSelectA).forEach((selector) =>
          selector.remove()
        )
        addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
      playTune(movement)
    })
    onInput("s", () => {
      if (currentLevel != 1) return;
      if (selectedPosition.y < 13) {
        selectedPosition.y++
        getAll(minesweeperSelectA).forEach((selector) =>
          selector.remove()
        )
        addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
      playTune(movement)
    })
    onInput("a", () => {
      if (currentLevel != 1) return;
      if (selectedPosition.x > 0) {
        selectedPosition.x--
        getAll(minesweeperSelectA).forEach((selector) =>
          selector.remove()
        )
        addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
      playTune(movement)
    })
    onInput("d", () => {
      if (currentLevel != 1) return;
      if (selectedPosition.x < 13) {
        selectedPosition.x++
        getAll(minesweeperSelectA).forEach((selector) =>
          selector.remove()
        )
        addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
      playTune(movement)
    })
    onInput("i", () => {
      if (currentLevel != 1) return;
      if (currentBoard[selectedPosition.x][selectedPosition.y] == 0) {
        playTune(placeFlag)
        clearTile(5 + selectedPosition.x, 1 + selectedPosition.y)
        currentBoard[selectedPosition.x][selectedPosition.y] = -1
        if ((selectedPosition.y + (selectedPosition.x % 2)) % 2 == 0) {
          addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileRingA)
          addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, flagIconA)

        } else {
          addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileRingB)
          addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, flagIconB)
        }
        addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      } else if (currentBoard[selectedPosition.x][selectedPosition.y] == -1) {
        playTune(removeFlag)
        clearTile(5 + selectedPosition.x, 1 + selectedPosition.y)
        currentBoard[selectedPosition.x][selectedPosition.y] = 0
        if ((selectedPosition.y + (selectedPosition.x % 2)) % 2 == 0) {
          addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileRingA)
          addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileA)

        } else {
          addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileRingB)
          addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperTileB)
        }
        addSprite(5 + selectedPosition.x, 1 + selectedPosition.y, minesweeperSelectA)
      }
    })
    onInput("j", () => {
      if (currentLevel != 1) return;
      if (!generatedLevel) {
        generatedLevel = generateLevel(selectedPosition.x, selectedPosition.y)
        for (let x = 0; x < 14; x++) {
          for (let y = 0; y < 14; y++) {
            if ((y + (x % 2)) % 2 == 0) {
              clearTile(5+x,1+y)
              if (generatedLevel[x][y] == -1) {
                addSprite(5 + x, 1 + y, bombIconA)
              } else if (generatedLevel[x][y] == 0) {
                addSprite(5 + x, 1 + y, minesweeper0A)
              } else if (generatedLevel[x][y] == 1) {
                addSprite(5 + x, 1 + y, minesweeper1A)
              } else if (generatedLevel[x][y] == 2) {
                addSprite(5 + x, 1 + y, minesweeper2A)
              } else if (generatedLevel[x][y] == 3) {
                addSprite(5 + x, 1 + y, minesweeper3A)
              } else if (generatedLevel[x][y] == 4) {
                addSprite(5 + x, 1 + y, minesweeper4A)
              } else if (generatedLevel[x][y] == 5) {
                addSprite(5 + x, 1 + y, minesweeper5A)
              } else if (generatedLevel[x][y] == 6) {
                addSprite(5 + x, 1 + y, minesweeper6A)
              } else if (generatedLevel[x][y] == 7) {
                addSprite(5 + x, 1 + y, minesweeper7A)
              } else if (generatedLevel[x][y] == 8) {
                addSprite(5 + x, 1 + y, minesweeper8A)
              }
              addSprite(5 + x, 1 + y, minesweeperBlankRingA)
            } else {
              clearTile(5+x,1+y)
              if (generatedLevel[x][y] == -1) {
                addSprite(5 + x, 1 + y, bombIconB)
              } else if (generatedLevel[x][y] == 0) {
                addSprite(5 + x, 1 + y, minesweeper0B)
              } else if (generatedLevel[x][y] == 1) {
                addSprite(5 + x, 1 + y, minesweeper1B)
              } else if (generatedLevel[x][y] == 2) {
                addSprite(5 + x, 1 + y, minesweeper2B)
              } else if (generatedLevel[x][y] == 3) {
                addSprite(5 + x, 1 + y, minesweeper3B)
              } else if (generatedLevel[x][y] == 4) {
                addSprite(5 + x, 1 + y, minesweeper4B)
              } else if (generatedLevel[x][y] == 5) {
                addSprite(5 + x, 1 + y, minesweeper5B)
              } else if (generatedLevel[x][y] == 6) {
                addSprite(5 + x, 1 + y, minesweeper6B)
              } else if (generatedLevel[x][y] == 7) {
                addSprite(5 + x, 1 + y, minesweeper7B)
              } else if (generatedLevel[x][y] == 8) {
                addSprite(5 + x, 1 + y, minesweeper8B)
              }
              addSprite(5 + x, 1 + y, minesweeperBlankRingB)
            }
          }
        }
      }
    })
    onInput("l", () => {
      if (currentLevel != 1) return;
      playTune(confirm)
      initializeLevel(0)
    })
