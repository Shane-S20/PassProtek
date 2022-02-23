const decryptWithAES = (ciphertext, passphrase) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

const encryptWithAES = (text, passphrase) => {
    return CryptoJS.AES.encrypt(text, passphrase).toString();
  };

let db = null;

function open_credentials_database() {
    let OpenRequest = window.indexedDB.open('PassProtek', 1);

    // OpenRequest.onerror = function (event) {
    //     console.log("Problem opening DB.");
    // }

    // OpenRequest.onupgradeneeded = function (event) {
    //     db = event.target.result;

    //     let objectStore = db.createObjectStore('Data', {
    //         keyPath: 'Website_Name'
    //     });

    //     objectStore.transaction.oncomplete = function (event) {
    //         console.log("ObjectStore Created.");
    //     }
    // }

    OpenRequest.onsuccess = function(event) {
        db = event.target.result;
        console.log("CREDENTIALS DB OPENED");
    }
}

open_credentials_database();

//
let db2 = null;


function open_user_database() {
    let OpenRequest = window.indexedDB.open('PassProtekUsers', 1);

    // OpenRequest.onerror = function (event) {
    //     console.log("Problem opening DB.");
    // }

    // OpenRequest.onupgradeneeded = function (event) {
    //     db2 = event.target.result;

    //     let objectStore = db2.createObjectStore('Users', {
    //         keyPath: 'Username'
    //     });

    //     objectStore.transaction.oncomplete = function (event) {
    //         console.log("Users ObjectStore Created.");
    //     }
    // }

    OpenRequest.onsuccess = function(event) {
        db2 = event.target.result;
        console.log("MASTER LOGIN DB OPENED");
    }
}

open_user_database();

window.onload = function() {
    document.getElementById("get").onclick = () => {
        const transaction = db.transaction("Data","readonly");
        const Data = transaction.objectStore("Data");
        const Requested_Website = document.getElementById("Entered_Credentials").value;
        const search = Data.get(Requested_Website);
        console.log("GET BUTTON PRESSED")

        // const transaction2 = db2.transaction("Users","readonly");
        // const User = transaction2.objectStore("Users");
        // const user_search = User.get("User1");
        // user_search.onsuccess = () => {
        //     console.log(user_search.result.Username);
        //     console.log(user_search.result.Password);
        // }

        search.onsuccess = () => {
            //console.log(search.result)
            //console.log(search.result.Website_Name)
            // let index = Data.index(Requested_Website);
            // let retrievedSite = index.get(Requested_Website)
            // var result = retrievedSite.result.Website_Name;
            //const decrypt_Website_Name = decryptWithAES(search.result.Website_Name, 'MasterPassphrase');

            const decryptUname = decryptWithAES(search.result.Login_Username, search.result.Encoded_Key)
            const decryptPassword = decryptWithAES(search.result.Login_Password, search.result.Encoded_Key)
            const decryptURL = decryptWithAES(search.result.Login_URL, search.result.Encoded_Key)

            document.getElementById("Retrieved_Site").innerHTML = "Website Name: " + search.result.Website_Name;
            document.getElementById("Retrieved_Username").innerHTML = "Decrypted Username : " + atob(decryptUname);
            document.getElementById("Retrieved_Password").innerHTML = "Decrypted Password : " + atob(decryptPassword);
            document.getElementById("Retrieved_URL").innerHTML = "Decrypted Website URL : " + atob(decryptURL);
            navigator.clipboard.writeText(atob(decryptPassword));
            document.getElementById("RetrievedSuccess").innerHTML = "Password Copied to Clipboard";
            console.log("DATA RETRIEVED SUCCESSFULLY")
        }
        search.onerror = () => {
            console.log("THERE WAS AN ERROR GETTING DATA")
        }
    }
};

// window.onload = function() {
//     document.getElementById("get").onclick = () => {
//         console.log

//     }
// };