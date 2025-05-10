// import React, { useEffect, useState } from 'react';
// import './Restaurants.css'
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import L from 'leaflet';

// // Define a custom icon for the markers
// const customIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png', // Restaurant icon
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// const Restaurants = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setUserLocation(location);
//           fetchNearbyRestaurants(location);
//         },
//         (error) => {
//           setError('Error getting location: ' + error.message);
//           setLoading(false);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser.');
//       setLoading(false);
//     }
//   }, []);

//   // Fetch nearby restaurants using Overpass API
//   const fetchNearbyRestaurants = async (location) => {
//     try {
//       // Overpass API query to fetch restaurants within 2 km radius
//       const query = `
//         [out:json][timeout:25];
//         (
//           node["amenity"="restaurant"](around:2000,${location.lat},${location.lng});
//           way["amenity"="restaurant"](around:2000,${location.lat},${location.lng});
//           relation["amenity"="restaurant"](around:2000,${location.lat},${location.lng});
//         );
//         out center;
//       `;

//       const encodedQuery = encodeURIComponent(query);
//       const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodedQuery}`);
      
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       const data = await response.json();
      
//       // Transform API response to our restaurant format
//       const nearbyRestaurants = data.elements.map((element, index) => ({
//         id: element.id,
//         name: element.tags?.name || `Restaurant ${index + 1}`,
//         lat: element.lat || element.center.lat,
//         lng: element.lon || element.center.lon,
//         cuisine: element.tags?.cuisine || 'Unknown',
//       })).slice(0, 10); // Limit to 10 restaurants

//       setRestaurants(nearbyRestaurants);
//       setLoading(false);
//     } catch (err) {
//       setError('Error fetching restaurants: ' + err.message);
//       setLoading(false);
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (loading) {
//     return <div>Loading map and restaurants...</div>;
//   }

//   return (
//     <div>
//       <h1>Nearby Restaurants</h1>
//       {userLocation ? (
//         <MapContainer
//           center={userLocation}
//           zoom={13}
//           style={{ height: '500px', width: '100%' }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//           />

//           {/* User's current location */}
//           <Marker position={userLocation}>
//             <Popup>Your location</Popup>
//           </Marker>

//           {/* Nearby restaurants */}
//           {restaurants.map((restaurant) => (
//             <Marker
//               key={restaurant.id}
//               position={{ lat: restaurant.lat, lng: restaurant.lng }}
//               icon={customIcon}
//             >
//               <Popup>
//                 <div>
//                   <strong>{restaurant.name}</strong>
//                   <br />
//                   Cuisine: {restaurant.cuisine}
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       ) : (
//         <p>Unable to load map</p>
//       )}

//       {restaurants.length > 0 && (
//         <div className="restaurant-list">
//           <h2>Restaurants Nearby:</h2>
//           <ul>
//             {restaurants.map((restaurant) => (
//               <li key={restaurant.id}>
//                 {restaurant.name} - {restaurant.cuisine}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Restaurants;

import React, { useEffect, useState } from 'react';
import './Restaurants.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// IMPORTANT: Replace with your actual Yelp API key
const YELP_API_KEY = 'ar7HvP9_Q_Hll3n5ssoNwuwO6gEa8kGxhHm9HOc8htgQsUQELbzuyAXKGwUY49yDAOXdyObN4svQTgSnlWBuhtxpRY2GpdprBugOpBhJvMeJukoFHPVaOv_x4vBZZ3Yx';

// Define a custom icon for the markers
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Restaurants = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          fetchNearbyRestaurants(location);
        },
        (error) => {
          setError('Error getting location: ' + error.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  // Fetch nearby restaurants using Yelp Fusion API
  const fetchNearbyRestaurants = async (location) => {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${location.lat}&longitude=${location.lng}&radius=2000&limit=10`, {
        headers: {
          'Authorization': `Bearer ${YELP_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error Response:", errorMessage);
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      
      // Transform Yelp API response to our restaurant format
      const nearbyRestaurants = data.businesses.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        lat: restaurant.coordinates.latitude,
        lng: restaurant.coordinates.longitude,
        cuisine: restaurant.categories.map(cat => cat.title).join(', '),
        rating: restaurant.rating,
        address: restaurant.location.address1,
        phone: restaurant.phone,
        imageUrl: restaurant.image_url
      }));
  
      setRestaurants(nearbyRestaurants);
      setLoading(false);
    } catch (err) {
      setError('Error fetching restaurants: ' + err.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Nearby Restaurants</h1>
      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />

          {/* User's current location */}
          <Marker position={userLocation}>
            <Popup>Your location</Popup>
          </Marker>

          {/* Nearby restaurants */}
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <strong>{restaurant.name}</strong>
                  <br />
                  Cuisine: {restaurant.cuisine}
                  <br />
                  Rating: {restaurant.rating} / 5
                  <br />
                  Address: {restaurant.address}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Unable to load map</p>
      )}

      {restaurants.length > 0 && (
        <div className="restaurant-list">
          <h2>Restaurants Nearby:</h2>
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                {restaurant.name} - {restaurant.cuisine} (Rating: {restaurant.rating})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Restaurants;