import {createContext, useEffect} from 'react';
import React, {useState} from 'react';
import Login from '../screens/login';
import AppNavigator from './AppNavigator';
import Splash from '../screens/splash';

export const GlobalContext = createContext({
  genres: [],
  headers: {},
});

export function GlobalContextProvider() {
  const [genres, setGenres] = useState([]);
  const [showSplash, setSplash] = useState(true);
  let value = {
    genres,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmFiNzYzZDg5YzBkZTU3ZWM5ZjhiYzljZTc5YjM1MSIsInN1YiI6IjY0N2JmNDZhOTM4MjhlMDExNjI0YWZhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.396b6oxdp2hkYYXZVbX98u4Remj4nNeZSF852EnGzIQ',
    },
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list', {
      headers: value.headers,
    })
      .then(response => response.json())
      .then(response => {
        setGenres(response?.genres);
        setTimeout(() => {
          setSplash(false);
        }, 2000);
      })
      .catch(err => {
        console.error(err);
        setSplash(false);
      });
  }, [value.headers]);
  return (
    <GlobalContext.Provider value={value}>
      {showSplash ? <Splash /> : <AppNavigator />}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
