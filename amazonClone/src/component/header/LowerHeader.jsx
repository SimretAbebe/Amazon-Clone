import React from 'react'
import { FaBars } from "react-icons/fa";
import './LowerHeader.css';

function LowerHeader() {
  return (
    <div className="lower__container">
      <ul>
        <li>
          <FaBars />
          <p>All</p>
        </li>
        <li>Today's Deal</li>
        <li>Costumer Services</li>
        <li>Registery</li>
        <li>Cift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader