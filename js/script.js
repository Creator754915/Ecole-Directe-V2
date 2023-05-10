let data=window.performance.getEntriesByType("navigation")[0].type;
console.log(data);
if (data == "reload") {
    cookiePopup()
}
window.addEventListener("load", () => {
    if (!sessionStorage.getItem("ed_token")) {
        loginPopup();
        
    }
});
function cookiePopup() {
    var cookieHTML = `
        <h1>Cookie</h1>

        <label>Accepter les cookies pour continuer de naviger sur ce site web</label>
        <br>
        <button class="cook">Accept All</button>
        <button class="cookc">Cancel</button>
    `;
    var cookieBg = document.createElement("div");
    cookieBg.classList.add("cookie-bg");
    var cookie = document.createElement("div");
    cookie.classList.add("cookie");
    cookie.innerHTML = cookieHTML;
    cookieBg.appendChild(cookie);

    document.body.appendChild(cookieBg);

    document.querySelector(".cook").addEventListener("click", () => {
        sessionStorage.setItem('Cookies: ', "Accept");
        location.reload();
    })
    document.querySelector(".cookc").addEventListener("click", () => {
        sessionStorage.setItem('Cookies: ', "Cancel");
        location.reload();
        window.close();
    })
}
function loginPopup() {
    var popupHtml = `
        <h1>Login</h1>

        <label for="username">Username: </label>
        <input type="text" id="username" autocomplete="off"><br><br>

        <label for="password">Password: </label>
        <input type="password" id="password" autocomplete="off">
        <br><br>
        <button class="submit">Login</button>
    `;
    var popupBg = document.createElement("div");
    popupBg.classList.add("popup-bg");
    var popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = popupHtml;
    popupBg.appendChild(popup);

    document.body.appendChild(popupBg);

    document.querySelector(".submit").addEventListener("click", () => {
        fetch("https://api.ecoledirecte.com/v3/login.awp?v=4.9.0", {
            method: 'POST',
            body: new URLSearchParams({
                data: JSON.stringify({
                    uuid: "",
                    identifiant: document.querySelector("#username").value,
                    motdepasse: document.querySelector("#password").value,
                    isReLogin: false
                })
            })
        }).then(res => {
            return res.json();
        })
        
        .then(data => {
            if (data["code"] === 200) {
                sessionStorage.setItem("ed_token", data["token"]);
                location.reload;
                cookiePopup();
            } else {
                [...document.querySelectorAll(".error")].forEach(item => {
                    item.parentElement.removeChild(item);
                });
                var error = document.createElement("div");
                error.style = "color: red; font-size: 15px;";
                error.classList.add("error");
                error.innerHTML = data["message"];
                popup.appendChild(error);
            }
        });
    });
}
const container = document.querySelector('.container');
            const img = document.querySelector('img');
                    container.addEventListener('mousemove', (event)=>{
                        let x = event.clientX-event.target.offsetLeft;
                        let y = event.clientY-event.target.offsetTop;
                        img.style.transformOrigin=`${x}px ${y}px`;
                        img.style.transform='scale(1.5)'
        });
                    container.addEventListener('mouseleave',()=>{
                        img.style.transformOrigin='center center';
                        img.style.transform='scale(1)';
        });
            function leave() {
                loginPopup();
            }
function time() {
    swal({
        icon: 'question',
        title: 'Oops',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}
function devoirs(){
    swal({
        icon: 'question',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
      
}


function note() {
    for (i=1; i<11; i++){
        var num = Math.round(Math.random() * 20);
        var num2 = Math.round(Math.random() * 20)
        var moyenne = num + num2;
        var resultat = moyenne / 2;
        var moyennegenerale =  Math.round(resultat / 7);
        var note = document.getElementById("n" + i);
        var moyen = document.getElementById("m" + i);
        var moyenneg = document.getElementById("mg");
        note.innerHTML="<td>" + num + " - " + num2 + "</td>";
        moyen.innerHTML="<td>" + resultat + "</td>";
        moyenneg.innerHTML="<td>" + Math.round(Math.random() * 20) + "</td>";
    }
}

var mo = 0;
sessionStorage.setItem('Stockage: ', mo);
location.reload();
function newf() {
    if (mo < 4000) {
        var vbar = document.getElementById("Bar");
        vbar.value = mo;
                    
        //create item
        var name = prompt("Folder name: ");
        var elem = $("<li></li>").text(name);
                    
        mo += 10;
        var min = document.getElementById("min");
        min.innerHTML = "<p>" + mo + " Mo</p>";
        vbar.value += 10;

        //session storage
        sessionStorage.setItem('Folder', name);

        //create button
        $(elem).append("<button class='rem'>X</button>");
                    
        // delete items
        $("#cloud_ul").append(elem);
        $(".rem").on("click", function() {
        $(this).parent().remove();
            mo -= 2;
            min.innerHTML = "<p>" + mo + " Mo</p>";
            vbar.value = vbar.value - 2;
        });
    } else {
        swal({

            title: "ATTENTION",
            text: "Vous n'avez plus d'espace de stokage",
            icon: "error",
            button: "Ok"
        });
    }
}


function pnote() {
    location.replace("note.html");
}
function cloud() {
    location.replace("cloud.html");
}
function pindex() {
    location.replace("accueil.html");
}
function telecharger(){
    var text = `Ecole Pro V2.0.6-release 4.0.0.3.2
                By Creator754915
                Ecole Directe(c)`
    download(text)
}
function  download(text) {
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download',"log");
    element.style.display='none';
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}