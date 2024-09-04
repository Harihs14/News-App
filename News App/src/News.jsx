import React, { useState, useEffect } from 'react';

function News() {
    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('technology');
    const [country, setCountry] = useState('us');
    const [apiLimitReached, setApiLimitReached] = useState(false);

    useEffect(() => {
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=<YOUR_NEWS_API>`;

        if (searchTerm) {
            apiUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=<YOUR_NEWS_API>`;
        }

        fetch(apiUrl)
            .then(response => {
                if (response.status === 429) { // 429 status code indicates API limit reached
                    setApiLimitReached(true);
                    throw new Error('API limit reached');
                }
                return response.json();
            })
            .then(data => {
                setNews(data.articles || []);
            })
            .catch(error => console.log(error));
    }, [searchTerm, country, category]);

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <h2 className="text-4xl text-white pt-12 text-center font-bold mb-4 T-logo items-center flex flex-row justify-center">
                Daily Tech Wave
                <svg className='ml-5' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-globe-central-south-asia" viewBox="0 0 16 16">
                     <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.882 1.731a.48.48 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.7.7 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a1 1 0 0 0-.462-.04 7 7 0 0 1 2.45-2.027m-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.8.8 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.45.45 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282l.04-.001a7.003 7.003 0 0 1-12.658.905Z"/>
                </svg>
            </h2>
            <hr />
            <br />
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-wrap justify-center">
                <input type="text" value={searchTerm} onChange={handleSearchInputChange} placeholder="Enter search term" className="border m-2 border-gray-300 px-4 py-2 rounded-md mr-2" />
                <select value={country} onChange={handleCountryChange} className="border border-gray-300 px-4 py-2 rounded-md mr-2 m-2">
                    <option value="us">United States</option>
                    <option value="in">India</option>
                    <option value="ca">Canada</option>
                    {/* Add more countries as needed */}
                </select>
                <div className='flex flex-col mr-2 ml-2'>
                    <label className="mr-2 text-white">
                        Business
                        <input
                            type="checkbox"
                            value="business"
                            checked={category === 'business'}
                            onChange={handleCategoryChange}
                            className="ml-2"
                        />
                    </label>
                    <label className="mr-2 text-white">
                        Technology
                        <input
                            type="checkbox"
                            value="technology"
                            checked={category === 'technology'}
                            onChange={handleCategoryChange}
                            className="ml-2"
                        />
                    </label>
                </div>
                
                {/* Add more checkboxes for other categories as needed */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Search</button>
            </form>
            <br />
            <hr />
            <ul className='mx-auto flex flex-wrap justify-center'>
                {news.map((article, index) => (
                    <li key={index} className="m-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img src={article.urlToImage} alt={article.title} className="rounded-t-lg" />
                        <div className='p-5'>
                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h3>
                            <p className="mb-3 font-normal text-gray-100 dark:text-gray-400">{article.description}</p>
                            <p className="mb-3 font-normal text-gray-300 dark:text-gray-400">Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
                            <a href={article.url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read More
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </li>
                ))}
            </ul>

            {apiLimitReached && (
                <div className="bg-red-500 text-white py-2 px-4 mb-4 text-center">
                    API call limit has been reached. Please try again after 12hrs.
                </div>
            )}
        </div>
    );
}

export default News;
