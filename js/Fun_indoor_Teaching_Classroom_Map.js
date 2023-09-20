

async function getFun_Indoor_Teaching_Classroom_Map() {
  var hostname = window.location.hostname;
  var port = window.location.port;
  var apiUrl = '../server/Fun_Indoor_Teaching_Classroom_Map.php';
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

      const mapdata = await getFun_Indoor_Teaching_Classroom_Map()


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

        console.log(mapDataItem.SchoolName);

        if (mapDataItem.Category == "酷學校") {
          var iconinfo = '/asset/images/Fun_Indoor_Teaching_Classroom_Map/cool_school_map_detail.svg';
          var locationiconset = '/asset/images/Fun_Indoor_Teaching_Classroom_Map/cool_school_map.svg';
        }
        else {
          var iconinfo = '/asset/images/Fun_Indoor_Teaching_Classroom_Map/Promotion_demonstration_base_map_detail.svg';
          var locationiconset = '/asset/images/Fun_Indoor_Teaching_Classroom_Map/Promotion_demonstration_base_map.svg';
        }

        const baseType = mapDataItem.BaseType ? mapDataItem.BaseType : ""

        var locationInfoget = `
    <div class="map_info">
     <div class="map_info_part1">
         <div class="map_info_part11">
             <img loading="lazy" class='map_title_img' src=`+ iconinfo + ` alt="info_icon1_title">
         </div>
         <div class="map_info_part12">
             <h5 class="mapinfo_title">`+ mapDataItem.SchoolName + `</h5>
         </div>
     </div>
     <div class="map_info_part1_new1">
         <div class="map_info_part12">
             <h5 class="mapinfo_discription">`+ mapDataItem.SchoolName + `</h5>
         </div>
     </div>
     <div class="map_info_part1_new2">
         <div class="map_info_part11">
         <h5 class="mapinfo_contact_detail">學校屬性:</h5>
         </div>
         <div class="map_info_part12">
             <h5 class="mapinfo_contact_detail">`+ mapDataItem.Attribute + `</h5>
         </div>
     </div>
     <div class="map_info_part1_new3">
         <div class="map_info_part11">
         <h5 class="mapinfo_contact_detail">示範基地:</h5>
         </div>
         <div class="map_info_part12">
             <h5 class="mapinfo_contact_detail">`+ baseType + `</h5>
         </div>
     </div>
     <div class="map_info_part2">
         <div class="map_info_button" onclick="referenceportal('`+ mapDataItem.URL + `');"><h5 class="map_info_button_name" id="button_to_map_info_redirect">` + mapDataItem.button + `</h5></div>
     </div>
    </div>
    `;



        var location1 = [
          locationInfoget,
          latitude,
          longitude,
          i + 1,
          {
            Area: mapDataItem.Area,
            Category: mapDataItem.Category
          },
          locationiconset


        ];
        console.log(location1);

        locations.push(location1);
      }

      console.log(locations);

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(23.6978, 120.9605),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      var activeMarker = null;



      var markers = []; // Define markers array
      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          icon: locations[i][5],
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
       //var outdoorCheckbox = document.getElementById("resource37");
       var showAllLocations = outdoorCheckbox.checked;

       for (var i = 0; i < markers.length; i++) {
           markers[i].setVisible(showAllLocations);
       }

       infowindow.close();
      }*/

      function updateMarkerVisibility() {
        var selectedAreas = [];
        var selectedCategories = [];

        // Get the selected Areas
        var AreaCheckboxes = document.querySelectorAll("input[name='Area']:checked");
        AreaCheckboxes.forEach(function (checkbox) {
          selectedAreas.push(checkbox.value);
        });

        // Get the selected categories
        var CategoryCheckboxes = document.querySelectorAll("input[name='Category']:checked");
        CategoryCheckboxes.forEach(function (checkbox) {
          selectedCategories.push(checkbox.value);
        });

        // Loop through markers and set visibility based on selected criteria
        for (var i = 0; i < markers.length; i++) {
          var markerArea = locations[i][4].Area;
          var markerCategory = locations[i][4].Category;

          var AreaMatch = selectedAreas.includes(markerArea);
          var CategoryMatch = selectedCategories.includes(markerCategory);

          markers[i].setVisible(AreaMatch && CategoryMatch);
        }

        infowindow.close();
      }




      // Function to open InfoWindow and prevent it from closing on mouseout
      function showInfoWindow(button) {
        var content = button.parentNode.innerHTML;
        infowindow.setContent(content);
        infowindow.open(map, infowindow.anchor);
      }


      var AreaCheckboxes = document.querySelectorAll("input[name='Area']");
      var CategoryCheckboxes = document.querySelectorAll("input[name='Category']");

      AreaCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateMarkerVisibility);
      });

      CategoryCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", updateMarkerVisibility);
      });
      updateMarkerVisibility();

    } catch (error) {
      console.log(error);
    }
  })();
});


