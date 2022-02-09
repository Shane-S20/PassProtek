var script = document.createElement('script');
script.src = 'jquery-3.6.0.js';
script.type = 'text/javascript';

const CryptoJS = require('crypto-js');

const encryptWithAES = (text, passphrase) => {
    return CryptoJS.AES.encrypt(text, passphrase).toString();
  };

const decryptWithAES = (ciphertext, passphrase) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};


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

window.onload = function() {
    document.getElementById("store").onclick = () => {
        //var transaction = db.transaction(["PassProtek"], "readwrite");
        //const objectStore = insert_transaction.objectStore("testCases");
        const siteName = document.getElementById("siteName").value;
        const loginUname = document.getElementById("loginUname").value;
        const loginPword = document.getElementById("loginPword").value;
        const loginURL = document.getElementById("loginURL").value;
        const transaction = db.transaction("Data","readwrite")
        const profiles = transaction.objectStore("Data")

        const encryptedsitename = encryptWithAES(siteName, '123')
        console.log(encryptedsitename)

        const profile = {Website_Name: siteName,Login_Username: loginUname,Login_Password: loginPword,Login_URL: loginURL}
        const request = profiles.add(profile)
        console.log("SUBMIT BUTTON PRESSED")
        request.onsuccess = () => {
            console.log("DATA STORE SUCCESSFULLY")
        }
        request.onerror = () => {
            console.log("THERE WAS AN ERROR STORING DATA")
        }
    }
};

function update_data(modification) {
    if (db) {
        const put_transaction = db.transaction("testCases", "readwrite");
        const objectStore = put_transaction.objectStore("testCases");

        put_transaction.oncomplete = function () {
            console.log("ALL PUT TRANSACTIONS COMPLETE.");         
        }

        put_transaction.onerror = function () {
            console.log("PROBLEM UPDATING RECORDS.")       
        }
        objectStore.put(modification);
    }
}

function delete_data(WebsiteName) {
    if (db) {
        const delete_transaction = db.transaction("testCases", "readwrite");
        const objectStore = delete_transaction.objectStore("testCases");

       
        delete_transaction.oncomplete = function () {
            console.log("ALL DELETE TRANSACTIONS COMPLETE.");
        }

        delete_transaction.onerror = function () {
            console.log("PROBLEM DELETE RECORDS.")    
        }

        objectStore.delete(WebsiteName);
    }
}

create_database();