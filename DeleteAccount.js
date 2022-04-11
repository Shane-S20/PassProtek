let db = null;

function open_database() {
    let OpenRequest = window.indexedDB.open('PassProtekUsers', 1);

    OpenRequest.onsuccess = function(event) {
        console.log("USER DB OPENED");
        db = event.target.result;
    }
}

open_database();

window.onload = function() {
    document.getElementById("DeleteAccountButton").onclick = () => {

        if(document.getElementById("masterPword").value == "") {
            alert("Please Enter Your Master Password To Continue");
        } 
        else{
            const transaction = db.transaction("Users","readwrite");
            const Data = transaction.objectStore("Users");
            const Requested_Account = document.getElementById("masterPword").value;
            const search = Data.delete(Requested_Account);
            console.log("DELETE ACCOUNT BUTTON PRESSED")

            search.onsuccess = () => {
                document.getElementById("deleteAccountSuccess").innerHTML = '<br><div class="alert alert-success"style="width: 280px;text-align: center; margin: auto"><strong> Account Successfully Deleted </strong></div>'
                console.log("DATA DELETED SUCCESSFULLY")
            }
            search.onerror = () => {
                console.log("THERE WAS AN ERROR DELETING DATA")
            }
        }
    }    
};