/* Global Variables */
// API key and base weather url
const apiKey = '<api-key>&units=imperial'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const country = 'us' // country code, United States in my case

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// event listener for the generate button, calls the performAction() function
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newZipcode =  document.getElementById('zip').value; // retrieves user entered zip code value
    const feelings = document.getElementById('feelings').value // retrieves user entered feelings value
  
    getData(newZipcode) // passes zip code to getData async function

    .then(function(data){ // then passess data from the api to the postData async function
      postData('/weather', data, feelings)
    })
    .then(updateUI) // finally calls the updateUI function to update the webpage with the retrived data
  }

// getData() function to retrieve data from the weather API
const getData = async (zip)=>{   
    const url = `${baseURL}?zip=${zip},${country}&appid=${apiKey}`; // build the URL

    try {
        const response = await fetch(url);
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

// postData() function to parse the retrieved data for what we need and POST it to the server projectData{} object
const postData = async (url, data, feelings) => {
  const parsedData = {temperature: data.main.temp, date: newDate, userResponse: feelings}
  console.log("Data to send to server:", parsedData);
  try {
      const response = await fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedData),
      });

      const newData = await response.json();
      console.log("Data sent successfully:", newData);
  } catch (error) {
      console.log("error", error);
  }
}

// updateUI() function, calls the server for the stored data and updated the webpage with the information
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('temp').innerHTML = allData.temperature;
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('content').innerHTML = allData.userResponse;

  } catch(error){
    console.log("error", error);
  }
}