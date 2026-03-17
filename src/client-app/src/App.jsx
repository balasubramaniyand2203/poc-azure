import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // This calls the Nginx proxy, which we've mapped to /weatherforecast
    fetch('/api/weather')
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status} - Backend not reachable`);
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
      });
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#0078d4' }}>Technophile Weather </h1>
      <p style={{ color: '#666' }}>Infrastructure: AKS (South India) | DB: Azure SQL (Central India)</p>
      
      {error && (
        <div style={{ color: 'red', margin: '20px', padding: '10px', border: '1px solid red', display: 'inline-block' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {data.length > 0 ? data.map((item, index) => (
          <div key={index} style={{ 
            border: '1px solid #ddd', 
            padding: '20px', 
            borderRadius: '12px', 
            minWidth: '180px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            background: '#fff'
          }}>
            {/* Senior Logic: We use || (OR) to support both the 
                Mock Data (summary/temperatureC) and 
                Database Data (city/temp) 
            */}
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
              {item.city || item.summary || "Unknown"}
            </h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '0', color: '#0078d4' }}>
              {item.temp ?? item.temperatureC}°C
            </p>
            {item.date && <small style={{ color: '#999' }}>{item.date}</small>}
          </div>
        )) : !error && (
          <div style={{ marginTop: '40px' }}>
            <div className="loader"></div> {/* You can add a CSS spinner here */}
            <p>Fetching latest weather data...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
