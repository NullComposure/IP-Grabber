// Include your Firebase configuration here
const firebaseConfig = {
    apiKey: 'AIzaSyDbKvWxdKHnFwMBJZbV5lamDqntcZjPX4g',
    authDomain: 'ip-details-58368.firebaseapp.com',
    projectId: 'ip-details-58368',
    storageBucket: 'ip-details-58368.appspot.com',
    messagingSenderId: '815552255425',
    appId: 'G-W1B2WF0VVV'
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firestore database
  const db = firebase.firestore();
  
  document.addEventListener('DOMContentLoaded', function () {
      const apiUrl = 'https://ipapi.co/json/';
  
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              const ipDetails = {
                  ipAddress: data.ip,
                  city: data.city,
                  region: data.region,
                  country: data.country_name,
                  latitude: data.latitude,
                  longitude: data.longitude
              };
  
              // Add the IP details to Firestore
              db.collection('ipInfo').add(ipDetails)
                  .then(docRef => {
                      console.log('IP details added to Firestore with ID:', docRef.id);
                  })
                  .catch(error => {
                      console.error('Error adding IP details to Firestore:', error);
                  });
  
              // Update your HTML content with IP details if needed
              document.getElementById('ip-info').innerHTML = `
                  <strong>IP Address:</strong> ${ipDetails.ipAddress}<br>
                  <strong>City:</strong> ${ipDetails.city}<br>
                  <strong>Region:</strong> ${ipDetails.region}<br>
                  <strong>Country:</strong> ${ipDetails.country}<br>
                  <strong>Latitude:</strong> ${ipDetails.latitude}<br>
                  <strong>Longitude:</strong> ${ipDetails.longitude}<br>
              `;
          })
          .catch(error => {
              console.error('Error fetching IP details:', error);
              document.getElementById('ip-info').innerHTML = 'Failed to fetch IP details';
          });
  });
