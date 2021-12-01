var fs = require('fs');

function perform(loop_size, subject) {
    let val = 1;
    for (let i = 0; i < loop_size; i++) {
        val = (val * subject) % 20201227;
    }
    return val;
}

function f() {
    let a = 9093927;
    let b = 11001876;
    
    // handshake
    /*let card_secret_loop = undefined; // ?
    let card_pub_key = perform(card_secret_loop, 7);

    let door_secret_loop = undefined;
    let door_pub_key = perform(door_secret_loop, 7);

    let card_encryption_key = perform(card_secret_loop, door_pub_key);
    let door_encryption_key = perform(door_secret_loop, card_pub_key);*/

    /*let derive_card_loop = (card_pub) => {
        let loop = 0;
        while (perform(loop, 7) != card_pub) {
            loop++;
        }
        return loop;
    }

    let card_secret_loop = derive_card_loop(a);
    //let door_secret_loop = derive_card_loop(b);*/

    let card_secret_loop = 4535884;
    //let door_secret_loop = 

    console.log(perform(4535884, b));

    console.log(":)");
}

f();