function f(digits) {
vars.y = d[0] + 7
vars.z = d[0] + 7
vars.w = d[1];

vars.x = 1
vars.z = 26 * (d[0] + 7)
vars.y = d[1] + 8
vars.z = 26 * (26 * (d[0] + 7) + d[1] + 8)

vars.w = d[2];
vars.x = 1
vars.y = 26
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 2
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[3];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.x = vars.x + 12
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 11
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[4];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.z = Math.floor(vars.z / 26)
vars.x = vars.x + -3
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 6
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[5];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.x = vars.x + 10
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 12
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[6];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.x = vars.x + 14
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 14
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[7];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.z = Math.floor(vars.z / 26)
vars.x = vars.x + -16
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 13
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[8];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.x = vars.x + 12
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 15
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[9];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.z = Math.floor(vars.z / 26)
vars.x = vars.x + -8
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 10
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[10];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.z = Math.floor(vars.z / 26)
vars.x = vars.x + -12
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 6
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[11];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.z = Math.floor(vars.z / 26)
vars.x = vars.x + -7
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 10
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[12];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.z = Math.floor(vars.z / 26)
vars.x = vars.x + -6
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 8
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y

vars.w = d[13];
vars.x = 0
vars.x = vars.x + vars.z
vars.x = vars.x % 26
vars.z = Math.floor(vars.z / 26)
vars.x = vars.x + -11
vars.x = vars.x == vars.w ? 1 : 0
vars.x = vars.x == 0 ? 1 : 0
vars.y = 0
vars.y = vars.y + 25
vars.y = vars.y * vars.x
vars.y = vars.y + 1
vars.z = vars.z * vars.y
vars.y = 0
vars.y = vars.y + vars.w
vars.y = vars.y + 5
vars.y = vars.y * vars.x
vars.z = vars.z + vars.y
return vars.z == 0;
}
