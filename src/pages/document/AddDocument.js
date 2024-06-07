import { useState } from "react";
import './Document.css'; 

const AddDocument = ({documentType, id, owner}) => {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(true);

    let fileName = "";
    let title = "";


    const handleUpload = () => {
        if(!file) {
            console.log("No file selected");
            return;
        }

        console.log(documentType);
        console.log(file.type);

        // attention il faut gérer les cas où on a pas le nom ou le prénom, on peut établir une régle de gestion qui dit que le nom ou le prénom est obligatoire
        if (documentType && documentType === 'PROSPECT_IDENTITY'){
            fileName = "Justificatif identite " + owner.firstName + owner.lastName;
        }

        if (documentType && documentType == 'CIVIL_STATUS'){
            fileName = "Etat civil "+ owner.firstName + owner.lastName;
        }

        console.log(owner);

        if (documentType && documentType == 'GENERAL_ASSEMBLY'){
            fileName = "Assemblee générale " + owner.address.street.name;
        }

        const fd = new FormData();
        fd.append('fileContent', file);
        
        try {
            const response = fetch(`http://localhost:9001/api/v1/documents/upload?fileName=${fileName}&fileType=${file.type}&documentTypeCode=${documentType}&ownerId=${id}`, {
            method: 'POST',
            body: fd })

            console.log(response);

            if(!response.ok) {
                setMsg("Upload failed");
                setSuccess(false);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setMsg("Upload successful !");

        } catch (error) {
            setMsg("Upload failed");
            setSuccess(false);
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // faire un tableau plutôt qu'un ensemble de if else
    if(documentType && documentType === 'PROSPECT_IDENTITY'){
        title = "Insérer un justificatif d'identité";
    }

    if(documentType && documentType === 'CIVIL_STATUS'){
        title = "Insérer un état civil";
    }

    return (
    <div className='document-container'>
        <h1>{title}</h1>
        <div className='document-input-container'>
            <input type='file' onChange={handleFileChange} />
            <button className='upload-button' onClick={handleUpload}>
            Upload
            </button>
        </div>

        {msg && <span className={`upload-message ${success === true ? 'success' : 'failed'}`}>{msg}</span>}
    </div>)
};

export default AddDocument;