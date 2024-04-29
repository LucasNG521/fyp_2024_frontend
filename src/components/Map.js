/* global google */
// import React, { useRef, useEffect } from 'react';
// import useGoogleMapsScript from '../hooks/useGoogleMapsScript'; // Adjust this path as needed

// function Map({ lat, lng }) {
//   const mapRef = useRef(null);
//   useGoogleMapsScript('');

//   useEffect(() => {
//     const initializeMap = () => {
//       if (!window.google) {
//         console.error("Google Maps script not loaded");
//         return;
//       }

//       const location = { lat, lng };
//       const map = new google.maps.Map(mapRef.current, {
//         zoom: 8,
//         center: location,
//       });

//       new google.maps.Marker({
//         position: location,
//         map: map,
//       });
//     };

//     // Ensuring the script is loaded before trying to use google maps objects
//     if (window.google) {
//       initializeMap();
//     } else {
//       window.initMap = initializeMap; // Setup a global callback function
//     }
//   }, [lat, lng]);

//   return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
// }

// export default Map;

import React, { useRef, useEffect } from 'react';
import useGoogleMapsScript from '../hooks/useGoogleMapsScript';

function Map({ lat, lng }) {
  const mapRef = useRef(null);
  useGoogleMapsScript('');

  useEffect(() => {
    const checkGoogleMapsAvailability = () => {
      if (window.google && window.google.maps) {
        initMap();
      } else {
        setTimeout(checkGoogleMapsAvailability, 100); // Check every 100ms
      }
    };
  
    checkGoogleMapsAvailability();
  
    function initMap() {
      const location = { lat, lng };
      const map = new google.maps.Map(mapRef.current, {
        zoom: 8,
        center: location,
      });
  
      new google.maps.Marker({
        position: location,
        map: map,
      });
    }
  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
}

export default Map;
