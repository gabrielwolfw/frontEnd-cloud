import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import New from './components/Newfile';
//import Documents from './components/Docs';

const Router = () =>{
    return(

        <BrowserRouter>

              <Header />

              <Routes>

                  <Route exact path= "/" element = {<New/>}/>
                  
              </Routes>
        
        </BrowserRouter>

    );
}

export default Router;