chrome.runtime.onInstalled.addListener(() => {
  console.log("Test");
});


$("#create").on("click", function(){
  chrome.storage.sync.set({username: btoa(document.getElementById('uname').value), password: btoa(document.getElementById('pword').value) }, function() {
    console.log('Settings saved');
  });  
})


$("#retrieve").on("click", function(){
  chrome.storage.sync.get(['username', 'password'], function(items) {
    console.log('Settings retrieved', items);
    let uname = atob(items.username)
    let pass = atob(items.password)
    console.log("Decrypted Login Credentials: " + uname + " " + pass)
  });
})
