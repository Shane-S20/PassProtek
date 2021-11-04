
console.log("FUNCTION TEST")

//let btn = document.getElementById("Test_button");
//btn.addEventListener("click", test_URL)

//let createUser = document.getElementById("create");
//createUser.addEventListener("click",create_user);

//function test_URL()
$("#Test_button").on("click",function()
{
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},function(tabs)
    {
            const link = tabs[0].url
            document.getElementById("url").innerHTML = tabs[0].url
            if(link.charAt(4) == "s")
            {
                document.getElementById("result").innerHTML = "URL is using HTTPS protocol"
            }
            else 
            {
                alert("URL is NOT using HTTPS Protocol")
                document.getElementById("result").innerHTML = "URL is NOT using HTTPS protocol"
            }

        });
    //DON'T USE VAR, USE CONST OR LET INSTEAD
    console.log("URL TESTED")
})

//$("#create").on("click", function(){ 
//    alert("CREATING USER")

    //chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
    //   console.log('Settings saved');
    //  });
  
      // Read it using the storage API
    //  chrome.storage.sync.get(['foo', 'bar'], function(items) {
    //    message('Settings retrieved', items);
    //  });

    // chrome.storage.sync.set({'username': 'value', 'password': 'password'}, function() {
    //     value = document.getElementById("uname").value
    //     password = document.getElementById("pword").value
    // })


    // chrome.storage.sync.get(['username'], function(result) {
    //     alert('Username currently is ' + result.key)
    // })
//})