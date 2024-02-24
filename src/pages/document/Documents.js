import { useState } from "react";
import './Document.css'; 
import Card from 'pages/components/Card';
import ModalComponent from "../components/ModalComponent.js";
import AddDocument from "./AddDocument.js";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';

const Document = ({owner, documentData}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalContent = (documentType) => (
        <div>
          <AddDocument documentType={documentType} id={id} ownerName={ownerName}/>
        </div>
      );

    if (!documentData || !Array.isArray(documentData)) {
        return <div>Aucune donnée de document disponible</div>;
    }
    
    let ownerName = '';        

    if(owner) {
        ownerName = `${owner.firstName} ${owner.lastName}`
    }

    const documentCard = (name, documentType) => (
        <Card>
            <div className="card-header">
                <h3>{name}</h3>
                <Button onClick={openModal}
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}>
                    Upload file
                </Button>
                    {isModalOpen && (
                <ModalComponent isOpen={isModalOpen} onClose={closeModal} component={modalContent({documentType})} />)}
            </div>
        </Card>
    );

    return (
        <div className="card-container"> 
            {documentData.map(([name, documentType], index) => (
                <div key={index}>
                {documentCard(name, documentType)}
                </div>
            ))}
       </div>
    );
}

export default Document;