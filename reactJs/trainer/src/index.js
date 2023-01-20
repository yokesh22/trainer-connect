import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from './../node_modules/@supabase/supabase-js/dist/module/index';
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

// import SupabaseClient from './../node_modules/@supabase/supabase-js/src/SupabaseClient';
const supabase = createClient(
  "https://ejtkbzcdmptptoxjepdq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdGtiemNkbXB0cHRveGplcGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQxNTM3MjEsImV4cCI6MTk4OTcyOTcyMX0.8CUpJQNh_A3UY36oDhjAwoE72fJxTKQQzcNH5puf35k"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient = {supabase}>
      <App/>
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
