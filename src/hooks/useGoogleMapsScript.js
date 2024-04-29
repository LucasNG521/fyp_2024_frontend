/* global google */
// import { useEffect } from 'react';

// const useGoogleMapsScript = (apiKey) => {
//   useEffect(() => {
//     const scriptId = 'google-maps-script';
//     // Check if script is already present in the document
//     const existingScript = document.getElementById(scriptId);
//     if (!existingScript) {
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//       script.id = scriptId;
//       script.async = true;
//       script.defer = true;
//       document.head.appendChild(script);

//       return () => {
//         // Remove script from the document when the component unmounts
//         const loadedScript = document.getElementById(scriptId);
//         if (loadedScript) {
//           document.head.removeChild(loadedScript);
//         }
//       };
//     }
//   }, [apiKey]);
// };

// export default useGoogleMapsScript;




// import { useEffect } from 'react';

// const useGoogleMapsScript = (apiKey) => {
//   useEffect(() => {
//     const scriptId = 'google-maps-script';

//     // If the script already exists, don't add it again
//     if (document.getElementById(scriptId)) {
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//     script.id = scriptId;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     return () => {
//       // Clean up the script when the component unmounts
//       const existingScript = document.getElementById(scriptId);
//       if (existingScript) {
//         document.head.removeChild(existingScript);
//       }
//     };
//   }, [apiKey]); // Only re-run effect if apiKey changes
// };

// export default useGoogleMapsScript;



// import { useEffect } from 'react';

// const useGoogleMapsScript = (apiKey) => {
//   useEffect(() => {
//     const scriptId = 'google-maps-script';
//     const existingScript = document.getElementById(scriptId);
//     if (existingScript) {
//       return; // Script already loaded or loading
//     }

//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//     script.id = scriptId;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       if (window.initMap) {
//         window.initMap(); // Ensure initMap is called after script is loaded
//       }
//     };

//     return () => {
//       const loadedScript = document.getElementById(scriptId);
//       if (loadedScript) {
//         document.head.removeChild(loadedScript);
//       }
//     };
//   }, [apiKey]);
// };

// export default useGoogleMapsScript;


import { useEffect } from 'react';

const useGoogleMapsScript = (apiKey) => {
  useEffect(() => {
    const scriptId = 'google-maps-script';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      // If script is already loaded or loading, do nothing
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.initMap) {
        window.initMap(); // Ensure initMap is called after the script is loaded
      }
    };

    return () => {
      // Cleanup the script from the document to prevent duplicates in future render cycles
      const loadedScript = document.getElementById(scriptId);
      if (loadedScript) {
        document.head.removeChild(loadedScript);
      }
      
    //   document.head.removeChild(script);
    };
  }, [apiKey]); // Dependency array includes apiKey to handle changes
};

export default useGoogleMapsScript;
