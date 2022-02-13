const dbURL = "https://comzone-9f7d.restdb.io/rest/user-accounts";
const APIKEY = "6208844f34fd62156585842e";
const site = "https://comzone.shuqri.xyz/";
// const site = "http://localhost:63342/IDAssignment2/"; // FOR DEBUGGING

$(document).ready(function () {
    console.log('in login code')
    $("#loginSubmit").on("click", function(e) {
        e.preventDefault();
        $('#errorMessage').hide();
        $('#spinner').css("display", "block");

        ajaxFunction("GET").done(function (response) {
            $('#spinner').css("display", "none");
            let accExists = false;
            response.map((account => {
                if ($("#loginEmail").val() === account.email && $("#loginPassword").val() === account.password) {
                    localStorage.setItem("userLoggedIn", JSON.stringify([account._id, account.name]));
                    window.location.assign(site + "account.html");
                    accExists = true;
                }
            }))
            if (!accExists) {
                $('#errorMessage').show()
                $('#errorMessage').html('Wrong username or password?');
                $('#errorMessage').css('color', 'red');
                console.log("wrong username or password.")
            }
        })
    })
})

function ajaxFunction (m) {
    return $.ajax({
        "async": true,
        "crossDomain": true,
        "url": dbURL,
        "method": m,
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        }
    })
}