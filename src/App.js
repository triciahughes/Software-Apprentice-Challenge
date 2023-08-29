import "./index.css";
import { useState, useEffect } from "react";
import Card from "./comps/card";
import SettingsBtn from "./comps/settingsBtn";

function App() {
  const [originalData, setOriginalData] = useState([]); // original standardized data from fetch
  const [data, setData] = useState([]);
  const [googleAnalytics, setGoogleAnalytics] = useState([]);
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
      /// Set Ad Data State to Standardized Data ///
      setData(standardizeAds);
      /// Set Original Data State to Standardized Data ///
      setOriginalData(standardizeAds);
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

  return (
    <>
      <div className='text-primary bg-secondary'>
        <h1>Apprentice Challenge</h1>
      </div>
      <div></div>
      <div className='container my-12 mx-auto px-4 md:px-12'>
        <SettingsBtn
          handleSortClick={handleSortClick}
          showSettings={showSettings}
          handleSortOrder={handleSortOrder}
          sortOrder={sortOrder}
        />
        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
          <Card data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
