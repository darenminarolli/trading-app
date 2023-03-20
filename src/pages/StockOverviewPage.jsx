import { AutoComplete } from "../components/AutoComplete"
import { StockList } from "../components/StockList"
import logo from '../img/logo.png';

export const StockOverviewPage=()=>{
    return <div>
    <img src={logo} alt="logo" className="img-fluid mx-auto d-block"/>
    <AutoComplete/>
    <StockList/>
    </div>
}