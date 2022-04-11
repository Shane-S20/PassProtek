let db = null;

function open_database() {
    let OpenRequest = window.indexedDB.open('PassProtek', 1);

    OpenRequest.onsuccess = function(event) {
        console.log("DELETE DB OPENED");
        db = event.target.result;
    }
}

open_database();

window.onload = function() {
    document.getElementById("delete").onclick = () => {

        if(document.getElementById("deleted_credentials").value == "") {
            document.getElementById("deletesuccess").innerHTML = '<br><div class="alert alert-danger"style="width: 280px;text-align: center; margin: auto"><strong>Please Enter The Credential You Want To Delete</strong></div>'
        } 
        else{
            const transaction = db.transaction("Data","readwrite");
            const Data = transaction.objectStore("Data");
            const Requested_Website = document.getElementById("deleted_credentials").value;
            const search = Data.delete(Requested_Website);
            console.log("DELETE BUTTON PRESSED")

            search.onsuccess = () => {
                document.getElementById("deletesuccess").innerHTML = '<br><div class="alert alert-success"style="width: 280px;text-align: center; margin: auto"><strong> Credentials Successfully Deleted </strong></div>'
                console.log("DATA DELETED SUCCESSFULLY")
            }
            search.onerror = () => {
                console.log("THERE WAS AN ERROR DELETING DATA")
            }
        }
    }    
};