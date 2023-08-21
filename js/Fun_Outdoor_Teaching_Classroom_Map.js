
    
    async function getFun_Outdoor_Teaching_Classroom_Map () {
      var hostname = window.location.hostname;
      var port = window.location.port;
      var apiUrl = '../server/Fun_Outdoor_Teaching_Classroom_Map.php';
      try {
        var response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error('網路請求失敗: ' + response.status);
        } 
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error)
      }
    }
    
    document.addEventListener("DOMContentLoaded", function () {
      // Get the checkboxes
      var selectAllCheckboxes = document.querySelectorAll(".checkbox-block-3.child-sub-checkbox");
     var childCheckboxes = document.querySelectorAll(".checkbox-block-3.child-sub-checkbox");
    
     // Set the "全選" checkbox as checked
     selectAllCheckboxes.forEach(function (checkbox) {
            checkbox.checked = true;
        });
    
    
    
    
    });
    
    $(function () {
      (async function () {
        try {
            /*var outdoorCheckboxes = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource37");
outdoorCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        updateMarkerVisibility();
    });
});*/
var outdoorCheckboxes = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource37");
outdoorCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateMarkerVisibility);
});

var outdoorCheckboxes1 = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource38");
outdoorCheckboxes1.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateMarkerVisibility);
});



        const mapdata = await getFun_Outdoor_Teaching_Classroom_Map()
    
    
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
     <div class="map_info_part1_new1">
         <div class="map_info_part12">
             <h5 class="mapinfo_discription">`+mapDataItem.ClassName+`</h5>
         </div>
     </div>
     <div class="map_info_part1_new2">
         <div class="map_info_part11">
             <img class='map_contact_img' src="../asset/images/Fun_Outdoor_Teaching_Classroom_Map/info_icon2_phone.svg" alt="info_icon2_phone">
         </div>
         <div class="map_info_part12">
             <h5 class="mapinfo_contact_detail">`+mapDataItem.Tel+`</h5>
         </div>
     </div>
     <div class="map_info_part1_new3">
         <div class="map_info_part11">
             <img class='map_contact_img' src="../asset/images/Fun_Outdoor_Teaching_Classroom_Map/info_icon3_email.svg" alt="info_icon3_email">
         </div>
         <div class="map_info_part12">
             <h5 class="mapinfo_contact_detail">`+mapDataItem.EMail+`</h5>
         </div>
     </div>
     <div class="map_info_part2">
         <div class="map_info_button" onclick="referenceportal();"><h5 class="map_info_button_name" id="button_to_map_info_redirect">`+mapDataItem.button+`</h5></div>
     </div>
    </div>
    `;
    
    var location1 = [
    locationInfoget,
    latitude,
    longitude,
    i + 1, // Current data position
    "http://localhost:8080/ardswc/asset/images/Fun_Outdoor_Teaching_Classroom_Map/outdoor_classroom.svg"
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
/*

    function updateMarkerVisibility() {
    var outdoorCheckboxes = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource37");
    var outdoorCheckboxes1 = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource38");
    console.log(outdoorCheckboxes);


    outdoorCheckboxes1.addEventListener("change", function () {
    var isChecked = outdoorCheckboxes1.checked;

    // Iterate through all the outdoor checkboxes and update their checked status
    outdoorCheckboxes.forEach(function (checkbox) {
        checkbox.checked = isChecked;
    });
});


outdoorCheckboxes.addEventListener("change", function () {
    var isChecked = outdoorCheckboxes.checked;

    // Iterate through all the outdoor checkboxes and update their checked status
    outdoorCheckboxes1.forEach(function (checkbox) {
        checkbox.checked = isChecked;
    });
});


    
    var showAllLocations = false; // Default value

    const screenWidth = window.innerWidth;

if (screenWidth > 1024) {
    
    // Iterate through the checkboxes to find the checked status
    outdoorCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            showAllLocations = true;
            return; // No need to check further once one checkbox is checked
        }
    });
}
else
{
    outdoorCheckboxes1.forEach(function (checkbox) {
        if (checkbox.checked) {
            showAllLocations = true;
            return; // No need to check further once one checkbox is checked
        }
    });
}
    
    for (var i = 0; i < markers.length; i++) {
        markers[i].setVisible(showAllLocations);
    }

    infowindow.close();
}
*/

function updateMarkerVisibility() {
    var outdoorCheckboxes = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource37");
    var outdoorCheckboxes1 = document.querySelectorAll(".checkbox.checkbox-block-3.child-sub-checkbox.resource38");
    console.log(outdoorCheckboxes);

    // Add event listener to each checkbox in outdoorCheckboxes1 NodeList
    outdoorCheckboxes1.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            var isChecked = checkbox.checked;

            // Iterate through all the outdoor checkboxes and update their checked status
            outdoorCheckboxes.forEach(function (innerCheckbox) {
                innerCheckbox.checked = isChecked;
            });
        });
    });

    // Add event listener to each checkbox in outdoorCheckboxes NodeList
    outdoorCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            var isChecked = checkbox.checked;

            // Iterate through all the outdoor checkboxes and update their checked status
            outdoorCheckboxes1.forEach(function (innerCheckbox) {
                innerCheckbox.checked = isChecked;
            });
        });
    });

    var showAllLocations = false; // Default value
    const screenWidth = window.innerWidth;

    if (screenWidth > 1024) {
        // Iterate through the checkboxes to find the checked status
        outdoorCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                showAllLocations = true;
                return; // No need to check further once one checkbox is checked
            }
        });
    } else {
        outdoorCheckboxes1.forEach(function (checkbox) {
            if (checkbox.checked) {
                showAllLocations = true;
                return; // No need to check further once one checkbox is checked
            }
        });
    }

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
    
