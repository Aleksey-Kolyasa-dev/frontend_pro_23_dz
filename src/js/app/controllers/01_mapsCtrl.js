class mapsCtrl {
    constructor($scope, $log, ResourceService, toastr) {
        this.init($scope, $log, ResourceService, toastr);
    }

    init($scope, $log, ResourceService, toastr) {
        // Default Values
        let map = null;
        let sessionMarkers = [];
        let userMarkers = [];

        /*
         *  MAP
         * */
        DG.then(function () {
            // Map init
            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });

            // Show User Location
            map.locate({setView: true, watch: true})
                .on('locationfound', function (e) {
                    DG.marker([e.latitude, e.longitude]).addTo(map);
                })
                .on('locationerror', function (e) {
                    DG.popup()
                        .setLatLng(map.getCenter())
                        .setContent('Доступ к определению местоположения отключён')
                        .openOn(map);
                });

            // Add Marker to Map
            map.on('click', function (e) {
                let marker = DG.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

                sessionMarkers.push(marker);
                userMarkers.push(marker._latlng);

            });
        });

        /*
         *  MARKERS
         * */
        $scope.markers = {
            save: function () {
                ResourceService._ajaxRequest("PUT", "users/saveMarkers/" + $scope.currentUser._id, userMarkers).then(
                    (data) => {
                        toastr.success('MARKERS SAVED');
                        $log.log('MARKERS SAVED');
                    });
            },

            load: function () {
                // Reset Markers
                this.clear(true);

                ResourceService._ajaxRequest("GET", "users/getMarkers/" + $scope.currentUser._id).then(
                    (response) => {
                        if (response.data.length) {
                            // Fill in the userMarkers Array
                            userMarkers = response.data;

                            let layer = DG.marker;

                            angular.forEach(userMarkers, (marker) => {
                                if (marker.lat && marker.lng) {
                                    let newMarker = layer([marker.lat, marker.lng]).addTo(map);
                                    // Add to sessionMarkers Array
                                    sessionMarkers.push(newMarker);
                                }
                            });
                            toastr.info('MARKERS LOADED');
                        } else {
                            $log.log(`NO ANY MARKER WAS FOUND`);
                            toastr.error(`NO ANY MARKER WAS FOUND`);
                        }
                    });
            },

            clear: function (flag) {
                if (sessionMarkers.length) {
                    // Remove Markers from Map
                    angular.forEach(sessionMarkers, (marker) => {
                        marker.remove();
                    });
                    // Reset sessionMarkers Array
                    sessionMarkers.length = 0;
                }
                if (userMarkers.length) {
                    // Reset userMarkers Array
                    userMarkers.length = 0
                }
                if (!flag) {
                    toastr.warning('MARKERS REMOVED');
                }
            }
        };
    }
}
mapsCtrl.$inject = ['$scope', '$log', 'ResourceService', 'toastr'];

export {mapsCtrl};