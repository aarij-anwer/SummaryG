import { useState, useEffect } from "react";
import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Search from './components/Search'
import RecentSearches from './components/RecentSearches'
import Title from './components/Title'
import Summary from './components/Summary'
import Review from './components/Review'
import OneWordReview from './components/OneWordReview'
import SimilarContent from './components/SimilarContent'
import Loading from './components/Loading';
import InitialLoad from './components/InitialLoad';
import Material from './components/Material';
import { v4 as uuidv4 } from 'uuid';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  //useState initialization
  const [searchState, setSearchState] = useState("articles");
  const [searchIdState, setSearchIdState] = useState();
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [review, setReview] = useState();
  const [oneWordReview, setOneWordReview] = useState();
  const [similarContent, setSimilarContent] = useState();
  const [recentSearches, setRecentSearches] = useState();
  const [guruCognating, setGuruCognating] = useState(false);
  const [sessionID, setSessionID] = useState();
  const [suggested, setSuggested] = useState();

  useEffect(() => {
    //client side sessionID
    const generatedSessionId = uuidv4();
    sessionStorage.setItem('sessionId', generatedSessionId);
    setSessionID(generatedSessionId);

    axios.get(`https://newsapi.org/v2/everything?q=keyword&apiKey=02456af49f244a95a316691091cd6257`)
      .then((res) => {
        const randomNumber = Math.floor(Math.random() * 100);
        console.log(res.data.articles[randomNumber].url);
        const suggested = {
          url: res.data.articles[randomNumber].url,
          title: res.data.articles[randomNumber].title
        }
        setSuggested(suggested);
      })

  }, []);

  //useEffect initialization
  useEffect(() => {
    axios.get(`/api/searchAPI/?searchIdState=${searchIdState}`)
      .then(res => {
        if (res.data && res.data.content && res.data.content[0]) {
          setTitle(res.data.content[0].title);
          setSummary(res.data.content[0].summary);
          setReview(res.data.content[0].review);
          setOneWordReview(res.data.content[0].oneWordReview);
          setSimilarContent(res.data.content[0].similar);
          setSearchState(res.data.content[0].type);
        } else {
          console.log('Response data structure is not as expected.')
        }
      })
      .catch(error => {
        console.error('Fetching data failed: ', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, [searchIdState]);

  //useEffect initialization for recent searches
  //pass sessionID to only display by sessionID
  useEffect(() => {
    axios.get(`api/recentSearchAPI?sessionID=${sessionID}`)
      .then(res => {
        setRecentSearches(res.data.recentSearches);
      })
      .catch(error => {
        console.error('Fetching data failed: ', error);
      });
  }, [searchIdState, sessionID]);


  return (
    <>
      <Head>
        <title>SummaryAI</title>
        <meta name="description" content="Get rich summaries for articles and awesome reviews for movies/books using the power of ChatGPT!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet"></link>

      </Head>
      <div className="flex">
        <RecentSearches
          searches={recentSearches}
          onSearchSelect={setSearchIdState}
        />

        <main className="flex-grow">
          <Loading guruCognating={guruCognating} />
          <Navigation
            onSearchTypeChange={setSearchState}
            searchType={searchState}
          />
          <Search
            searchType={searchState}
            onSubmit={setSearchIdState}
            setGuruCognating={setGuruCognating}
            sessionID={sessionID} //sessionID will get passed with the API call
          />
          <InitialLoad
            searchIdState={searchIdState}
          />
          <Title
            searchIdState={searchIdState}
            title={title}
          />
          <div className={"flex h-screen bg-gray-200 " + (!searchIdState ? 'hidden' : '')}>
            <div className={"flex-1 p-4 "}>
              <br />
              <Summary summary={summary} />
              <br />
              <Review review={review} similarContent={similarContent} />
            </div>
            <div className={"relative overflow-x-auto shadow-md min-w-[200px] max-w-[400px] sm:w-auto w-1/4 mt-4 pr-4 pl-4 text-sm text-left text-gray-500 dark:text-gray-400" + (!searchIdState ? 'hidden' : '')}>
              <br />
              <OneWordReview oneWordReview={oneWordReview} />
              <br />
              <SimilarContent similarContent={similarContent} />
            </div>
          </div>
          <Material
            name="Recent Searches"
            recentSearches={recentSearches}
            setSearchIdState={setSearchIdState}
          />
        </main>
      </div>
    </>
  )
}