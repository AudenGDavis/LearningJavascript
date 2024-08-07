document.getElementById('connectButton').addEventListener("click", onConnectClick)
document.getElementById('sendCommandButton').addEventListener("click", sendReport)

let hidDevice

async function onConnectClick() {

    let devices = await navigator.hid.getDevices()
    devices.forEach(async (device) => {
        if(!device.opened){
            await device.open()
        }
        hidDevice = device
        hidDevice.addEventListener("inputreport", getDeviceReport);


    })


}

function getDeviceReport(e){
    console.log(new Uint8Array(e.data.buffer))
    console.log(fromPacketToHexStringArray(new Uint8Array(e.data.buffer)))
    console.log(fromHexStringArrayToString(fromPacketToHexStringArray(new Uint8Array(e.data.buffer))))
}

function sendReport(){
    const reportId = 0x00
    //AA0081040155180384081803810100820114 = display message
    var hexArray = fromStringToHexStringArray("AA0081040155180384081803810100820114") 
    const packets = fromHexStringArrayToPackets(hexArray)//new Uint8Array([0, 18, 170, 0, 129, 4, 1, 85, 24, 3, 132, 8, 24, 3, 129, 1, 0, 130, 1, 21])
    for(let i = 0; i < packets.length; i++){
        hidDevice.sendReport(0, packets[i])
    }
}

function fromHexStringArrayToPackets(hexStringArray){
    var returnHexIntPackets = new Array()
    if(hexStringArray.length<= 62)
    {
        // process single packet
        var returnHexIntPacket = new Uint8Array(64)

        returnHexIntPacket[0] = 0
        returnHexIntPacket[1] = hexStringArray.length
        for(let i = 0; i < 62; i++)
        {
            if(i < hexStringArray.length){
                returnHexIntPacket[2+i] = parseInt(hexStringArray[i], 16)
            } else {
                returnHexIntPacket[2+i] = 0
            }
        }

        returnHexIntPackets.push(returnHexIntPacket)
    }

    return returnHexIntPackets
}

function fromStringToHexStringArray(commandString){
    if(commandString.length % 2 != 0){
        return null
    }

    let hexArray2 = []

    for(let i = 0; i < commandString.length; i+=2){
        hexArray2.push("0x"+commandString[i] + commandString[i+1])
    }
    return hexArray2;
}

function fromPacketToHexStringArray(packet){
    returnArray = []
    for(let i = 0; i < packet.length; i++){
        if(packet[i] == 0){
            returnArray.push("00")
        } else {
        returnArray.push(packet[i].toString(16))
        }
    }
    return returnArray
}

function fromHexStringArrayToString(hexStringArray){
    returnString = ""
    for(let i = 0; i < hexStringArray.length;i++){
        returnString += hexStringArray[i]
    }
    return returnString
}