let db = null;

function create_database() {
    let OpenRequest = window.indexedDB.open('PassProtek', 1);

    OpenRequest.onerror = function (event) {
        console.log("Problem opening DB.");
    }

    OpenRequest.onupgradeneeded = function (event) {
        db = event.target.result;

        let objectStore = db.createObjectStore('Data', {
            keyPath: 'Website_Name'
        });

        objectStore.transaction.oncomplete = function (event) {
            console.log("ObjectStore Created.");
        }
    }

    OpenRequest.onsuccess = function(event) {
        db = event.target.result;
        console.log("DB OPENED");
        //insert_records(testCases);
    }
}

create_database();

window.onload = function() {
    document.getElementById("get").onclick = () => {
        const transaction = db.transaction("Data","readonly");
        const Data = transaction.objectStore("Data");
        const Requested_Website = document.getElementById("Entered_Credentials").value;
        const search = Data.get(Requested_Website);
        console.log("GET BUTTON PRESSED")

        search.onsuccess = () => {
            //console.log(search.result)
            //console.log(search.result.Website_Name)
            // let index = Data.index(Requested_Website);
            // let retrievedSite = index.get(Requested_Website)
            // var result = retrievedSite.result.Website_Name;
             document.getElementById("Retrieved_Site").innerHTML = search.result.Website_Name;
             document.getElementById("Retrieved_Username").innerHTML = search.result.Login_Username;
             document.getElementById("Retrieved_Password").innerHTML = search.result.Login_Password;
             document.getElementById("Retrieved_URL").innerHTML = search.result.Login_URL;
            // console.log("DATA RETRIEVED SUCCESSFULLY")
        }
        search.onerror = () => {
            console.log("THERE WAS AN ERROR GETTING DATA")
        }
    }
};