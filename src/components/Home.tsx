import React, { useEffect } from 'react';
import styled from 'styled-components';
import db from '../firebase';
import { collection, getDocs, QuerySnapshot, DocumentData, CollectionReference, QueryDocumentSnapshot } from "firebase/firestore";
import ImgSlider from './ImgSlider';
import Movies from './Movies';
import Viewer from './Viewer';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName } from '../reducks/user/userSlice';
import { setMovies } from '../reducks/movie/movieSlice';
import { selectNewDisney, selectOriginal, selectRecommend, selectTrending } from '../reducks/movie/movieSlice';
import { MovieData } from '../interface/MovieInterface';

const Home = () => {

  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  // useSelectorはstoreの中のstateの状態を取得できる
  const recommend: MovieData[] = useSelector(selectRecommend);
  const newDisney: MovieData[] = useSelector(selectNewDisney);
  const original: MovieData[] = useSelector(selectOriginal);
  const trending: MovieData[] = useSelector(selectTrending);

  useEffect(() => {
    const moviesCollectionRef: CollectionReference<DocumentData> = collection(db, 'movies');
    let recommends: object[] = [];
    let newDisneys: object[] = [];
    let originals: object[] = [];
    let trendings: object[] = [];
    
    getDocs(moviesCollectionRef).then((snapshot: QuerySnapshot<DocumentData>) => {
      snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        console.log(doc);
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trendings = [...trendings, { id: doc.id, ...doc.data() }];
            console.log(trendings);
            break;
        }
      });

      dispatch(setMovies({
        recommend: recommends,
        newDisney: newDisneys,
        original: originals,
        trending: trendings,
      }));

    }).catch((err) => {
      alert("映画データの取得に失敗しました。");
    })
  }, [username]);

  return (
    <Container>
      <ImgSlider />
      <Viewer />
      <Movies title="あなたへのおすすめ" movies={recommend} />
      <Movies title="新作" movies={newDisney} />
      <Movies title="Disney+オリジナル" movies={original} />
      <Movies title="トレンド" movies={trending} />
    </Container>
  )
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  &:before {
    background: url("/images/home-background.png") center center / cover;        
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}
`;