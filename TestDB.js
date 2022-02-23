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
open_user_database();


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

        const randomString = Math.random().toString(36).substr(2,20);
        console.log(randomString)

        //'C1E13074578EB93751086553FF7DE49E76FCCBB13F80EC3DDD06E2E7DE1A3198'
        const encryptPassword = encryptWithAES(loginPword, btoa(randomString));
        const encryptUname = encryptWithAES(loginUname, btoa(randomString))
        const encryptURL = encryptWithAES(loginURL, btoa(randomString))
        
        console.log("OUTSIDE FUNCTION")
        console.log(encryptURL)
        const profile = {Website_Name: siteName,Login_Username: encryptUname,Login_Password: encryptPassword,Login_URL: encryptURL,Encoded_Key: btoa(randomString)}
        const request = profiles.add(profile)
        
        console.log("SUBMIT BUTTON PRESSED")
        request.onsuccess = () => {
            document.getElementById("storesuccess").innerHTML = "Credentials Stored Successfully";
            console.log("DATA STORE SUCCESSFULLY")
        }
        request.onerror = () => {
            console.log("THERE WAS AN ERROR STORING DATA")
        }
    }
};

create_database();