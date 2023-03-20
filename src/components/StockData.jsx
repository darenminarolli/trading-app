import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
export const StockData=({symbol})=>{
    
    const [stockData,setStockData]=useState()
    useEffect(()=>{
       let isMounted=true;
        const fetchData= async ()=>{
            try {
                const response= await finnHub.get("/stock/profile2", {
                    params:{
                        symbol
                    }
                })
                console.log(response)
                if(isMounted){
                    setStockData(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        return ()=>(isMounted=false);
    },[symbol])




    return <div> {stockData && ( 
        
        
        <table className="table mt-2">
        
    <tbody>
            <tr>
                <td>name: {stockData.name}</td>
                <td>Exchange: {stockData.exchange}</td>
                <td>MarketCap: {stockData.marketCapitalization}</td>
            </tr>
            <tr>
                <td>country: {stockData.country}</td>
                <td>Industry: {stockData.finnhubIndustry}</td>
                <td>Shares OutStanding: {stockData.shareOutstanding}</td>
            </tr>
            <tr>
                <td>ticker: {stockData.ticker}</td>
                <td>IPO: {stockData.ipo}</td>
                <td>url: <a href={stockData.weburl}>{stockData.weburl}</a></td>
            </tr>
    </tbody>
</table>
) 
       
} </div>
}