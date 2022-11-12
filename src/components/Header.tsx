import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Nav>
      <Logo src="/images/logo.svg" alt="メインロゴ" />
      <NavMenu>
        <a href="">
          <img src="/images/home-icon.svg" alt="ホームアイコン" />
          <span>ホーム</span>
        </a>
        <a href="">
          <img src="images/search-icon.svg" alt="検索アイコン" />
          <span>検索</span>
        </a>
        <a href="">
          <img src="images/watchlist-icon.svg" alt="お気に入りアイコン" />
          <span>お気に入り</span>
        </a>
        <a href="">
          <img src="images/original-icon.svg" alt="オリジナルアイコン" />
          <span>オリジナル</span>
        </a>
        <a href="">
          <img src="images/movie-icon.svg" alt="映画アイコン" />
          <span>映画</span>
        </a>
        <a href="">
          <img src="images/series-icon.svg" alt="シリーズアイコン" />
          <span>シリーズ</span>
        </a>

      </NavMenu>
      <UserImg src="images/group-icon.png" alt="ユーザー画像" />
    </Nav>
  )
}

export default Header;

// 以下styled-components
const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
`;

const Logo = styled.img`
  width: 80px;

`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 20px;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 2px;
      position: relative;

      &:after {
        content: '';
        height: 2px;
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }

    &:hover {
      span:after {
        opacity: 1;
        transform: scaleX(1);
        transition: .2s;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`
