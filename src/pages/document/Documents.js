import { useState } from "react";
import './Document.css'; 
import Card from 'pages/components/Card';
import ModalComponent from "../components/ModalComponent.js";
import AddDocument from "./AddDocument.js";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';

const Document = () => {
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
          <AddDocument documentType={documentType} id={id} />
        </div>
      );

    return (
    <div>
        <div className="card-container">     
         <Card>
            <div className="card-header">
                <h3>Justificatif d&rsquo;identité du propriétaire</h3>
                <Button onClick={openModal}
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}>
                    Upload file
                    </Button>
                <ModalComponent isOpen={isModalOpen} onClose={closeModal} component={modalContent('PROSPECT_IDENTITY')} />
            </div>
         </Card>
        <Card> 
            <div className="card-header">
                <h3>Contrat mariage, PACS ou Jugement de divorce</h3>
                <Button onClick={openModal}
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}>
                    Upload file
                    </Button>
                <ModalComponent isOpen={isModalOpen} onClose={closeModal} component={modalContent('')} />
            </div>
        </Card>
       </div>
    </div>    
    );
}

export default Document;