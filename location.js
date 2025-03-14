// JavaScript code to integrate location picker feature

// Function to get user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to handle successful location retrieval
function showPosition(position) {
    let userLat = position.coords.latitude;
    let userLng = position.coords.longitude;
    document.getElementById("userLocation").value = `${userLat}, ${userLng}`;
}

// Function to handle errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to estimate delivery time
function estimateDeliveryTime(distance) {
    const speed = 15; // Average speed in km/h
    return Math.round((distance / speed) * 60); // Time in minutes
}

// Function to display distance and estimated time
function displayDeliveryInfo() {
    let userLocation = document.getElementById("userLocation").value.split(", ");
    let userLat = parseFloat(userLocation[0]);
    let userLng = parseFloat(userLocation[1]);

    const restLat = 28.5355; // Example restaurant latitude
    const restLng = 77.3910; // Example restaurant longitude

    const distance = calculateDistance(userLat, userLng, restLat, restLng);
    const time = estimateDeliveryTime(distance);

    document.getElementById("deliveryInfo").innerHTML =
        `📍 Restaurant is <b>${distance.toFixed(1)} km</b> away.<br>⏳ Estimated delivery time: <b>${time} minutes</b>`;
}

// Attach event listener to order button
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("orderButton").addEventListener("click", displayDeliveryInfo);
});
