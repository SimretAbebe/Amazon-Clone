import React , {useContext} from "react";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";
import LowerHeader from "./LowerHeader";
import {Link} from 'react-router-dom'
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase";

function Header() {

  const [{user ,basket}, dispatch]=useContext(DataContext)
  const totalitem  =basket?.reduce((amount , item)=>{
    return item.amount + amount
  }, 0)
  return (
    <section className="scroll">
      <section className="header">
        <section className="header__top">
          <div className="header__container">
            {/* Logo */}
            <Link to="/" className="header__logo-link">
              <img
                className="header__logo"
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
              />
            </Link>

            <span className="header__separator"></span>

            {/* Delivery Location */}
            <div className="header__location">
              <p className="header__location-text">Deliverd to</p>
              <span className="header__location-country">Ethiopia</span>
            </div>

            {/* Search Bar */}
            <div className="header__search">
              <select className="header__search-select" name="" id="">
                <option value="">All</option>
              </select>
              <input
                className="header__search-input"
                type="text"
                placeholder="search product"
              />
              <span className="header__search-icon">
                <FaSearch size={30} />
              </span>
            </div>

            {/* Right Section */}
            <div className="header__right">
              {/* Language Selector */}
              <div className="header__language">
                <img
                  className="header__flag"
                  src="https://image.shutterstock.com/image-vector/usa-flag-icons-vector-set-260nw-2491312125.jpg3"
                  alt="flag"
                />
                <select className="header__language-select">
                  <option value="">EN</option>
                </select>
              </div>

              {/* Sign In */}
              <Link to={!user && "/auth"} className="header__account">
                <div className="header__account-box">
                  {user ? (
                    <>
                      <p>Hello {user?.email.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello , Sign In</p>
                      <span>
                        Account & Lists
                      </span>
                    </>
                  )}
                </div>
              </Link>

              {/* Orders */}
              <Link to="/order" className="header__orders">
                <p className="header__orders-return">Returns</p>
                <p className="header__orders-list">& Orders</p>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="header__cart">
                <span className="header__cart-icon">
                  <FaShoppingCart />
                </span>
                <span className="header__cart-count">{totalitem}</span>
              </Link>
            </div>
          </div>
        </section>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
