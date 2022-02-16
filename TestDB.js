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
    }
}

let db2 = null;
create_user_database();

function create_user_database() {
    let OpenRequest = window.indexedDB.open('PassProtekUsers', 1);

    OpenRequest.onerror = function (event) {
        console.log("Problem opening DB.");
    }

    OpenRequest.onupgradeneeded = function (event) {
        db2 = event.target.result;

        let objectStore = db2.createObjectStore('Users', {
            keyPath: 'Username'
        });

        objectStore.transaction.oncomplete = function (event) {
            console.log("Users ObjectStore Created.");
        }
    }

    OpenRequest.onsuccess = function(event) {
        db2 = event.target.result;
        console.log("MASTER LOGIN DB OPENED");
    }
}

// let pass;
// const transaction2 = db2.transaction("Users","readonly");
// const User = transaction2.objectStore("Users");
// const user_search = User.get("User1");
//     user_search.onsuccess = () => {
//         //console.log(user_search.result.Username);
//         //console.log(user_search.result.Password);
//         pass = user_search.result.Password;
//         console.log("USER'S PASSWORD")
//         console.log(pass)
//     }


window.onload = function() {
    document.getElementById("store").onclick = () => {
        //var transaction = db.transaction(["PassProtek"], "readwrite");
        //const objectStore = insert_transaction.objectStore("testCases");
        const siteName = document.getElementById("siteName").value;
        const loginUname = btoa(document.getElementById("loginUname").value);
        const loginPword = btoa(document.getElementById("loginPword").value);
        const loginURL = btoa(document.getElementById("loginURL").value);
        const transaction = db.transaction("Data","readwrite")
        const profiles = transaction.objectStore("Data")

        const encryptPassword = encryptWithAES(loginPword, 'MasterPassphrase');
        const encryptUname = encryptWithAES(loginUname, 'MasterPassphrase')
        const encryptURL = encryptWithAES(loginURL, 'MasterPassphrase')
        
        console.log("OUTSIDE FUNCTION")
        console.log(encryptURL)
        const profile = {Website_Name: siteName,Login_Username: encryptUname,Login_Password: encryptPassword,Login_URL: encryptURL}
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

// window.onload = function() {
//     document.getElementById("delete").onclick = () => {
//         const transaction = db.transaction("Data","readwrite");
//         const Data = transaction.objectStore("Data");
//         const Requested_Website = document.getElementById("Entered_Credentials").value;
//         const search = Data.delete(Requested_Website);
//         console.log("DELETE BUTTON PRESSED")

//         search.onsuccess = () => {
//              console.log("DATA DELETED SUCCESSFULLY")
//         }
//         search.onerror = () => {
//             console.log("THERE WAS AN ERROR DELETING DATA")
//         }
//     }
// };

// function update_data(modification) {
//     if (db) {
//         const put_transaction = db.transaction("testCases", "readwrite");
//         const objectStore = put_transaction.objectStore("testCases");

//         put_transaction.oncomplete = function () {
//             console.log("ALL PUT TRANSACTIONS COMPLETE.");         
//         }

//         put_transaction.onerror = function () {
//             console.log("PROBLEM UPDATING RECORDS.")       
//         }
//         objectStore.put(modification);
//     }
// }

// function delete_data(WebsiteName) {
//     if (db) {
//         const delete_transaction = db.transaction("testCases", "readwrite");
//         const objectStore = delete_transaction.objectStore("testCases");

       
//         delete_transaction.oncomplete = function () {
//             console.log("ALL DELETE TRANSACTIONS COMPLETE.");
//         }

//         delete_transaction.onerror = function () {
//             console.log("PROBLEM DELETE RECORDS.")    
//         }

//         objectStore.delete(WebsiteName);
//     }
// }

create_database();