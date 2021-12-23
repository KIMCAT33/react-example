import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function moreInfo() {
  return window.alert("For more info, call 1-800 blabla");
}

function App() {

  const [search, setSearch] = useState('');
  const [allData, setAllData] = useState({
    city: '',
    country:'',
    temperature: '',
    humidity:'',
    temp_min: '',
    icon: '',
  })

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async (city) => { 
    try {
      const APIKEY = 'fb21f4ebe92e8182ab556f018efcc8bf';
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`);
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        humidity: result.data.main.humidity,
        temp_min: result.data.main.temp_min,
        icon: result.data.weather[0].icon
      })


    }catch(e){
      console.log('API not loaded correctly or loaded for the first time');
    }
  }

  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault();
    fetchData(search);
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
  }  


  return (
  <main>

    <div className="App">
    <img src={'http://openweathermap.org/img/wn/' +allData.icon +'@2x.png'} />
    <form onSubmit={handleSubmit}>
      <input 
      value={search}
      type="text"
      name="city"
      placeholder='City name'
      onChange={handleChange}
      />
      <button for="city">Search</button>
    </form>

   <section>
     <h1>{allData.city}</h1>
     <h2>{allData.country}</h2>
     <h3>Temperature</h3>
     <p>{allData.temperature}F</p>
   </section>
   </div>
   </main>
  );
}

export default App;