// Function to synchronize checkboxes
function synchronizeCheckboxes(sourceCheckbox, targetCheckboxes) {
  var isChecked = sourceCheckbox.checked;
  var checkboxId = sourceCheckbox.getAttribute("data-checkbox-id");

  targetCheckboxes.forEach(function (targetCheckbox) {
    if (targetCheckbox.getAttribute("data-checkbox-id") === checkboxId) {
      targetCheckbox.checked = isChecked;
    }
  });
}

// Add event listeners for checkboxes under "id=menu_pc"
var pcCheckboxes = document.querySelectorAll("#menu_pc input[type='checkbox'][data-checkbox-id]");
var mobileCheckboxes = document.querySelectorAll("#menu_mobile input[type='checkbox'][data-checkbox-id]");

pcCheckboxes.forEach(function (pcCheckbox) {
  pcCheckbox.addEventListener("change", function () {
    synchronizeCheckboxes(pcCheckbox, mobileCheckboxes);
  });
});

// Add event listeners for checkboxes under "id=menu_mobile"
mobileCheckboxes.forEach(function (mobileCheckbox) {
  mobileCheckbox.addEventListener("change", function () {
    synchronizeCheckboxes(mobileCheckbox, pcCheckboxes);
  });
});




// Function to synchronize checkboxes within a specific section
function synchronizeSectionCheckboxes(masterCheckbox, sectionId) {
  var sectionCheckboxes = document.querySelectorAll("#" + sectionId + " input[type='checkbox'][data-checkbox-id]");

  sectionCheckboxes.forEach(function (checkbox) {
    checkbox.checked = masterCheckbox.checked;
  });
}

// Get the master checkbox within "id=menu_pc"
var pcMasterCheckbox = document.querySelector("#menu_pc input[type='checkbox'][data-checkbox-id='Areamain1']");

// Get the master checkbox within "id=menu_mobile"
var mobileMasterCheckbox = document.querySelector("#menu_mobile input[type='checkbox'][data-checkbox-id='Areamain1']");

// Add event listener for the master checkbox in "id=menu_pc"
pcMasterCheckbox.addEventListener("change", function () {
  synchronizeSectionCheckboxes(pcMasterCheckbox, "sub-searchmenu3");
  synchronizeSectionCheckboxes(pcMasterCheckbox, "sub-searchmenu32");
});

// Add event listener for the master checkbox in "id=menu_mobile"
mobileMasterCheckbox.addEventListener("change", function () {
  synchronizeSectionCheckboxes(mobileMasterCheckbox, "sub-searchmenu3");
  synchronizeSectionCheckboxes(mobileMasterCheckbox, "sub-searchmenu32");
});



function synchronizeSectionCheckboxes2(masterCheckbox, sectionId) {
  var sectionCheckboxes2 = document.querySelectorAll("#" + sectionId + " input[type='checkbox'][data-checkbox-id]");

  sectionCheckboxes2.forEach(function (checkbox) {
    checkbox.checked = masterCheckbox.checked;
  });
}

