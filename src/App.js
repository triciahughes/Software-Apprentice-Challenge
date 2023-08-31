import "./index.css";
import { useState, useEffect } from "react";
import Card from "./comps/card";
import SortButtons from "./comps/sortButtons";

function App() {
  const [originalData, setOriginalData] = useState([]); // original standardized data from fetch
  const [data, setData] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const responseData = await getDataFromAPI(
        "http://localhost:3000/fakeDataSet"
      );
      const combinedAds = combineAds(responseData);
      const standardizeAds = standardizeData(combinedAds);
      const adsWithResults = addGoogleAnalyticsResults(
        standardizeAds,
        responseData.google_analytics
      );
      setData(adsWithResults);
      setOriginalData(adsWithResults);
    } catch (error) {
      console.error("Fetch error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDataFromAPI = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const combineAds = (data) => {
    return [...data.facebook_ads, ...data.twitter_ads, ...data.snapchat_ads];
  };

  const standardizeData = (data) => {
    return data?.map((ad) => {
      return {
        campaign: ad.campaign_name || ad.campaign,
        adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name,
        creative: ad.ad_name || ad.image_name || ad.creative_name,
        impressions: ad.impressions,
        spend: ad.spend || ad.cost,
        clicks: ad.clicks || ad.post_clicks,
      };
    });
  };

  const addGoogleAnalyticsResults = (ads, googleAnalyticsData) => {
    return ads.map((ad) => {
      const gaData = googleAnalyticsData.find(
        (ga) =>
          ga.utm_campaign === ad.campaign &&
          ga.utm_medium === ad.adset &&
          ga.utm_content === ad.creative
      );
      if (gaData) {
        ad.results = gaData.results;
      }
      return { ...ad, results: gaData?.results || 0 };
    });
  };

  /// Sorting Functions ///
  const handleSortClick = () => {
    setShowSettings((prev) => !prev);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

  const sortData = (data, order) => {
    return [...data].sort((a, b) => {
      return order === "asc" ? a.spend - b.spend : b.spend - a.spend;
    });
  };

  const sortFunction = () => {
    if (sortOrder === "asc" || sortOrder === "desc") {
      setData(sortData(originalData, sortOrder));
    } else {
      return setData(originalData);
    }
  };

  useEffect(() => {
    sortFunction();
  }, [sortOrder]);

  /// Search Functionality ///
  useEffect(() => {
    setSearchResults(
      data.filter((ad) =>
        ad.campaign.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  return (
    <div>
      <header className='App'>
        <h1>
          Apprentice Challenge Completed By{" "}
          <a
            href='https://www.linkedin.com/in/tricia-hughes/'
            className='text-primary font-bold underline decoration-1 underline-offset-2 hover:text-secondary'
          >
            Tricia Hughes
          </a>
        </h1>
      </header>
      <div>
        {loading ? (
          <p className='text-center'>Loading...</p>
        ) : (
          <div className='container my-12 mx-auto px-4 md:px-12'>
            <div className='relative flex space-x-5'>
              <SortButtons
                handleSortClick={handleSortClick}
                showSettings={showSettings}
                handleSortOrder={handleSortOrder}
                sortOrder={sortOrder}
              />
              <input
                className='bg-secondary border border-sky-400 rounded-full w-2/5 py-1 px-4 text-secondary leading-tight hover:bg-primary focus:outline-none focus:bg-white focus:border-primary'
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                type='text'
                placeholder='Search...'
              />
            </div>
            <div className='flex flex-wrap -mx-1 lg:-mx-4'>
              <Card data={searchResults} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
