"use strict";

console.log(parseV5("00000100"))
console.log(window)

function parseV5(packet){
    //check for null
    if(packet == null){
        return "nothing there"
        //return null
    }
    var packetString = packet.replace(/\s+/g, '')
    //check for length
    if(packetString.length<6){
        return "too short"
        //return null
    }

    var length = parseInt(packetString.substring(4,6),16)

    //check if packetString is too short for given length
    if(packetString.length<6+length){
        return "too short for given length"
        //return null
    }
    var returnString = packetString.substring(6,7+length*2)  
    return {ReturnCode: packetString.substring(2,4), Data: returnString}
}

