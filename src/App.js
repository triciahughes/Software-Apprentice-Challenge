import "./index.css";
import { useState, useEffect } from "react";
import Card from "./comps/card";
import SettingsBtn from "./comps/settingsBtn";

function App() {
  const [originalData, setOriginalData] = useState([]); // original standardized data from fetch
  const [data, setData] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let response = await fetch("http://localhost:3000/fakeDataSet");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();

      /// Combine All Ads into one Array ///
      const combinedAds = [
        ...data.facebook_ads,
        ...data.twitter_ads,
        ...data.snapchat_ads,
      ];

      /// Standardize Data ///
      const standardizeAds = combinedAds?.map((ad) => {
        return {
          campaign: ad.campaign_name || ad.campaign,
          adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name,
          creative: ad.ad_name || ad.image_name || ad.creative_name,
          impressions: ad.impressions,
          spend: ad.spend || ad.cost,
          clicks: ad.clicks || ad.post_clicks,
        };
      });

      /// Google Analytics Results ///
      const adsWithResults = standardizeAds.map((ad) => {
        const gaData = data.google_analytics.find(
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

      /// Set Ad Data State to Standardized Data ///
      setData(adsWithResults);
      /// Set Original Data State to Standardized Data ///
      setOriginalData(adsWithResults);
    } catch (error) {
      console.error("Fetch error: ", error.message);
    }
  }

  /// Sorting Functions ///
  const handleSortClick = () => {
    setShowSettings((prev) => !prev);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
  };

  const sortAsc = (data) => {
    return [...data].sort((a, b) => {
      return a.spend - b.spend;
    });
  };

  const sortDesc = (data) => {
    return [...data].sort((a, b) => {
      return b.spend - a.spend;
    });
  };

  const sortFunction = () => {
    if (sortOrder === "asc") {
      setData(sortAsc(originalData));
    } else if (sortOrder === "desc") {
      setData(sortDesc(originalData));
    } else {
      return setData(originalData);
    }
  };

  useEffect(() => {
    sortFunction();
  }, [sortOrder]);

  /// Search Functionality ///
  const searchResults = data.filter((ad) => {
    return ad.campaign.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className='text-primary bg-secondary'>
        <h1>Apprentice Challenge</h1>
      </div>
      <div></div>
      <div className='container my-12 mx-auto px-4 md:px-12'>
        <div className='flex space-x-10'>
          <SettingsBtn
            handleSortClick={handleSortClick}
            showSettings={showSettings}
            handleSortOrder={handleSortOrder}
            sortOrder={sortOrder}
          />
          <input
            className='bg-primary rounded-lg w-2/5 py-2 px-4 text-secondary leading-tight focus:outline-none focus:bg-white focus:border-primary'
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
    </>
  );
}

export default App;
