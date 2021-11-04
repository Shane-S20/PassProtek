chrome.runtime.onInstalled.addListener(() => {
  console.log("Test");
});


$("#create").on("click", function(){
  chrome.storage.sync.set({username: document.getElementById('uname').value, password: document.getElementById('pword').value }, function() {
    console.log('Settings saved');
  });  
})


$("#retrieve").on("click", function(){
  chrome.storage.sync.get(['username', 'password'], function(items) {
    console.log('Settings retrieved', items);
  });
})
