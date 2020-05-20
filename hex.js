const msgpack = require('msgpack-lite')

const dataStr = "\\x88\\xa3Uid\\xb5denasand_ioslcm_13842\\xacRealNameSign\\x01\\xa2Id\\xa266\\xaeOnlineTimeData\\x92\\x83\\xa4Date\\xa92020-5-11\\xa8Duration\\xcc\\xe6\\xb0XXX_unrecognized\\xc0\\x83\\xa4Date\\xa92020-5-12\\xa8Duration\\xcd\\x101\\xb0XXX_unrecognized\\xc0\\xa9AuthCount\\xc0\\xa8AuthTime\\xc0\\xafTotalOnlineTime\\xcd\\x11\\x17\\xb0XXX_unrecognized\\xc0"

const hex = {
    splitXNN: hexStr => {
        let i = 0
        let arr = []
        while (true) {
            let char = hexStr[i]
            if (char == "\\") {
                let word = char
                for (let j = 1; j <= 3; j++) {
                    i++
                    word += hexStr[i]
                }
                word = word.replace('\\x', '0x')
                arr.push(parseInt(word, 16))
                i++
            } else {
                let b = Buffer.from(char)
                arr.push(b[0])
                i++
            }

            if (i > hexStr.length - 1) break
        }
        return arr
    }
}

let fixed = hex.splitXNN(dataStr)
console.log(fixed)

let buf = Buffer.from(fixed)
let d = msgpack.decode(buf)
console.log(d)
console.log(typeof (d))