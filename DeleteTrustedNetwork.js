let db = null;

function open_database() {
    let OpenRequest = window.indexedDB.open('PassProtekNetworks', 1);

    OpenRequest.onsuccess = function(event) {
        console.log("NETWORKS DB OPENED");
        db = event.target.result;
    }
}

open_database();

window.onload = function() {
    document.getElementById("DeleteNetworksButton").onclick = () => {

        if(document.getElementById("TrustedNetwork").value == "") {
            document.getElementById("deleteNetworkSuccess").innerHTML = '<br><div class="alert alert-danger"style="width: 280px;text-align: center; margin: auto"><strong>Please Enter The Trusted Network To Continue</strong></div>'
        } 
        else{
            const transaction = db.transaction("IPaddr","readwrite");
            const Data = transaction.objectStore("IPaddr");
            const Requested_Network = document.getElementById("TrustedNetwork").value;
            const search = Data.delete(Requested_Network);
            console.log("DELETE NETWORK BUTTON PRESSED")

            search.onsuccess = () => {
                document.getElementById("deleteNetworkSuccess").innerHTML = '<br><div class="alert alert-success"style="width: 280px;text-align: center; margin: auto"><strong> Network Successfully Deleted </strong></div>'
                console.log("NETWORK DELETED SUCCESSFULLY")
            }
            search.onerror = () => {
                console.log("THERE WAS AN ERROR DELETING DATA")
            }
        }
    }    
};