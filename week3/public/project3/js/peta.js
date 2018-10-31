function findLocation(x, y) {
    
    for(var i=0;i<5;i++)
        if(places[i].lokasi[0]==x && places[i].lokasi[1]==y) {
            console.log(`Nama : ${places[i].sponsor} `);
            return i;
        } else {
            console.log(`Lokasi ${places[i].lokasi[0]}`);
        }
        return -1;
        
}


let gmb= document.getElementById("gmb");
let rev= document.getElementById("review");
let img= document.createElement('img');
let par= document.createElement('p');
gmb.appendChild(img);
rev.appendChild(par);

function showLocation(e) {
    console.log(`Lat : ${e.latlng.lat}, Lng : ${e.latlng.lng}`)
    let ix= findLocation(e.latlng.lat, e.latlng.lng);
    console.log(ix);
    // img.src = places[ix].gambar;
    // par.innerHTML = places[ix].review;
    if(ix>=0)
    {
        console.log(ix);
        img.src = places[ix].gambar;
        par.innerHTML = places[ix].review;
    }
}

const URL = "data/peta.json";
let places = [];
fetch(URL)
    .then(response => response.ok ? response.json() : "ERROR" )
    .then( resp => {
        let places = resp.places;
        localStorage.setItem('places',  JSON.stringify(resp.places));
    })
    .catch(err => console.log(err));

places = JSON.parse(localStorage.getItem('places'));

for (var p of places) {
    var marker = L.marker(p.lokasi).bindPopup(p.sponsor).addTo(mymap);
        // .bindPopup(p.sponsor);
    marker.on('click', showLocation);
}

