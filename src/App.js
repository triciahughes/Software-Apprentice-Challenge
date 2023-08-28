import "./index.css";
import { useState, useEffect } from "react";
import Card from "./comps/card";

function App() {
  const [data, setData] = useState([]);
  const [googleAnalytics, setGoogleAnalytics] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
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
    } catch (error) {
      console.error("Fetch error: ", error.message);
    }
  }

  return (
    <>
      <div className='text-primary bg-secondary'>
        <h1>Apprentice Challenge</h1>
      </div>
      <div className='container my-12 mx-auto px-4 md:px-12'>
        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
          <Card data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