// Get the master checkbox within "id=menu_pc"
var pcMasterCheckbox2 = document.querySelector("#menu_pc input[type='checkbox'][data-checkbox-id='Areamain2']");

// Get the master checkbox within "id=menu_mobile"
var mobileMasterCheckbox2 = document.querySelector("#menu_mobile input[type='checkbox'][data-checkbox-id='Areamain2']");

// Add event listener for the master checkbox in "id=menu_pc"
pcMasterCheckbox2.addEventListener("change", function () {
  synchronizeSectionCheckboxes2(pcMasterCheckbox2, "sub-searchmenu2");
  synchronizeSectionCheckboxes2(pcMasterCheckbox2, "sub-searchmenu22");
});

// Add event listener for the master checkbox in "id=menu_mobile"
mobileMasterCheckbox2.addEventListener("change", function () {
  synchronizeSectionCheckboxes2(mobileMasterCheckbox2, "sub-searchmenu2");
  synchronizeSectionCheckboxes2(mobileMasterCheckbox2, "sub-searchmenu22");
});


// Function to check or uncheck the master checkbox based on the state of individual checkboxes
function updateMasterCheckbox(masterCheckbox, sectionCheckboxes) {
  var allChecked = true;
  for (var i = 0; i < sectionCheckboxes.length; i++) {
    if (!sectionCheckboxes[i].checked) {
      allChecked = false;
      break;
    }
  }
  masterCheckbox.checked = allChecked;
}

// Add event listener to each checkbox within "id=sub-searchmenu3" and "id=sub-searchmenu32"
var subSearchmenu3Checkboxes = document.querySelectorAll("#sub-searchmenu3 input[type='checkbox'][data-checkbox-id]");
var subSearchmenu32Checkboxes = document.querySelectorAll("#sub-searchmenu32 input[type='checkbox'][data-checkbox-id]");

subSearchmenu3Checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    updateMasterCheckbox(pcMasterCheckbox, subSearchmenu3Checkboxes);
    updateMasterCheckbox(mobileMasterCheckbox, subSearchmenu32Checkboxes);
  });
});

subSearchmenu32Checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    updateMasterCheckbox(pcMasterCheckbox, subSearchmenu3Checkboxes);
    updateMasterCheckbox(mobileMasterCheckbox, subSearchmenu32Checkboxes);
  });
});


function updateMasterCheckbox2(masterCheckbox, sectionCheckboxes) {
  var allChecked = true;
  for (var i = 0; i < sectionCheckboxes.length; i++) {
    if (!sectionCheckboxes[i].checked) {
      allChecked = false;
      break;
    }
  }
  masterCheckbox.checked = allChecked;
}

// Add event listener to each checkbox within "id=sub-searchmenu3" and "id=sub-searchmenu32"
var subSearchmenu3Checkboxes2 = document.querySelectorAll("#sub-searchmenu2 input[type='checkbox'][data-checkbox-id]");
var subSearchmenu32Checkboxes2 = document.querySelectorAll("#sub-searchmenu22 input[type='checkbox'][data-checkbox-id]");

subSearchmenu3Checkboxes2.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    updateMasterCheckbox2(pcMasterCheckbox2, subSearchmenu3Checkboxes2);
    updateMasterCheckbox2(mobileMasterCheckbox2, subSearchmenu32Checkboxes2);
  });
});

subSearchmenu32Checkboxes2.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    updateMasterCheckbox2(pcMasterCheckbox2, subSearchmenu3Checkboxes2);
    updateMasterCheckbox2(mobileMasterCheckbox2, subSearchmenu32Checkboxes2);
  });
});

function referenceportal(url) {
  // Open the URL in a new tab
  window.open(url, '_blank');
}
