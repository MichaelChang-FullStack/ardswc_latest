


    $(function () {
      (async function () {
        try {
var outdoorCheckboxes = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource37");
outdoorCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateMarkerVisibility);
});

var outdoorCheckboxes1 = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource38");
outdoorCheckboxes1.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateMarkerVisibility);
});

    //const mapdata = await getFun_Outdoor_Teaching_Classroom_Map();

    const mapdata=[
        {
            "ClassID": "class_01",
            "ClassName": "\u5b9c\u862d\u4ec1\u5c71\u690d\u7269\u5712",
            "Class_Map": "https:\/\/www.google.com\/maps\/embed?pb=!1m16!1m12!1m3!1d7253.950765653772!2d121.75712813890075!3d24.62453333483842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z5a6c6Jit5LuB5bGx5qSN54mp5ZyS!5e0!3m2!1szh-TW!2stw!4v1422235763970"
            
        },
        {
            "ClassID": "class_03",
            "ClassName": "\u81fa\u5317\u5317\u6295\u8cb4\u5b50\u5751",
            "Class_Map": "https:\/\/www.google.com\/maps\/embed?pb=!1m14!1m8!1m3!1d3611.547751589024!2d121.49359698280338!3d25.150976224449867!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442afcab77e6d4f%3A0xbba7a4d6ea7edc83!2z6LK05a2Q5Z2R5rC05Zyf5L-d5oyB5pWZ5a245ZyS5Y2A!5e0!3m2!1szh-TW!2stw!4v1422238071401"
        },
        {
            "ClassID": "class_04",
            "ClassName": "\u6843\u5712\u694a\u6885\u8336\u696d\u6539\u826f\u5834",
            "Class_Map": "https:\/\/www.google.com\/maps\/embed?pb=!1m16!1m12!1m3!1d14475.224740540254!2d121.1836073703022!3d24.904591858696367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z5qGD5ZyS5qWK5qKF6Iy26JGJ5pS56Imv5aC05rC05Zyf5L-d5oyB5oi25aSW5pWZ5a6k!5e0!3m2!1szh-TW!2stw!4v1422238263886"
        },
        {
            "ClassID": "class_19",
            "ClassName": "\u6f8e\u6e56\u99ac\u516c\u83dc\u5712",
            "Class_Map": "https:\/\/www.google.com\/maps\/embed?pb=!1m14!1m8!1m3!1d3657.413808367112!2d119.56583898147582!3d23.553577039790706!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346c5a8570000001%3A0xed6af56f74248cb3!2z5r6O5rmW57ij5p6X5YuZ5YWs5ZyS566h55CG5omA5YWs5ZyS566h55CG6IKh!5e0!3m2!1szh-TW!2stw!4v1422251057580"
        }
        ];
    
    
    var locations = [];
    
    for (var i = 0; i < mapdata.length; i++) {
    var mapDataItem = mapdata[i];
    var embeddedURL = mapDataItem.Class_Map;
    console.log(embeddedURL);
    
    const regexLatitude = /!3d([-0-9.]+)/;
    const regexLongitude = /!2d([-0-9.]+)/;
    
    const latitudeMatches = embeddedURL.match(regexLatitude);
    const longitudeMatches = embeddedURL.match(regexLongitude);
    
    if (latitudeMatches && longitudeMatches) {
    var latitude = parseFloat(latitudeMatches[1]);
    var longitude = parseFloat(longitudeMatches[1]);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    } else {
    console.log("Latitude and/or longitude not found in the URL.");
    }
    
    console.log(mapDataItem.ClassName);
    var locationInfoget = `
    <div class="map_info">
     <div class="map_info_part1">
         <div class="map_info_part11">
             <img class='map_title_img' src="../asset/images/Fun_Outdoor_Teaching_Classroom_Map/info_icon1_title.svg" alt="info_icon1_title">
         </div>
         <div class="map_info_part12">
             <h5 class="mapinfo_title">`+mapDataItem.ClassName+`</h5>
         </div>
     </div>
    </div>
    `;
    
    var location1 = [
    locationInfoget,
    latitude,
    longitude,
    i + 1, // Current data position
    "http://localhost:8080/ardswc/asset/images/Fun_Outdoor_Teaching_Classroom_Map/cool_school_map.svg"
    ];
    console.log(location1);
    
    locations.push(location1);
    }
    
    console.log(locations);
    
    var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 9,
     center: new google.maps.LatLng(23.6978, 120.9605), // Centered on Taiwan
     mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var activeMarker = null; // To keep track of active marker
    

    
    var markers = []; // Define markers array
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            icon: locations[i][4],
            map: map
        });
        markers.push(marker); // Add marker to markers array
       
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
                activeMarker = marker;
            }
        })(marker, i));
       
        google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
                activeMarker = marker; // Set the active marker
       
            }
        })(marker, i));
       }
       
       function updateMarkerVisibility() {
        //var outdoorCheckbox = document.getElementById("resource37");
        var showAllLocations = outdoorCheckbox.checked;
       
        for (var i = 0; i < markers.length; i++) {
            markers[i].setVisible(showAllLocations);
        }
       
        infowindow.close();
       }
       // Function to open InfoWindow and prevent it from closing on mouseout
       function showInfoWindow(button) {
        var content = button.parentNode.innerHTML;
        infowindow.setContent(content);
        infowindow.open(map, infowindow.anchor);
       }
    
        } catch (error) {
          console.log(error);
        }
      })();
    });
    
