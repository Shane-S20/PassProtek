const encryptWithAES = (text, passphrase) => {
    return CryptoJS.AES.encrypt(text, passphrase).toString();
  };

const decryptWithAES = (ciphertext, passphrase) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

let db = null;

function create_user_database() {
    let OpenRequest = window.indexedDB.open('PassProtekUsers', 1);

    OpenRequest.onerror = function (event) {
        console.log("Problem opening DB.");
    }

    OpenRequest.onupgradeneeded = function (event) {
        db = event.target.result;

        let objectStore = db.createObjectStore('Users', {
            keyPath: 'Username'
        });

        objectStore.transaction.oncomplete = function (event) {
            console.log("Users ObjectStore Created.");
        }
    }

    OpenRequest.onsuccess = function(event) {
        db = event.target.result;
        console.log("MASTER LOGIN DB OPENED");
        //insert_records(testCases);
    }
}

window.onload = function() {
    document.getElementById("CreateUser").onclick = () => {
        const uname = document.getElementById("loginUname").value;
        const pword = document.getElementById("loginPword").value;
        const transaction = db.transaction("Users","readwrite")
        const user_profile = transaction.objectStore("Users")
        
        //const encrypted_Username = encryptWithAES(uname, 'MasterPassphrase');
        const encrypted_Password = encryptWithAES(pword, 'MasterPassphrase')

        const profile = {Username: uname, Password: encrypted_Password}
        const request = user_profile.add(profile)
        request.onsuccess = () => {
            console.log("USER STORED SUCCESSFULLY")            
        }
        request.onerror = () => {
            console.log("THERE WAS AN ERROR STORING DATA")
        }
    }
};

create_user_database();