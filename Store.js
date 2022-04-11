const encryptWithAES = (text, passphrase) => {
    return CryptoJS.AES.encrypt(text, passphrase).toString();
  };

const decryptWithAES = (ciphertext, passphrase) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

let db = null;

function open_database() {
    let OpenRequest = window.indexedDB.open('PassProtek', 1);
    OpenRequest.onsuccess = function(event) {
        db = event.target.result;
        console.log("DB OPENED");
    }
    OpenRequest.onerror = function (event) {
        console.log("Problem opening DB.");
    }
}

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    document.getElementById("loginURL").value = (tabs[0].url);
});

window.onload = function() {
   open_database();
    document.getElementById("store").onclick = () => {

        if(document.getElementById("siteName").value == "" || document.getElementById("loginUname").value == "" || document.getElementById("loginPword").value == "" || document.getElementById("loginURL").value == "") {
            document.getElementById("storesuccess").innerHTML = '<br><div class="alert alert-danger"style="width: 280px;text-align: center; margin: auto"><strong>Please Enter All Details To Continue</strong></div>'
        } 
        else{
            const siteName = document.getElementById("siteName").value;
            const loginUname = btoa(document.getElementById("loginUname").value);
            const loginPword = btoa(document.getElementById("loginPword").value);
            const loginURL = btoa(document.getElementById("loginURL").value);
            const transaction = db.transaction("Data","readwrite")
            const profiles = transaction.objectStore("Data")

            const randomString = Math.random().toString(36).substr(2,20);
            console.log(randomString)

            const encryptPassword = encryptWithAES(loginPword, btoa(randomString));
            const encryptUname = encryptWithAES(loginUname, btoa(randomString))
            const encryptURL = encryptWithAES(loginURL, btoa(randomString))
            
            console.log("OUTSIDE FUNCTION")
            console.log(encryptURL)
            const profile = {Website_Name: siteName,Login_Username: encryptUname,Login_Password: encryptPassword,Login_URL: encryptURL,Encoded_Key: btoa(randomString)}
            const request = profiles.add(profile)
            
            console.log("SUBMIT BUTTON PRESSED")
            request.onsuccess = () => {
                document.getElementById("storesuccess").innerHTML = '<br><div class="alert alert-success"style="width: 280px;text-align: center; margin: auto"><strong> Credentials Stored Successfully! </strong></div>'
                console.log("DATA STORE SUCCESSFULLY")
            }
            request.onerror = () => {
                console.log("THERE WAS AN ERROR STORING DATA")
            }
        }
    }
};