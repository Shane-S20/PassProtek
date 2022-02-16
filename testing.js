chrome.runtime.onInstalled.addListener(() => {
  console.log("Test");
});


$("#create").click(function(){
  chrome.storage.sync.set({username: btoa(document.getElementById('uname').value), password: btoa(document.getElementById('pword').value) }, function() {
    console.log('Settings saved');
  });  
})

$("#retrieve").click(function(){
  chrome.storage.sync.get(['username', 'password'], function(items) {
    console.log('Settings retrieved', items);
    let uname = atob(items.username)
    let pass = atob(items.password)
    console.log("JSON STRING: " + JSON.stringify(items))
    console.log("Decrypted Login Credentials: " + uname + " " + pass)
    document.getElementById("encodedText").innerHTML = "Encoded Username:    " + items.username + " Encoded Password:     " + items.password  
    document.getElementById("decodedText").innerHTML = "Decoded Username:    " + uname + " Decoded Password:    " + pass
  });
})
