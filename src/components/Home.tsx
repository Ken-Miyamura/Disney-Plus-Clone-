import React, { useEffect } from 'react';
import styled from 'styled-components';
import db from '../firebase';
import { collection, onSnapshot, doc, getDocs, setDoc, QuerySnapshot, DocumentData, CollectionReference, QueryDocumentSnapshot } from "firebase/firestore";
import ImgSlider from './ImgSlider';
import Movies from './Movies';
import Viewer from './Viewer';

const Home = () => {

  useEffect(() => {

    const moviesCollectionRef: CollectionReference<DocumentData> = collection(db, 'movies');
    
    getDocs(moviesCollectionRef).then((snapshot: QuerySnapshot<DocumentData>) => {
      const moviesData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        return {id: doc.id, ...doc.data()};
      });
      console.log(moviesData);
    }).catch((err) => {
      alert(err);
    })


    // const snapshot = onSnapshot(collection(db, 'movies'), (doc) => {
    //   console.log(doc);
    // })
    // onSnapshot(collection(db, 'movies'), (snapshot: QuerySnapshot<DocumentData>): void => {
    //   console.log(snapshot);
    // });
  }, []);

  return (
    <Container>
      <ImgSlider />
      <Viewer />
      <Movies />
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