let search = document.querySelector('.search-box');
let searchIcon = document.querySelector('#search-icon');
let searchInput = document.querySelector('#search-input'); // Reference to the search input field

// Toggle search box visibility
searchIcon.addEventListener('click', () => {
    search.classList.toggle('active'); // Toggle active class
});

// Close search box when clicking outside of it
document.addEventListener('click', (event) => {
    // Check if the click was outside the search box and the search icon
    if (!search.contains(event.target) && !searchIcon.contains(event.target)) {
        search.classList.remove('active'); // Hide the search box
    }
});

// Close search box when pressing the Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        search.classList.remove('active'); // Hide the search box
    }
});

// Submit search on pressing Enter
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if inside a form
        const query = searchInput.value.trim(); // Get the search input value

        if (query) {
            console.log(`Searching for: ${query}`); // Replace this with actual search functionality
            // Here you can add your search functionality (e.g., redirecting to a search results page)
            // For example, redirect to a search results page:
            // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }
});

// Smooth scrolling for anchor links (optional)
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target   
 = this.getAttribute('href');
    const section = document.querySelector(target);

    if (section) {
      const sectionTop = section.offsetTop;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
      });
    }
  });
});

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle login logic here, e.g., send form data to a server-side script
  console.log('Login form submitted');
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Handle signup logic here, e.g., send form data to a server-side script
  console.log('Signup form submitted');
});

// Simulated user authentication status
// Change this to your actual logic for checking if a user is logged in
var isLoggedIn = false; // This should be replaced with actual logic, e.g., checking a token

function loginOrSignup() {
    document.getElementById('shop-now-btn').addEventListener('click', function() {
        // alert("Button clicked!");
        if (isLoggedIn) {
            // If the user is logged in, redirect to the shop page
            window.location.href = 'index.html'; // Replace with your actual shop page
        } else {
            // If the user is not logged in, ask them to log in or sign up
            let userChoice = confirm('Are you a registered customer? Press OK to login, Cancel to sign up.');
    
            if (userChoice) {
                // User chose to login
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                // User chose to sign up
                window.location.href = 'signup.html'; // Redirect to signup page
            }
        }
    });
    
}


// Google Maps
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -1.2833, lng: 36.8167 }, // Nairobi coordinates
      zoom: 13,
    });
  
    // Add a marker to the coffee shop location
    const marker = new google.maps.Marker({
      position: { lat: -1.2833, lng: 36.8167 },
      map: map,
    });
  }
  
  // OpenWeather API
  function displayWeather() {
    const weatherData = JSON.parse(localStorage.getItem("weatherData"));
    if (weatherData) {
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      document.getElementById("weather").textContent = `Current weather: ${temperature}°C, ${description}`;
    } else {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=Nairobi,Kenya&appid=016a2b30ca738e6f0408bbcbf88d823c")
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("weatherData", JSON.stringify(data));
          displayWeather();
        })
        .catch(error => console.error("Error fetching weather data:", error));
    }
  }
  
  // Yelp Fusion API
  function displayYelpReviews() {
    const yelpData = JSON.parse(localStorage.getItem("yelpData"));
    if (yelpData) {
      const reviews = yelpData.businesses.map(business => business.name + ": " + business.rating);
      document.getElementById("yelpReviews").textContent = reviews.join("\n");
    } else {
      fetch("https://api.yelp.com/v3/businesses/search?location=Nairobi,Kenya&term=coffee&limit=10", {
        headers: {
          Authorization: "Bearer YOUR_API_KEY"
        }
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("yelpData", JSON.stringify(data));
          displayYelpReviews();
        })
        .catch(error => console.error("Error fetching Yelp data:", error));
    }
  }
  
  // Unsplash API
  function displayUnsplashImages() {
    const unsplashData = JSON.parse(localStorage.getItem("unsplashData"));
    if (unsplashData) {
      const images = unsplashData.results.map(image => `<img src="${image.urls.small}" alt="${image.description}">`);
      document.getElementById("unsplashImages").innerHTML = images.join("");
    } else {
      fetch("https://api.unsplash.com/search/photos?query=coffee&client_id=YOUR_API_KEY")
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("unsplashData", JSON.stringify(data));
          displayUnsplashImages();
        })
        .catch(error => console.error("Error fetching Unsplash data:", error));
    }
  }
  
  // Call functions to display data
  initMap();
  displayWeather();
  displayYelpReviews();
  displayUnsplashImages();


