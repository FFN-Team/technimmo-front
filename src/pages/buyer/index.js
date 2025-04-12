import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import BuyerDetails from './BuyerDetails';
import Portfolio from './Portfolio';
import MatchingProperties from './MatchingProperties';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Box } from '@mui/material';
import 'pages/components/Onglets.css';

const Buyer = () => {
  const { id } = useParams();
  const [buyer, setBuyer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  
  const [error, setError] = useState(null);

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const fetchBuyerDataFromBuyerId = async () => {
      try {
        const url = `http://localhost:9001/api/v1/buyers/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBuyer(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerDataFromBuyerId();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <div>
      
      <Box sx={{ px: 4, py: 3 }}>
      <Tabs selectedIndex={activeTab} onSelect={handleTabSelect}>
        <TabList className="custom-tab-list">
          <Tab className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}> Connaissance acquéreur</Tab>
          <Tab className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}>🏠 Recherche intelligente de biens</Tab>
          <Tab className={`custom-tab ${activeTab === 2 ? 'active' : ''}`}>Portfolio</Tab>
        </TabList>

        <TabPanel>
            <BuyerDetails load={loading} data={buyer}/>
        </TabPanel>
        <TabPanel>
          <MatchingProperties buyer={buyer} />
        </TabPanel>
        <TabPanel>
            <Portfolio />
        </TabPanel>
      </Tabs>
      </Box>
    </div>
  );
};

export default Buyer;
