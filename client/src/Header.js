import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { v4 as uuidv4 } from "uuid";
import logo from "./images/logo.png";
import SearchDrop from "./SearchDrop";
import "./Header.css";
import TemporaryDrawer from "./Drawer";
import Avatar from '@material-ui/core/Avatar'
import { useSelector } from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';


function Header(props) {
    const userData = useSelector(state => state.userData ?? [])
    const { isAdmin } = useSelector(state => state)
    const [drawer, setDrawer] = useState(false);
    const paid = useSelector(state => state.paid)
    const { userName, email } = userData[0] ?? ''
    const uid = useSelector(state => state.uid)
    const [userPoints, setUserPoints] = useState(0)
    const [{ basket }] = useStateValue();
    const [inputSearch, setInputSearch] = useState("");
    const [focus, setFocus] = useState(false);
    const [basketData, setBasketData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);
    const [searchDropFocus, setSearchdropfocus] = useState(false);
    const UserData = useSelector(state => state.userData ?? [])
    let totalItems = 0;
    let display = [];
    let check = false;
    useEffect(() => {
        if (uid && !isAdmin) {
            async function getUserData() {
                const response = await fetch('http://localhost:9000/login/user', {
                    body: JSON.stringify({
                        email: email
                    }),
                    headers: { "Content-type": "application/json" },
                    method: "post"
                });
                const { data } = await response.json();
                setUserPoints(data[0].points)
            }
            getUserData();
        }
    }, [paid])

    useEffect(() => {
        if (uid) {
            async function getBasket() {
                const response = await fetch(
                    `http://localhost:9000/giftstore/basket?userName=${userName}`
                );
                const { data } = await response.json();
                setBasketData(data);
            }
            getBasket();
        }
    }, [basket]);

    useEffect(() => {
        if (inputSearch !== "") {
            async function search() {
                const response = await fetch(
                    `http://localhost:9000/giftstore/search?value=${inputSearch}`
                );
                const { data } = await response.json();
                setSearchedData(data);
            }
            search();
        } else {
            setSearchedData([]);
        }
    }, [inputSearch]);

    if (basketData.length !== 0) {
        basketData.forEach((element) => {
            totalItems = totalItems + element.quantity;
        });
    }
    const newFun = () => {
        setFocus(false)
    }

    if (searchedData !== undefined) {
        const mapSearchData = Object.keys(searchedData)
            .slice(0, searchedData.length > 8 ? 8 : searchedData.length)
            .map((items) => (
                <SearchDrop
                    key={uuidv4()}
                    image={searchedData[items].photo}
                    name={searchedData[items].name}
                    modelNo={searchedData[items].modelNo}
                    newFun={newFun}
                />
            ));
        display =
            searchedData.length !== 0 ? (
                <ol className="search__display">{mapSearchData}</ol>
            ) : (
                    inputSearch !== '' && <div style={{ color: "white" }}>No result Found</div>);
    }
    if (display.length !== 0) {
        check = true;
    }
    const handleBlur = () => {
        if (!searchDropFocus) {
            setFocus(false);
        }
    };
    const handleFocus = () => {
        setFocus(true);
    };

    return (
        <div className="giftheader">
            <nav className="headergift">
                {/* Logo BBB-> Image */}
                <Link to="/giftstore">
                    <img
                        className="header__logogift"
                        // src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
                        src={logo}
                        alt="store logo"
                    />
                </Link>
                {/* Searchbox */}
                <div className="header__searchgift">
                    <input
                        onChange={(e) => setInputSearch(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        type="text"
                        value={inputSearch}
                        className="header__searchInputgift"
                    />
                    <Link
                        to={`/giftstore/products/search?query=${inputSearch}`}
                    >
                        <SearchIcon className="header__searchIcongift" />
                    </Link>
                </div>
                {/* 3-Links */}
                {uid && <div className="header__navgift">
                    {!isAdmin && <div className="header__optiongift header__linkgift">
                        <span className="header__optionLineOnegift">{userPoints}</span>
                        <span className="header__optionLineTwogift">
                            Store Points
                        </span>
                    </div>}
                    <Link to="/history" className="header__linkgift">
                        <div className="header__optiongift">
                            <span className="header__optionLineTwogift">
                                History
                            </span>
                        </div>
                    </Link>

                    {!isAdmin && <Link to="/giftstore/addpoints" className="header__linkgift">
                        <div className="header__optiongift">
                            <span className="header__optionLineTwogift">
                                Add Credits
                            </span>
                        </div>
                    </Link>}

                    {/* Basket Icon/ Items inside basket */}
                    {!isAdmin && <Link to="/checkout" className="header__linkgift">
                        <div className="header__optionBasketgift">
                            <ShoppingBasketIcon />
                            <span className="header__optionLineTwogift header__basketCountgift">
                                {totalItems}
                            </span>
                        </div>
                    </Link>}
                </div>}
                {!uid && <Link to='/' style={{ marginRight: '10px', padding: '0.5rem' }}><HomeIcon /></Link>}
                {!isAdmin ? uid && Object.keys(UserData).map((keys) => {
                    return (
                        <div className='userHeader__rightButton'>
                            <Avatar src={UserData[keys].photo} alt={UserData[keys].userName} onClick={() => setDrawer(!drawer)} />
                        </div>
                    )

                }) : <div className='userHeader__rightButton'>
                        <MenuIcon className="menu__admin btn" style={{ padding: '4px', width: '30px', height: '30px', borderRadius: '4px', backgroundColor: "#3063A5", color: 'white' }} onClick={() => setDrawer(!drawer)} />
                    </div>}

                {drawer ? <TemporaryDrawer isGiftStore={true} /> : ''}
            </nav>
            {focus && (
                <div
                    className="searchDrop"
                    onMouseEnter={() => setSearchdropfocus(true)}
                    onMouseLeave={() => setSearchdropfocus(false)}
                >
                    {display}
                    {check && (
                        (inputSearch !== '' && searchedData.length !== 0) &&
                        < Link
                            className="seemore"
                            to={`/giftstore/products/search?query=${inputSearch}`}
                        >
                            See More...
                        </Link>
                    )}
                </div>
            )
            }
        </div >
    );
}

export default Header;
