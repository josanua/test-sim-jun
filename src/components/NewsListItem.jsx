import React from "react";
import './styles/NewsListItem.css';

const NewsListItem = ({newsList}) => {
    const homeUrl = 'https://point.md/ru/';
    const thumbnailPath = 'https://i.simpalsmedia.com/point.md/news/370x194/';
    const logoNewsProvider = 'https://i.simpalsmedia.com/point.md/logo/f2415d7ace566f8ae4d34eba99b9b5b7.svg';

    return (
        <>
            {newsList.map(newsItem => (
                <article key={newsItem.id}>
                    <div className="newsItem-content">
                        {newsItem.thumbnail &&
                            <a href={homeUrl + newsItem.url}>
                                <div className="thumbnailWrapp">
                                    <div className="thumbnailSubWrapp">
                                        <img alt={newsItem.title.short}
                                             src={thumbnailPath + newsItem.thumbnail}
                                             className="main-news-thumbnail"/>

                                    </div>
                                </div>
                            </a>
                        }

                        <div className="news-text-content">
                            <a href="/ru/novosti/politika/nestase-spynu-eto-novyi-plakhotniuk">
                                <h3 className="news-short-title">{newsItem.title.short}</h3>
                            </a>
                            <p className="news-intro-text">{newsItem.description.intro}</p>
                            <div className="news-metadata-wrapper">
                                <div className="news-metadata-content">
                                    <img
                                        alt="logo-news-provider"
                                        src={logoNewsProvider}
                                        className="logo-news-provider"
                                    />
                                    <time
                                        className="posted-time-text">
                                        {new Date(newsItem.dates.posted).toLocaleDateString()}
                                    </time>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </>
    )
}

export default NewsListItem;