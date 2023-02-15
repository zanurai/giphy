import React, { useState } from 'react';
import { useEffect } from 'react';
import PropsType from 'prop-types'
import NewItem from './NewItem';
import Spainner from './Spainner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  //const pageSize = 7;
  const [articles, setArticles] = useState([]);
  const [giphy, setGiphy] = useState(true);
  const [totalResults, setTotalResult] = useState(0)
  const [page, setPage] = useState(1)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }


  /* const articles = [
     {
       "source": {
         "id": null,
         "name": "YouTube"
       },
       "author": null,
       "title": "Alexander Volkanovski Octagon Interview | UFC 284 - UFC - Ultimate Fighting Championship",
       "description": "Alexander Volkanovski chats with Michael Bisping at UFC 284 after his loss to Islam Makhachev. Subscribe to get all the latest UFC content: https://ufc.ac/3u...",
       "url": "https://www.youtube.com/watch?v=w-P1co1HSYc",
       "urlToImage": "https://i.ytimg.com/vi/w-P1co1HSYc/maxresdefault.jpg",
       "publishedAt": "2023-02-12T06:05:34Z",
       "content": null
     },
     {
       "source": {
         "id": null,
         "name": "Food Safety News"
       },
       "author": "News Desk",
       "title": "Health officials warn of norovirus spike in England; 66 percent more cases - Food Safety News",
       "description": "Health officials in the United Kingdom have warned about a sharp increase in confirmed cases of norovirus. National surveillance data shows laboratory",
       "url": "https://www.foodsafetynews.com/2023/02/health-officials-warn-of-norovirus-spike-in-england-66-percent-more-cases/",
       "urlToImage": "https://images.bannerbear.com/direct/y0aJ23zRDdqMxX4OGl/requests/000/033/962/733/Lvpkalx2D6Bo58xRQWE7rB3Xq/937de443f3910284bef4102232829219546620ba.png",
       "publishedAt": "2023-02-12T05:09:51Z",
       "content": "Health officials in the United Kingdom have warned about a sharp increase in confirmed cases of norovirus.\r\nNational surveillance data shows laboratory reports of the virus in England are 66 percent … [+2829 chars]"
     },
     {
       "source": {
         "id": null,
         "name": "Bright Side of the Sun"
       },
       "author": "Trevor_Booth",
       "title": "Seven potential targets for the Phoenix Suns in the buyout market - Bright Side Of The Sun",
       "description": "Here’s how the Suns could boost their depth after their acquisition of Kevin Durant.",
       "url": "https://www.brightsideofthesun.com/2023/2/11/23595897/phoenix-suns-buyout-market-acquisitions-reggie-jackson-will-barton-serge-ibaka",
       "urlToImage": "https://cdn.vox-cdn.com/thumbor/4cRR1EumaG9OeisjS6jYS_WubyY=/0x0:4037x2114/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24426662/usa_today_19488807.jpg",
       "publishedAt": "2023-02-12T04:35:23Z",
       "content": "The Phoenix Suns made one of the biggest moves in their franchises history with their acquisition of superstar forward Kevin Durant, who is perhaps the piece the team needs to push it to its first-ev… [+7595 chars]"
     },
     {
       "source": {
         "id": "the-washington-post",
         "name": "The Washington Post"
       },
       "author": "Dan Rosenzweig-Ziff",
       "title": "Syrian animals found days after earthquake killed over 2,000 people - The Washington Post",
       "description": "As the White Helmets ended their search-and-rescue operations for people in opposition-held Syria, animal sanctuary workers found battered animals, alive.",
       "url": "https://www.washingtonpost.com/world/2023/02/11/syria-earthquake-animal-rescue-sanctuary/",
       "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/PPOOACOULFCDTKMHUOQ2ILFMAM.jpg&w=1440",
       "publishedAt": "2023-02-12T04:21:00Z",
       "content": "Comment on this story\r\nAn animal sanctuary in rebel-held Syria rescued a cat trapped inside its humans shop for three days, a chicken stuck in the middle of a flooding river and a dog bleeding profus… [+6868 chars]"
     }
   ]*/

  const updateNews = async () => {
    props.setProgress(10)
    console.log("cmd")
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setGiphy(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json()
    props.setProgress(50)
    console.log(parseData)
    setArticles(parseData.articles)
    setGiphy(false)
    props.setProgress(100)

  }

  useEffect(() => {
    updateNews()
    document.title = `${capitalizeFirstLetter(props.category)} -news`
    // eslint-disable-next-line

  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url)
    let parseData = await data.json()
    console.log(parseData)
    setArticles(articles.concat(parseData.articles))
    setTotalResult(parseData.totalResults)


  }

  return (

    <>

      {/*<div className="text-center" style={{ margin: "30px 0px" }}>*/}
      <h1 className="text-center" style={{ margin: "70px 0px" }}>News-Top HeadLine  from {capitalizeFirstLetter(props.category)}</h1>
      {giphy && <Spainner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spainner />}

      >

        <div className="container my-3">
          <div className="row">

            {articles.map((element) => {


              console.log(element)
              return <div className='col md-3' key={element.url}>
                <NewItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} urlToImage={element.urlToImage} url={element.url}
                  author={element.author} date={element.publishedAt} source={element.source.name} />

              </div>

            })}


          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: "us",
  pageSize: 7,
  category: "general"
}
News.propsType = {
  country: PropsType.string,
  pageSize: PropsType.number,
  category: PropsType.string
}

export default News