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
        <div className='header__left'>
          <Title level={3} style={{ color: 'white', marginTop: 4 }}>
            ONESHOT.AI{' '}
          </Title>
          <Link to='/dashboard'>
            <Button type='primary' shape='round' size='medium' style={{ marginTop: 4, marginLeft: 15 }}>
              Dashboard
            </Button>
          </Link>
        </div>
        <div className='header__right'>
          <a target='_blank' href='https://github.com/aayushjain7'>
            <img
              src='https://camo.githubusercontent.com/4133dc1cd4511d4a292b84ce10e52e4ed92569fb2a8165381c9c47be5edc2796/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f706e672f6769746875622e706e67'
              width='40'
              alt='github'
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
