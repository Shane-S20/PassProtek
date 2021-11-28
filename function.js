
console.log("FUNCTION TEST")

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

$("#ip_button").on("click",function()
{
   console.log("IP CLICKED")
    $.getJSON("https://api.ipify.org?format=json", function(data)
    {
        $("#ip").html(data.ip)
    })

})