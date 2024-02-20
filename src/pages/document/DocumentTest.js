import './Document.css'; 

const DocumentManagement = () => {
    

  return (
    <div className='document-container'>
      <h1 className='document-header header'>Document Management</h1>
      <div className='document-input-container'>
        <button className='upload-button'>
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default DocumentManagement;