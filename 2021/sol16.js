var fs = require('fs');

const DEBUG = false;
const NUMBER = 16;
const FILE = DEBUG ? './sample' + NUMBER : './input' + NUMBER;

const convert = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
}

function parse_packet(bin, start) {
  let v = bin.substr(start,3);
  let t = bin.substr(start+3,3);

  let vv = parseInt(v,2);
  let tt = parseInt(t,2);

  //console.log("parsing", vv, tt, start);

  if (tt == 4) {
    // literal
    let literal = "";
    let cur = start + 6;
    while (true) {
      let group = bin.substr(cur, 5);

      literal += group.substr(1,4);
      cur = cur + 5;

      if (group[0] == '0') {
        break;
      }
    }

    //console.log("literal", parseInt(literal,2));
    return {
      v: vv,
      t: tt,
      type: 'literal',
      val: parseInt(literal, 2),
      end: cur,
    }
  } else {
    // operator
    let length_type_id = bin[start + 6];
    if (length_type_id == '0') {
      // 15 bits forward
      let len_bin = bin.substr(start + 7, 15);
      let length = parseInt(len_bin, 2);
      let cur = start + 8 + 14;

      let substr = bin.substr(cur, length);

      let sub_packets = [];
      let cur_sub = 0;
      while (cur_sub < length) {
        let next = parse_packet(substr, cur_sub);
        sub_packets.push(next);
        cur_sub = next.end;
      }

      return {
        v: vv,
        t: tt,
        type: 'operator',
        length_type: 'length',
        length: length,
        sub_packets: sub_packets,
        end: cur + length,
      }
    } else {
      // 11 bits are the number of contained packets
      let packets_bin = bin.substr(start + 7, 11);
      let num_packets = parseInt(packets_bin, 2);

      //console.log(packets_bin, num_packets);

      let cur = start + 7 + 11;

      let sub_packets = [];
      for (let i = 0; i < num_packets; i++) {
        let sub_packet = parse_packet(bin, cur);
        sub_packets.push(sub_packet);
        cur = sub_packet.end;
      }

      return {
        v: vv,
        t: tt,
        type: 'operator',
        length_type: 'length',
        num_packets: num_packets,
        sub_packets: sub_packets,
        end: cur,
      }
    }
  }
}

function traverse(packet) {
  if (packet.type == 'literal') {
    return packet.v;
  } else if (packet.type == 'operator') {
    let sum = packet.v;
    for (let sub of packet.sub_packets) {
      sum += traverse(sub);
    }
    return sum;
  }
  return packet.v;
}

function part2(packet) {
  if (packet.type == 'literal') {
    return packet.val;
  } else if (packet.type == 'operator') {
    if (packet.t == 0) { // sum
      let sum = 0;
      for (let sub of packet.sub_packets) {
        sum += part2(sub);
      }
      return sum;
    }
    if (packet.t == 1) { // product
      let sum = 1;
      for (let sub of packet.sub_packets) {
        sum *= part2(sub);
      }
      return sum;
    }
    if (packet.t == 2) { // min
      let res = undefined;
      for (let sub of packet.sub_packets) {
        let val = part2(sub);
        if (res === undefined || val < res) {
          res = val;
        }
      }
      return res;
    }
    if (packet.t == 3) { // max
      let res = undefined;
      for (let sub of packet.sub_packets) {
        let val = part2(sub);
        if (res === undefined || val > res) {
          res = val;
        }
      }
      return res;
    }
    if (packet.t == 5) { // gt
      let a = part2(packet.sub_packets[0]);
      let b = part2(packet.sub_packets[1]);
      if (a > b) {
        return 1;
      } else {
        return 0;
      }
    }
    if (packet.t == 6) { // lt
      let a = part2(packet.sub_packets[0]);
      let b = part2(packet.sub_packets[1]);
      if (a < b) {
        return 1;
      } else {
        return 0;
      }
    }
    if (packet.t == 7) { // =
      let a = part2(packet.sub_packets[0]);
      let b = part2(packet.sub_packets[1]);
      if (a == b) {
        return 1;
      } else {
        return 0;
      }
    }
    throw ":(";
  }
}

function run() {
  let data = readFileFlat(FILE)[0];

  let bin = "";
  for (let i of data.split('')){ 
    bin+=convert[i];
  }
  console.log(data, bin);

  let packet = parse_packet(bin, 0);

  console.log(packet);

  console.log(part2(packet))
}

function readFileFlat(file) {
  let data = fs.readFileSync(file).toString();
  return data.split('\r\n');
}

run();