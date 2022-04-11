function open_networkdatabase() {
    let OpenRequest = window.indexedDB.open('PassProtekNetworks',1);
    OpenRequest.onsuccess = function(event){db3 = event.target.result; console.log("Networks DB Opened")}
}

window.onload = function () {
    open_networkdatabase();

    document.getElementById("storeNetwork").onclick = () => {

        if(document.getElementById("networkName").value == "" || document.getElementById("networkIP").value == "") {
            document.getElementById("successful").innerHTML = '<br><div class="alert alert-danger"style="width: 280px;text-align: center; margin: auto"><strong>Please Enter All Details To Continue</strong></div>'
        } 
        else{
            const transaction = db3.transaction("IPaddr","readwrite")
            const networks = transaction.objectStore("IPaddr")
            const nname = document.getElementById("networkName").value;
            const ipaddr = document.getElementById("networkIP").value;
            const profile = {IPaddress: ipaddr,NetworkName: nname,}
            const request = networks.add(profile)
            
            console.log("SUBMIT BUTTON PRESSED")
            request.onsuccess = () => {
                document.getElementById("successful").innerHTML = '<br><div class="alert alert-success"style="width: 280px;text-align: center; margin: auto"><strong> Network Stored Successfully! </strong></div>'
                console.log("DATA STORE SUCCESSFULLY")
            }
            request.onerror = () => {
                console.log("THERE WAS AN ERROR STORING DATA")
            }
        }
    }

    document.getElementById("getIP").onclick = () => {
        $.getJSON("https://api.ipify.org?format=json", function(data)
        {
        document.getElementById("networkIP").value = (data.ip)
        })
        }
    
}
