console.log("S'up");
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let locationField = document.querySelector('#location-field');
let forecastField = document.querySelector('#forecast-field');
const unitType = document.querySelector('#getUnit');
const loader = document.querySelector('.loader');
const loaderIcon = document.querySelector('.loader-icon');


weatherForm.addEventListener('click', (e) => {
    e.preventDefault();

    const unit = unitType.value
    const location = search.value;
    
    
    if (location.length === 0) {
        locationField.textContent = 'You must enter a valid address';
        return;
    }

    if (unit === '') {
        locationField.textContent = 'Please specify the unit for the weather';
        return;
    }

    // messageOne.textContent = 'Loading...';
    // forecastField.textContent = '';
    loader.style.display = 'block';
    loader.classList.add('loading');
    loaderIcon.style.display = 'block'; 

    fetch(`http://localhost:3000/weather?address=${location}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                loader.style.display = 'none';
                loaderIcon.style.display = 'none';
                loader.classList.remove('loading');
                // Render the error to the screen
                locationField.textContent = data.error;     
            }
            else {
                loader.style.display = 'none'
                loaderIcon.style.display = 'none';
                loader.classList.remove('loading');
                
                // Render the data to the screen
                locationField.textContent = data.location;
                forecastField.textContent = data.forecast;
            }
        })
})