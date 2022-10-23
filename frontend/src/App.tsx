import './App.css'
import {Head} from "./components/Head";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Containers} from "./views/Containers";
import {Welcome} from "./views/Welcome";
import {Locations} from "./views/Locations";
import {Context, createContext, useContext, useState} from "react";
import {useApi} from "./hooks/ApiHook";

export const ApiContext: Context<any> = createContext({} as any)


function App() {
    const locationApi = useApi('/api/location')
    const containerApi = useApi('/api/container')

      return (
        <div className="App">

            <ApiContext.Provider value={{locationApi, containerApi}}>
            <Head />
                <Routes>
                    <Route path='containers' element={<Containers/>}/>
                    <Route path='locations' element={<Locations/>}/>
                    <Route path='' element={<Welcome />}/>
                </Routes>
            </ApiContext.Provider>
        </div>
  )
}

export default App
