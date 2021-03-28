(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h > 12) {
                h = h - 12
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        let eesnimi = document.forms["form"]["fname"].value;
        let perenimi = document.forms["form"]["lname"].value;
            
        if (eesnimi == "" || perenimi == "") {
            alert("Palun sisestage oma ees- ja perekonnanimi");
            return;
        }  

        

        if (!(/^[a-zA-ZÖÄÜÕöäüõ]+$/.test(eesnimi)) || !(/^[a-zA-ZÖÄÜÕöäüõ]+$/.test(perenimi))) {
            alert("Ees- ja perekonnanimi ei tohi sisaldada numbreid");
            return;
        }

        if (!document.getElementById("pakiautomaat").checked ) {
            if (!document.getElementById("koju").checked) {
                alert("Valige, kas soovite saada pakki pakiautomaati või koju kohaletoomisega");
                return;
            }
        } else if (!document.getElementById("koju").checked) {
            if (!document.getElementById("pakiautomaat").checked) {
                alert("Valige, kas soovite saada pakki pakiautomaati või koju kohaletoomisega");
                return;
            }
        }


        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();

            e.innerHTML = "0 &euro;";
            
            return;
            
            
        } else {

            let hind = 0.00;
            
            if (linn.value === "tln" ) {
                hind = 0.00;
                
            }
            else if (linn.value === "trt") {
                hind = 2.50;
            }
            else if (linn.value === "nrv") {
                hind = 2.50
            }
            else {
                hind = 3.00;
            }
            
            if (document.getElementById("v1").checked) {
                hind += 5.00;
            }
            if (document.getElementById("v2").checked) {
                hind += 1.00;
            }
            e.innerHTML = hind.toString() + " &euro;";
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map, infobox;

function GetMap() {
    
    "use strict";


    let centerPoint = new Microsoft.Maps.Location(
            58.88711,
            25.56994
        );

    let tartuYlikool = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    
    let arena = new Microsoft.Maps.Location(
            59.43696,
            24.75353

        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    
    infobox.setMap(map);


    let pushpin = new Microsoft.Maps.Pushpin(tartuYlikool);
    pushpin.metadata =  {
            title: 'Tartu Ülikool',
            description: 'Hea koht',
            text: 'UT'
    };
    

    let pushpin2 = new Microsoft.Maps.Pushpin(arena);
    pushpin2.metadata = {
            title: 'A. le Coq Arena',
            description: 'Jalgpalli areena',
            text:'EJL'
    };

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);
    map.entities.push(pushpin);
    map.entities.push(pushpin2);
}
function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

