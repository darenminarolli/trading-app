import { useState,useEffect} from "react"
import finnHub from '../apis/finnHub';
import { BsFillCaretDownFill,BsFillCaretUpFill } from "react-icons/bs";
import { useGlobalContext } from "../context/watchListContext";
import { useNavigate } from "react-router-dom";
export const StockList=()=>{
  const [stock,setSock]=useState([])  
  const {watchList, deleteStock}=useGlobalContext()
  const navigate= useNavigate() 
    useEffect(()=>{
        let isMounted=true 
        const  fetchData= async ()=>{
            try {
               
                const responses=  await Promise.all(
                    watchList.map((stock)=>{
                        return finnHub.get('/quote',{
                            params:{
                                symbol: stock
                            }
                        })
                    })
                )
           
              
               const data=responses.map((response)=>{
                return {
                    data: response.data,
                    symbol: response.config.params.symbol
                }
               
               })
               console.log(data)
               if (isMounted){
                   setSock(data)
               }
            } catch (error) {
                
            }
        }
        fetchData()

        return ()=> (isMounted=false)
    },[watchList])

    const handleStockSelect=((symbol)=>{
         navigate(`detail/${symbol}`)
    })

    return <div>
        <table className="table hover mt-5">
        <thead style={{color: "rgb(79,89,102)"}}>
            <tr>
                <th className="col">Name</th>
                <th className="col">Last</th>
                <th className="col">Chg</th>
                <th className="col">Chg%</th>
                <th className="col">High</th>
                <th className="col">Low</th>
                <th className="col">Open</th>
                <th className="col">Pclose</th>
            </tr>
        </thead>
        <tbody>
            {stock.map((stockData)=>{
                return(
                    <tr className="table-row" onClick={()=> handleStockSelect(stockData.symbol)} style={{cursor: "pointer"}}  key={stockData.symbol}>
                        <th scope="row">{stockData.symbol}</th>
                        <td>{stockData.data.c}</td>
                        <td className={stockData.data.d>0?'text-success':'text-danger'} >{stockData.data.d} {stockData.data.d>0?  <BsFillCaretUpFill/>: <BsFillCaretDownFill/>}</td>
                        <td className={stockData.data.dp>0?'text-success':'text-danger' } >{stockData.data.dp}{stockData.data.dp>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill/> }</td>
                        <td>{stockData.data.h}</td>
                        <td>{stockData.data.l}</td>
                        <td>{stockData.data.o}</td>
                        <td>{stockData.data.pc} <button className="btn btn-danger btn-sm ml-3 d-inline-block delete-button" onClick={(e)=> {e.stopPropagation() 
                             deleteStock(stockData.symbol)}}>remove</button> </td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    </div>
}