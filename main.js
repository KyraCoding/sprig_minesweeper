/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Minesweeper
@author: KyraCoding/MrMeCoding
@tags: ["game"]
@addedOn: 2024-00-00
*/

// CONFIG
// Number of mines
const totalMines = 33
// Do not spawn mines within this radius of x and y
const radius = 3


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
const zero = "零"
const one = "一"
const two = "二"
const three = "三"
const four = "四"
const five = "五"
const six = "六"
const seven = "七"
const eight = "八"
const nine = "九"

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
const reveal = tune`
125: G5/125,
125: G5/125,
3750`

// 0 -> Unopened
// 1 -> Opened
// -1 -> Flagged
var currentBoard = [
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
..331111111133..
..333111111333..
..133311113331..
..113331133311..
..111333333111..
..111133331111..
..111133331111..
..111333333111..
..113331133311..
..133311113331..
..333111111333..
..331111111133..
................
................`],
  [bombIconB, bitmap`
................
................
..33LLLLLLLL33..
..333LLLLLL333..
..L333LLLL333L..
..LL333LL333LL..
..LLL333333LLL..
..LLLL3333LLLL..
..LLLL3333LLLL..
..LLL333333LLL..
..LL333LL333LL..
..L333LLLL333L..
..333LLLLLL333..
..33LLLLLLLL33..
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
LLLLLL6666LLLLLL
LLLLLLL66LLLLLLL
LLLLL666666LLLLL
LLL6666066666LLL
LLL6666066666LLL
LL666660666666LL
LL666660666666LL
LL666660666666LL
LL666666066666LL
LL666666606666LL
LL666666660666LL
LLL6666666666LLL
LLL6666666666LLL
LLLLL666666LLLLL
LLLLLLLLLLLLLLLL`],
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
1111111111111111`],
  [zero, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL2222222222LLL
LLL2222222222LLL
LLL22LLLLLL22LLL
LLL22LLLLLL22LLL
LLL22LLLLLL22LLL
LLL22LLLLLL22LLL
LLL22LLLLLL22LLL
LLL22LLLLLL22LLL
LLL22LLLLLL22LLL
LLL22LLLLLL22LLL
LLL2222222222LLL
LLL2222222222LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [one, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLL22LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [two, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LL22LLLLLLLLLLLL
LL22LLLLLLLLLLLL
LL22LLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [three, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [four, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [five, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LL22LLLLLLLLLLLL
LL22LLLLLLLLLLLL
LL22LLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [six, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LL22LLLLLLLLLLLL
LL22LLLLLLLLLLLL
LL22LLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [seven, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLL22LLLL
LLLLLLLLLL22LLLL
LLLLLLLL22LLLLLL
LLLLLLLL22LLLLLL
LLLLLL22LLLLLLLL
LLLLLL22LLLLLLLL
LLLL22LLLLLLLLLL
LLLL22LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [eight, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL222222222222LL
LL222222222222LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [nine, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL222222222222LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL22LLLLLLLL22LL
LL222222222222LL
LL222222222222LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLL22LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
)

const levels = [
  map`
.....
.lcr.
.lcr.
.lcr.`,
  map`
<零零零GGGGGGGGGGGGGGGG
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
var timerTimeouts = []

const aIcons = [bombIconA, minesweeper0A, minesweeper1A, minesweeper2A, minesweeper3A, minesweeper4A, minesweeper5A, minesweeper6A, minesweeper7A, minesweeper8A]
const bIcons = [bombIconB, minesweeper0B, minesweeper1B, minesweeper2B, minesweeper3B, minesweeper4B, minesweeper5B, minesweeper6B, minesweeper7B, minesweeper8B]
const timeIcons = [zero, one, two, three, four, five, six, seven, eight, nine]

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

// generate 14x14
function generateLevel(x, y) {
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
    selectedPosition = { x: 7, y: 7 }
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

function revealTile(x, y, revealed = new Set()) {
  if (x < 0 || y < 0 || x > 13 || y > 13) {
    return
  }
  if (generatedLevel[x][y] == 0 && !revealed.has(`${x},${y}`)) {
    revealed.add(`${x},${y}`);
    revealTile(x - 1, y - 1, revealed)
    revealTile(x - 1, y, revealed)
    revealTile(x - 1, y + 1, revealed)
    revealTile(x, y + 1, revealed)
    revealTile(x, y - 1, revealed)
    revealTile(x + 1, y - 1, revealed)
    revealTile(x + 1, y, revealed)
    revealTile(x + 1, y + 1, revealed)
  }
  clearTile(5 + x, 1 + y)
  currentBoard[x][y] = 1
  if ((y + (x % 2)) % 2 == 0) {
    addSprite(5 + x, 1 + y, aIcons[generatedLevel[x][y] + 1])
    addSprite(5 + x, 1 + y, minesweeperBlankRingA)
  } else {
    addSprite(5 + x, 1 + y, bIcons[generatedLevel[x][y] + 1])
    addSprite(5 + x, 1 + y, minesweeperBlankRingB)
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
  if (currentBoard[selectedPosition.x][selectedPosition.y] == 1) return;
  if (!generatedLevel) {
    generatedLevel = generateLevel(selectedPosition.x, selectedPosition.y)
    count = 0
    timerTimeouts.push(
      setInterval(function() {
        if (count > 998) return
        count++
        var output = String(count).padStart(3, '0')
        for (var i = 0; i < 3; i++) {
          clearTile(i + 1, 0)
          addSprite(i + 1, 0, timeIcons[output[i]])
        }
      }, 1000)
    )
  }
  playTune(reveal)
  revealTile(selectedPosition.x, selectedPosition.y)
})
onInput("l", () => {
  if (currentLevel != 1) return;
  playTune(confirm)
  generatedLevel = undefined
  currentBoard = [
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
  timerTimeouts.forEach((timeout) => {
    clearInterval(timeout)
  })
  initializeLevel(0)
})
