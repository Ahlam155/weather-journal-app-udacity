/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();
const basicUrl="http://api.openweathermap.org/data/2.5/weather?zip="
const myApiKey="&appid=c94dc7b0b3ed733ddd7b12c27a0d2aa5&units=metric";
const zipElement=document.getElementById('zip');
const feelings=document.getElementById('feelings');

/* Function called by event listener */

function generator()
{
    // get user input values
    const zip=zipElement.value;
    const feelingContent=feelings.value;
    gettingWeatherData(basicUrl,zip,myApiKey).then((data)=>
    {
        postData('/add', { date: newDate, temp: data.main.temp, feelingContent})

    }
    )
    .then(function (myData) {
        // call updateUI to update browser content
        update()
      })

}
/* Function to GET Web API Data*/
const gettingWeatherData = async (basicUrl,zip,myApiKey) => 
{
    
    const res = await fetch(`${basicUrl}${zip}${myApiKey}`);
    try {
        // userData equals to the result of fetch function
        const UserData = await res.json();
        return UserData;
      } 
      catch (error)
       {
        console.log(`Error: ${error}`);
      }

}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        { date: data.date,
          temp: data.temp,
          content: data.feelingContent }
        )
    })
  
    try {
      const myData = await req.json();
      return myData;
    }
    catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  //updating UI
const update = async () => {
    const req = await fetch('/all');
    try {
    const myInformation = await req.json()
   const myDate="The Date";
   const myTemp="The Temp";
   const myContent="Your Feeling";
   const date=document.getElementById('date');
   const temp=document.getElementById('temp');
   const content=document.getElementById('content');

    temp.innerHTML = `${ myTemp} : ${myInformation.temp}`;
    date.innerHTML = `${ myDate} : ${myInformation.date}`;
    content.innerHTML =`${myContent} : ${myInformation.content}`;
    }
    catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  // Event listener to add function to existing HTML DOM element

  document.getElementById('generate').addEventListener('click', generator);
