import { useState } from "react";
import './Document.css'; 
import Card from 'pages/components/Card';
import ModalComponent from "../components/ModalComponent.js";
import AddDocument from "./AddDocument.js";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Document = () => {

    // const [file, setFile] = useState(null);
    // const [msg, setMsg] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalContent = (documentType) => (
        <div>
          <AddDocument documentType={documentType} />
        </div>
      );

    // function handleUpload() {
    //     if(!file) {
    //         console.log("No file selected");
    //         return;
    //     }

    //     const fd = new FormData();
    //     fd.append('fileContent', file);

    //     setMsg("Uploading...");
        
    //     fetch(`http://localhost:9001/api/v1/documents/upload?fileName=edt.png&documentType=VISITE_PHOTO&ownerId=1`, {
    //         method: 'POST',
    //         body: fd
    //     })
    //     .then(res => {
    //         setMsg("Upload successful !")
    //         console.log(res.data)
    //     })
    //     .catch(err => {
    //         setMsg("Upload failed");
    //         console.error(err);
    //     })

    // }

    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    // };

    return (
    <div>
        {/* <div className='document-container'>
        <h1 className='document-header header'>Document Management</h1>
        <div className='document-input-container'>
            <input type='file' onChange={handleFileChange} />
            <button className='upload-button' onClick={handleUpload}>
            Upload
            </button>
        </div>

        {msg && <span className='upload-message'>{msg}</span>}
        </div> */}

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
                <ModalComponent isOpen={isModalOpen} onClose={closeModal} component={modalContent('VISITE_PHOTO')} />
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
                <ModalComponent isOpen={isModalOpen} onClose={closeModal} component={modalContent('VISITE_PHOTO')} />
            </div>
         </Card>
       </div>
        
    </div>    
    );
}

export default Document;