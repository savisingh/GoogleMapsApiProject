var map;
var largeInfoWindow;

function errorHandling() {

        alert("Google Maps are not available. Please try again later!!!");
    }
    
// Function to initialize the map within the map div
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 52.952387,
            lng: -1.159550
        },
        zoom: 13
    });

    largeInfoWindow = new google.maps.InfoWindow();


    var markers = [];
    var filteredMarkers = [];

    var markerRed;

    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var street = locations[i].street;
        var city = locations[i].city;
        var postcode = locations[i].postcode;
        var country = locations[i].country;
        locations[i].marker = marker;
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP,
            title: title,
            street: street,
            city: city,
            postcode: postcode,
            country: country,
            id: i
        });

        markers.push(marker);
        marker.addListener('click', function() {
            if (markerRed) {
                markerRed.setIcon('https://www.google.com/mapfiles/marker.png');
            }
            populateInfoWindow(this, largeInfoWindow);
        });



    }

     function populateInfoWindow(marker, infoWindow) {
              if (infoWindow.marker != marker) {
               infoWindow.marker = marker;
               infoWindow.close();
               infoWindow.setContent('<h3>' + marker.title + '</h3>' + '<p>' + marker.street + '<br/>' + marker.city + '<br/>' + marker.postcode + '<br/>' + marker.country + '</p>');
               infoWindow.open(map, marker);
               marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
               markerRed = marker;
               infoWindow.addListener('closeclick', function() {
                 infoWindow.setMarker(null);
                 if (markerRed) {
                   markerRed.setIcon('https://www.google.com/mapfiles/marker.png');
                 }
               });
             }
           }

}


var locations = [{
        title: 'Wollaton Park',
        street: 'Wollaton Rd',
        city: 'Nottingham',
        postcode: 'NG8 2AE',
        country: 'UK',
        location: {
            lat: 52.947493,
            lng: -1.206680
        }
    },
    {
        title: 'Nottingham Castle, Museum & Art Gallery',
        street: 'Lenton Rd',
        city: 'Nottingham',
        postcode: 'NG1 6EL',
        country: 'UK',
        location: {
            lat: 52.949619,
            lng: -1.154347
        }
    },
    {
        title: 'The University of Nottingham, Jubilee Campus',
        street: '7301 Wollaton Rd',
        city: 'Nottingham',
        postcode: 'NG8 1BB',
        country: 'UK',
        location: {
            lat: 52.952218,
            lng: -1.182875
        }
    },
    {
        title: 'Nottingham Trent University',
        street: '50 Shakespeare St',
        city: 'Nottingham',
        postcode: 'NG1 4FQ',
        country: 'UK',
        location: {
            lat: 52.958571,
            lng: -1.151719
        }
    },
    {
        title: 'Bilborough Park',
        street: '',
        city: 'Nottingham',
        postcode: 'NG8 3BU',
        country: 'UK',
        location: {
            lat: 52.967846,
            lng: -1.221463
        }
    },
    {
        title: 'Nottingham Racecourse',
        street: 'Colwick Park',
        city: 'Nottingham',
        postcode: 'NG2 4BE',
        country: 'UK',
        location: {
            lat: 52.947352,
            lng: -1.114382
        }
    },
    {
        title: 'intu Victoria Centre',
        street: '',
        city: 'Nottingham',
        postcode: 'NG1 3QN',
        country: 'UK',
        location: {
            lat: 52.958344,
            lng: -1.148237
        }
    }
];

var Location = function(data) {
    this.title = ko.observable(data.title);
    this.street = ko.observable(data.street);
    this.city = ko.observable(data.city);
    this.postcode = ko.observable(data.postcode);
    this.country = ko.observable(data.country);
    this.marker = ko.observable(data.marker);
}

var ViewModel = function() {

    var self = this;
	self.query = ko.observable('');
    self.locationList = ko.observableArray();
    
    locations.forEach(function(location) {
        self.locationList.push(new Location(location));
    });
    
    self.filteredLocations = ko.computed(function() {
    	if (!self.query()) {
    		return self.locationList();
    	} else {
    		return self.locationList().filter(place => place.title().toLowerCase().indexOf(self.query().toLowerCase()) > -1);
     	}
    });	
}

ko.applyBindings(new ViewModel());