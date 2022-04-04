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
    }
}


let db3 = null;
function create_network_database() {
    let OpenRequest = window.indexedDB.open('PassProtekNetworks', 1);
    OpenRequest.onerror = function (event) {
        console.log("Problem opening DB.");
    }
    OpenRequest.onupgradeneeded = function (event) {
        db3 = event.target.result;

        let objectStore = db3.createObjectStore('IPaddr', {
            keyPath: 'IPaddress'
        });
        objectStore.transaction.oncomplete = function (event) {
            console.log("Network ObjectStore Created.");
        }
    }
    OpenRequest.onsuccess = function(event) {
        db3 = event.target.result;
        console.log("Network DB Opened");
        //insert_records(testCases);
    }
}

let IPdata = "0";
//retrieve ip
$.fn.delegateJSONResult = function(ip){
    IPdata = ip
} 



window.onload = function() {
    create_network_database();
    create_database();
    $.getJSON("https://api.ipify.org?format=json", function (data) {
        $.fn.delegateJSONResult(data.ip);
    });

    document.getElementById("get").onclick = () => {
        const transaction = db3.transaction("IPaddr", "readonly");
        const Data = transaction.objectStore("IPaddr");
     
        console.log(IPdata)
        const search = Data.openCursor(IPdata);

        search.onsuccess = function(event) {
            console.log("Search successful");
            var cursor = event.target.result;
            if(cursor){console.log("security passed, user may proceed")} else {alert("YOU ARE NOT ON A TRUSTED NETWORK")}
        };

        search.onerror = () => {
            console.log("Search failed");
        };
   
     

    }


}
