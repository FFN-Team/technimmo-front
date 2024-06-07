import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; 
import ProspectDetails from './ProspectDetails';
import Document from 'pages/document/Documents';
import 'pages/components/Onglets.css'; // Importer le fichier de style CSS
// import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { useParams } from 'react-router-dom';

const Prospect = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [prospect, setProspect] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

    //fetchBuyerDataFromBuyerId
    useEffect(() => {
      const fetchProspectDataFromProspectId = async () => {
        try {
          const url = `http://localhost:9001/api/v1/prospects/${id}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setProspect(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProspectDataFromProspectId();
    }, [id]);

     const [documentData, setDocumentData] = useState([
        ["Justificatif d'identité du propriétaire", 'PROSPECT_IDENTITY', []],
        ["Etat civil", 'CIVIL_STATUS', []]
    ]);

    useEffect(() => {
      fetch(`http://localhost:9001/api/v1/documents/PROSPECT/${id}`)
          .then(response => response.json())
          .then(data => {
              // Créer un objet pour mapper les fichiers par documentTypeCode
              const filesByType = {};
              data.files.forEach(fileGroup => {
                  filesByType[fileGroup.documentTypeCode] = fileGroup.documentTypeFiles;
              });

              // Mettre à jour documentData avec les listes de fichiers
              const updatedDocumentData = documentData.map(([label, type]) => {
                  const files = filesByType[type] || [];
                  return [label, type, files];
              });

              setDocumentData(updatedDocumentData);
          })
          .catch(error => console.error('Error fetching data:', error));
  }, []);
    
  return (
    <div>
      {/* <Breadcrumbs navigation={navigation} title /> */}
      <Tabs className="custom-tabs"  selectedIndex={activeTab} onSelect={handleTabSelect}>
        <TabList className="custom-tab-list">
          <Tab className={`custom-tab ${activeTab === 0 ? 'active' : ''}`}>Informations prospect</Tab>
          <Tab className={`custom-tab ${activeTab === 1 ? 'active' : ''}`}>Gestion des documents</Tab>
        </TabList>

        <TabPanel>
          <ProspectDetails prospect={prospect} load={loading}/>
        </TabPanel>
        <TabPanel>
          <Document owner={prospect} documentData={documentData}/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Prospect;

  // const navigation = {
  //   items: [
  //     {
  //       id: 'prospects',
  //       title: 'Prospects',
  //       type: 'group',
  //       children: [
  //         {
  //           id: 'prospects',
  //           title: 'Prospects',
  //           type: 'item',
  //           prospectName: `${prospect.firstName} ${prospect.lastName}`,
  //           url: `/prospects/${id}`,
  //         },
  //       ],
  //     }
  //   ]
  // };