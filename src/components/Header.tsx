import { signInWithPopup, signOut, UserCredential, User } from '@firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { selectUserName, selectUserPhoto, setSignOutState, setUsersLoginDetails } from '../reducks/user/userSlice';
import { useNavigate, NavigateFunction } from "react-router-dom";
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

const Header = () => {

  const dispatch: Dispatch<AnyAction> = useDispatch();
  const navigation: NavigateFunction = useNavigate();
  const username: string = useSelector(selectUserName);
  const userPhoto: string = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setUser(user);
        navigation("/");
      };
    });
  }, [username]);

  const signIn = () => {
    signInWithPopup(auth, provider).then((result: UserCredential) => {
      setUser(result.user);
    }).catch((err) => {
      alert('ログインに失敗しました。');
    });
  };

  const signout = () => {
    signOut(auth).then(() => {
      dispatch(setSignOutState({}));
      navigation("/login");
    }).catch((err) => {
      alert('ログアウトに失敗しました。');
    })
  };

  const setUser = (user: User) => {
    dispatch(
      setUsersLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      })
    )
  }

  return (
    <Nav>
      <Logo src="/images/logo.svg" alt="メインロゴ" width="276" height="150" />
      {
        !username ? (
          <LoginContainer>
            <Login onClick={signIn}>ログイン</Login>
          </LoginContainer>
        ) : (
          <>
            <NavMenu>
              <a>
                <img src="/images/home-icon.svg" alt="ホームアイコン" width="20" height="20" />
                <span>ホーム</span>
              </a>
              <a>
                <img src="images/search-icon.svg" alt="検索アイコン" width="20" height="20" />
                <span>検索</span>
              </a>
              <a>
                <img src="images/watchlist-icon.svg" alt="お気に入りアイコン" width="20" height="20" />
                <span>お気に入り</span>
              </a>
              <a>
                <img src="images/original-icon.svg" alt="オリジナルアイコン" width="20" height="20" />
                <span>オリジナル</span>
              </a>
              <a>
                <img src="images/movie-icon.svg" alt="映画アイコン" width="20" height="20" />
                <span>映画</span>
              </a>
              <a>
                <img src="images/series-icon.svg" alt="シリーズアイコン" width="20" height="20" />
                <span>シリーズ</span>
              </a>
            </NavMenu> 
            <SignOut>
              <UserImg src={userPhoto} alt={username} />
              <DropDown>
                <span onClick={signout} >ログアウト</span>
              </DropDown>
            </SignOut>
          </>
        )
      }
    </Nav>
  )
}

export default Header;

// 以下styled-components
const Nav = styled.header`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
`;

const Logo = styled.img`
  width: 80px;

`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const Login = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
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
    cursor: pointer;

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
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 1px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
      z-index: 1;
    }
  }
`;
