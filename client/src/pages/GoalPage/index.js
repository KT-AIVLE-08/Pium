/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom';
import React from 'react';
import style from './style.css';

export const GoalPage = () => {
  return (
    <div className = 'main'>
      <div className = 'Topmenu'>
          <div className = 'LinksContainer'>
            <Link className = 'LogoMenu1' to = {'/'}>피움 teature's</Link>
            <Link className = 'LogoMenu2' to = {'/login'}>Logout</Link>
          </div>
            <hr></hr>

          <div className = 'Navi'>
            <Link className = 'NavbarMenu1' to = {'/goal'}>학습목표</Link>
            <Link className = 'NavbarMenu2' to = {'/manage'}>시나리오 관리</Link>
            <Link className = 'NavbarMenu3' to = {'/stats'}>통계</Link>
          </div>
      </div>

      <body>
          <div className = 'text1'>
            <h6>내가 만든 시나리오</h6>
          </div>

          <div className = 'sidebar'>
                <li>
                  <Link className = 'scenarioMenu1' to = {'/'}>나의 시나리오</Link>
                  <hr></hr>
                </li>
                <li>
                  <Link className = 'scenarioMenu2' to = {'/'}>학교 시나리오</Link>
                  <hr></hr>
                </li>
                <li>
                  <Link className = 'scenarioMenu3' to = {'/'}>전체 시나리오</Link>
                  <hr></hr>
                </li>
                <li>
                  <Link className = 'scenarioMenu4' to = {'/'}>시나리오 만들기</Link>
                  <hr></hr>
                </li>
          </div>

          <div className = 'screen' style={{backgroundColor: "white"}}>

          </div>
        </body>
      <footer style={{backgroundColor : '#F5F5F5'}}> </footer>
    </div>
  );
};