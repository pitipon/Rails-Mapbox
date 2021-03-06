import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/pitipon/cjp0d47ef058y2spguhr1k2cv'
    });
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken }));
    

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
        // Create a HTML element for your custom marker
        const element = document.createElement('div');
        element.className = 'marker';
        element.style.backgroundImage = `url('${marker.image_url}')`;
        element.style.backgroundSize = 'contain';
        element.style.width = '25px';
        element.style.height = '25px';
        console.log(333,element);

        new mapboxgl.Marker(element)
          .setLngLat([marker.lng, marker.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(marker.infoWindow.content))
          .addTo(map);
      })

    if (markers.length === 0) {
        map.setZoom(1);
      } else if (markers.length === 1) {
        map.setZoom(14);
        map.setCenter([markers[0].lng, markers[0].lat]);
      } else {
        const bounds = new mapboxgl.LngLatBounds();
        markers.forEach((marker) => {
          bounds.extend([marker.lng, marker.lat]);
        });
        map.fitBounds(bounds, { duration: 5000, padding: 75 })
      }
  }
};

export { initMapbox };