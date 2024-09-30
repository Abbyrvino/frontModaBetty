import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QuioscoProvider } from './context/QuioscoProvider.jsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(

    <QuioscoProvider>
         <App/>

    </QuioscoProvider>
 

)
