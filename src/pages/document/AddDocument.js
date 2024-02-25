import { useState } from "react";
import './Document.css'; 

const AddDocument = ({documentType, id, ownerName}) => {
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(true);
    let fileName = "";

    const handleUpload = () => {
        if(!file) {
            console.log("No file selected");
            return;
        }

        console.log(documentType);
        console.log(file.type);

        if (documentType && documentType === 'PROSPECT_IDENTITY'){
            fileName = "Justificatif identite " + ownerName;
        }

        const fd = new FormData();
        fd.append('fileContent', file);

        setMsg("Uploading...");
        
        try {
            const response = fetch(`http://localhost:9001/api/v1/documents/upload?fileName=${fileName}&fileType=${file.type}&documentType=${documentType}&ownerId=${id}`, {
            method: 'POST',
            body: fd
        })

            if(!response.ok) {
                setMsg("Upload failed");
                setSuccess(false);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setMsg("Upload successful !")
            console.log(res.data)

        } catch (error) {
            setMsg("Upload failed");
            setSuccess(false);
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
    <div className='document-container'>
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