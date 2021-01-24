window.addEventListener('load',()=>{
  let long;
  let lat;
  let temparatureDescription = document.querySelector(".temparature-description");
  let temparatureDegree = document.querySelector(".temparature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(position=>{
         long = position.coords.longitude;
         lat = position.coords.latitude;
         console.log(long);
         console.log(lat);
         console.log(position);
         const proxy = `https://cors-anywhere.herokuapp.com/`
         const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
         fetch(api)
             .then(response => {
               return response.json();
             })
             .then(data => {
                  console.log(data);
                  const {temperature,summary,icon} = data.currently;

                  temparatureDegree.textContent = (((temperature-32)/9)*5).toFixed(2);
                  temparatureDescription.textContent = summary;
                  locationTimezone.textContent = data.timezone;
                  setIcons(icon,document.querySelector(".icon"));
             });
     });
     function setIcons(icon,iconId){
       const skycons = new Skycons({color: "white"});
       const currentIcon = icon.replace(/-/g,"_").toUpperCase();
       skycons.play();
       skycons.set(iconId,Skycons[currentIcon]);

     }


  }
  else{
    h1.textContent="Hey You Got Everything wrong!";
  }
});
