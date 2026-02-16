const API_BASE="http://localhost:5001/api";
export async function getDashboardSummary(){
    const res= await fetch(`${API_BASE}/dashboard/summary`);
    if(!res.ok){
        throw new Erro("Failed to fetch dashboard summary");
    }
    return res.json();
}

export async function getProducts(){
    const res= await fetch(`${API_BASE}/products`,{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
    if(!res.ok){
        const err= await res.json();
        throw new Error(err.message || "Failed to create product");
    }
    return res.json();
}