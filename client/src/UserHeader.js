import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar'
import './UserHeader.css'
import TemporaryDrawer from "./Drawer";
import PopResult from "./PopResult";
import PartyD from './PartyD.js';
import UserD from './UserD.js';
import ZoneD from './ZoneD.js';
function UserHeader() {
    const [drawer, setDrawer] = useState(false);
    const [Data, setData] = useState(PartyD);
    const [search, setsearch] = useState('');
    const [drop, setdrop] = useState(false)
    const handleChange=(e)=>{
        switch(e.target.value){
            case 'Party Palace':
                setData(PartyD)
                break;
            case 'User':
                setData(UserD);
                break;
            case 'Zone':
                setData(ZoneD);
                break;

        }
    }
    const updateSearch=(event)=>{
        setdrop(true);
        setsearch(event.target.value.substr(0,20));
    }
    let filter=Data?.filter(
        (PartyPalace)=>{
            return PartyPalace.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
        }
        );
    return (
        <div className="userHeader">
            <div className="userHeader__logo">
                <h1><Link to="/User" className="userHeader__link">BBB</Link></h1>
            </div>
            <div className="userHeader__search">
                <div className='userHeader__input'>
                    <select className="userHeader__select" onChange={handleChange}>
                        <option value="Party Palace">PartyPalace</option>
                        <option value='Zone'>Zone</option>
                        <option value='User'>User</option>
                        <option value='Band'>Band</option>
                    </select>
                    <input type='search' onChange={updateSearch} value={search} />
                    <SearchIcon className="userHeader__icon" /><br />
                </div>
                <div className="userHeader__suggestion">
                    {drop?
                    <ul>
                        <li>Babin</li>
                        {filter.map((PP)=>{
                            return <li>
                                {PP.name}<br/>
                                </li>
                        })}
                    </ul> : ''}
                </div>
            </div>
            <div className="userHeader__right">
                <Link to='/Party' className="userHeader__link">Party Palaces</Link>
                <Link to='/Band' className="userHeader__link">Bands</Link>
                <Link to='/giftstore' className="userHeader__link">Gift Store</Link>
                <Avatar src="fggdfg" alt="Babin Khatri" onClick={() => setDrawer(!drawer)} />
                {drawer ? <TemporaryDrawer /> : ''}
            </div>
        </div>
    )
}

export default UserHeader
