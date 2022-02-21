require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/Layer",
    "esri/views/SceneView"
    ], function (Map, MapView, Layer, SceneView) {
        var map = new Map({
            basemap: "arcgis-light-gray"
        });

        const view = new SceneView({
            container: "viewDiv",
            map: map,
            viewingMode: "global",
            camera: {
                position: [
                    -63.77153412,
                    20.75790715,
                    25512548.00000
                ],
                heading: 0.00,
                tilt: 0.10
            },

            constraints: {
                altitude: {
                    min: 700000
                }
            },
            qualityProfile: "high",
            alphaCompositingEnabled: true,
            highlightOptions: {
                fillOpacity: 0,
                color: "#ffffff"
            },
            environment: {
                background: {
                    type: "color",
                    color: [0, 0, 0, 0]
                },
                atmosphere: null,
                starsEnabled: false
            }
        });

        var nationalParks = Layer.fromPortalItem({
            portalItem: {
                id: "ccb7e9368789451a91269f6976b4dbd9"
            }
        }).then(addLayer)
          .catch(rejection);

        var airports = Layer.fromPortalItem({
            portalItem: {
                id: "6c917a24cbdb4ecf98f49f918a27b906"
            },
        }).then(addLayer)
          .catch(rejection);
  
        var trails = Layer.fromPortalItem({
            portalItem: {
                id: "0086120c2bda4f929a931147a4c6f542"
            } 
        }).then(addLayer)
          .catch(rejection);

        function addLayer(trails) {
          map.add(trails);
        }
        function rejection(error) {
          console.log("Layer failed to load: ", error);
        }
        
        // Button
        usa.style.display = '.esri-button';
        view.ui.add(usa, 'bottom-right');

        usa.addEventListener('click', function() {
            view.goTo({
                position: {
                    x: -95,
                    y: 39,
                    z: 5000000
                },
                tilt: 0,
                heading: 0
            });
        });
});
