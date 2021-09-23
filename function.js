
console.log("FUNCTION TEST");

let btn = document.getElementById("Test_button");

btn.addEventListener("click", test_URL)

function test_URL()
{
    //console.log("TEST");
    //document.getElementById("result").innerHTML = "The full URL of this page is:<br>" + window.location.href;
    var url = document.getElementById("URL_Box");
    if (url.value.charAt(4) == "s")
    {
        document.getElementById("result").innerHTML = "URL is using HTTPS protocol";
        //alert("URL is using HTTPS");
    }
    else 
    {
        document.getElementById("result").innerHTML = getCurrentTab();
        //alert("URL is NOT using HTTPS");
    }
    console.log("URL TESTED");
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }