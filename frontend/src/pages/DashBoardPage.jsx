import {useEffect, useState} from "react";
import { getDashboardSummary } from "../api"; 
export default function DashBoardPage() {
  const [data,setData]= useState(null);
  const [loading, setLoading]= useState(true);
  const [error,setError]= useState("");


  useEffect(()=>{
    async function load(){
      try {
        const summary=await getDashboardSummary();
        setData(summary);
        
      } catch (error) {
        setError(err.message);
        
      }finally{
        setLoading(false);
      }
    }
    load();
  },[]);

  if(loading) return <h2> Loading dashboard ....</h2>;
  if(error) return <h2>Error:{error}</h2>;
  return (

    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Total Products</h2>
          <p>{data.totalProducts}</p>
        </div>
        <div className="dashboard-card">
          <h2>Low Stock Items</h2>
          <p>{data.lowStockItems}</p>
        </div>
        <div className="dashboard-card">
          <h2>Recent Movements</h2>
          <p>{data.recentMovements24h}</p>
          
        </div>
      </div>
      <h2>Low Stock Products</h2>
      <ul>
        {data.lowStockProducts.map((item) => (
          <li key={item._id}>
            {item.name} ({item.sku}) - Qty: {item.quantity} / Reorder: {item.reorderLevel}
          </li>
        ))}
      </ul>
    </div>
  );
}
