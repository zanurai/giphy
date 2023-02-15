
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'




const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)


  return (
    <>


      <Navbar />
      {/*<News pageSize={6} country="in" category="general" />*/}
      <LoadingBar

        color='#f11946'
        progress={progress}
      />

      <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={70} country="in" category="general" />
      {/* <News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={6} country="in" category="business" />
      <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={6} country="in" category="entertainment" />
      <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country="in" category="general" />
      <News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={6} country="in" category="health" />
      <News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={6} country="in" category="science" />
      <News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={6} country="in" category="sports" />
  <News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={6} country="in" category="technology" />*/}



    </>
  )


}
export default App;