//  More Logic to be completed later

//1. OpenWeatherMap API Usage
// Obtain an API key: Get your API key from OpenWeatherMap.
// Construct the API URL: Use the base URL https://api.openweathermap.org/data/2.5/weather and append the city name and your API key.
// Make an HTTP request: Use JavaScript's fetch API to make a GET request to the constructed URL.
// Handle the response: Parse the JSON response to extract weather data.
// Display the weather information: Update your website's UI to show the current temperature, description, and other relevant weather details.
// Update the menu: Based on the weather conditions, suggest appropriate drinks and food items. For example, suggest iced drinks on sunny days and hot drinks on rainy days.
// Additional considerations:

// Cache weather data: Store the fetched weather data locally to avoid making unnecessary API calls.
// Handle errors: Implement error handling to gracefully handle cases where the API request fails.
// Customize menu suggestions: Tailor the menu suggestions to your specific coffee shop offerings and preferences.
// Consider other weather factors: Explore additional weather data points from the API (e.g., humidity, wind speed) to provide more specific recommendations.
// By following these steps and considering the additional factors, you can effectively integrate the OpenWeatherMap API into your coffee shop website to enhance the user experience and provide relevant information to your customers.





//2. Google Maps Logic:

// Obtain an API key: Get your API key from Google Maps Platform.
// Include the Google Maps JavaScript API: Add the following script tag to your HTML file, replacing YOUR_API_KEY with your actual API key:
// HTML
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
// Initialize the map: In your JavaScript code, define a function named initMap that will be called when the Google Maps API is loaded. Inside this function:
// Create a new google.maps.Map object, specifying the container element (e.g., a <div> with an ID) and map options like center coordinates and zoom level.
// Add markers: Use google.maps.Marker objects to add markers to specific locations on the map. Specify the marker's position (latitude and longitude) and add it to the map.
// Customize the map: You can customize the map's appearance and behavior using various options and events provided by the Google Maps API. For example, you can add different map types (road, satellite, hybrid), enable pan and zoom controls, and handle user interactions like clicks and drags.
// Example Script 
// function initMap() {
//     const map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -1.2833, lng: 36.8167 }, // Nairobi coordinates
//       zoom: 13,
//     });
  
//     // Add a marker to the coffee shop location
//     const marker = new google.maps.Marker({
//       position: { lat: -1.2833, lng: 36.8167 },
//       map: map,
//     });
//   }





//3.  Unsplash API Logic:

// Obtain an API key: Get your API key from Unsplash.
// Construct the API URL: Use the base URL https://api.unsplash.com/search/photos and append the query term (e.g., "coffee") and your API key.
// Make an HTTP request: Use JavaScript's fetch API to make a GET request to the constructed URL.
// Handle the response: Parse the JSON response to extract the image URLs and other metadata.
// Display the images: Use the image URLs to display the images on your website.
// Example Script
// fetch("https://api.unsplash.com/search/photos?query=coffee&client_id=YOUR_API_KEY")
//   .then(response => response.json())
//   .then(data => {
//     const images = data.results.map(image => `<img src="${image.urls.small}" alt="${image.description}">`);
//     document.getElementById("images").innerHTML = images.join("");
//   })
//   .catch(error => console.error("Error fetching Unsplash data:", error));


//4.  Yelp Fusion API Logic:

// Obtain an API key: Get your API key from Yelp Fusion.
// Construct the API URL: Use the base URL https://api.yelp.com/v3/businesses/search and append the search query (e.g., "coffee") and other parameters like location and limit.
// Make an HTTP request: Use JavaScript's fetch API to make a GET request to the constructed URL, including the authorization header with your API key.
// Handle the response: Parse the JSON response to extract business information and reviews.
// Display the data: Use the extracted data to display business information and reviews on your website.
// Example Script
// fetch("https://api.yelp.com/v3/businesses/search?location=Nairobi,Kenya&term=coffee&limit=10", {
//     headers: {
//       Authorization: "Bearer YOUR_API_KEY"
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       const reviews = data.businesses.map(business => business.name + ": " + business.rating);
//       document.getElementById("reviews").innerHTML = reviews.join("\n");
//     })
//     .catch(error => console.error("Error fetching Yelp data:", error));