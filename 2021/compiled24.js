// -- section 1
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 1
// add x 12
// eql x w
vars.x = ((vars.x+12) == digit1) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 7
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (vars.z+(digit1+7))

// -- section 2
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 1
// add x 12
// eql x w
vars.x = ((vars.x+12) == digit2) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 8
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (vars.z+(digit2+8))

// -- section 3
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 1
// add x 13
// eql x w
vars.x = ((vars.x+13) == digit3) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 2
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (vars.z+(digit3+2))

// -- section 4
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 1
// add x 12
// eql x w
vars.x = ((vars.x+12) == digit4) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 11
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (vars.z+(digit4+11))

// -- section 5
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 26
// add x -3
// eql x w
vars.x = ((vars.x+-3) == digit5) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 6
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (Math.floor(vars.z/26)+(digit5+6))

// -- section 6
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 1
// add x 10
// eql x w
vars.x = ((vars.x+10) == digit6) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 12
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (vars.z+(digit6+12))

// -- section 7
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 1
// add x 14
// eql x w
vars.x = ((vars.x+14) == digit7) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 14
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (vars.z+(digit7+14))

// -- section 8
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 26
// add x -16
// eql x w
vars.x = ((vars.x+-16) == digit8) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 13
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (Math.floor(vars.z/26)+(digit8+13))

// -- section 9
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 1
// add x 12
// eql x w
vars.x = ((vars.x+12) == digit9) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 15
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (vars.z+(digit9+15))

// -- section 10
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 26
// add x -8
// eql x w
vars.x = ((vars.x+-8) == digit10) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 10
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (Math.floor(vars.z/26)+(digit10+10))

// -- section 11
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 26
// add x -12
// eql x w
vars.x = ((vars.x+-12) == digit11) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 6
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (Math.floor(vars.z/26)+(digit11+6))

// -- section 12
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 26
// add x -7
// eql x w
vars.x = ((vars.x+-7) == digit12) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 10
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (Math.floor(vars.z/26)+(digit12+10))

// -- section 13
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 26
// add x -6
// eql x w
vars.x = ((vars.x+-6) == digit13) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 8
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (Math.floor(vars.z/26)+(digit13+8))

// -- section 14
// inp w
// mul x 0
// add x z
// mod x 26
vars.x = vars.z % 26
// div z 26
// add x -11
// eql x w
vars.x = ((vars.x+-11) == digit14) ? 1 : 0
// eql x 0
vars.x = (vars.x == 0) ? 1 : 0
// mul y 0
// add y 25
// mul y x
vars.y = vars.x * vars.x
// add y 1
// mul z y
vars.z = vars.x * (25+1)
// mul y 0
// add y w
// add y 5
// mul y x
vars.y = vars.x * vars.x
// add z y
vars.z = (Math.floor(vars.z/26)+(digit14+5))

