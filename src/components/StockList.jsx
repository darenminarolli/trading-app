import { useState,useEffect,  } from "react"
import finnHub from '../apis/finnHub';
import { BsFillCaretDownFill,BsFillCaretUpFill } from "react-icons/bs";
export const StockList=()=>{
  const [stock,setSock]=useState([])  
 const [watchList, setWatchList]=useState(['GOOGL','MSFT','AMZN']);

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
    },[])

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
                    <tr className="table-row" key={stockData.symbol}>
                        <th scope="row">{stockData.symbol}</th>
                        <td>{stockData.data.c}</td>
                        <td className={stockData.data.d>0?'text-success':'text-danger'} >{stockData.data.d} {stockData.data.d>0?  <BsFillCaretUpFill/>: <BsFillCaretDownFill/>}</td>
                        <td className={stockData.data.dp>0?'text-success':'text-danger' } >{stockData.data.dp}{stockData.data.dp>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill/> }</td>
                        <td>{stockData.data.h}</td>
                        <td>{stockData.data.l}</td>
                        <td>{stockData.data.o}</td>
                        <td>{stockData.data.pc}</td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    </div>
}