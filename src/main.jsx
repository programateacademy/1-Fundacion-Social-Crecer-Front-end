import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './routes/App'
import { GeneralProvider } from './context/context';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GeneralProvider> 
    <App />
    </GeneralProvider> 
  </React.StrictMode>
)