import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router-dom";
import { router } from './Route/router';
import ContextProviderr from './provider/ContextProviderr';
import { Provider } from 'react-redux';
import store from './redux/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProviderr>
        <RouterProvider router={router} />
      </ContextProviderr>
    </Provider>
  </React.StrictMode>,
)
