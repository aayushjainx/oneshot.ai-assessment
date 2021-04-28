import React, { useEffect, useState } from 'react';
import './Header.css';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

function Header() {
  const [show, handleShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  return (
    <div className={`header ${show && 'header__black'}`}>
      <div className='header__contents'>
        <Title level={3} style={{ color: 'white', marginTop: 4 }}>
          ONESHOT.AI{' '}
        </Title>
        <Link to='/dashboard'>
          <Button type='primary' shape='round' size='medium' style={{ marginTop: 4, marginLeft: 15 }}>
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
