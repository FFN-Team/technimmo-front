import React, { useState } from 'react';
import './Document.css'; 
import Card from 'pages/components/Card';
import ModalComponent from "../components/ModalComponent.js";
import AddDocument from "./AddDocument.js";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';
import { Paper, Table, TableBody, TableContainer, TableHead } from '../../../node_modules/@mui/material/index';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ColumnDocuments from './ColumnDocuments';

const Document = ({ owner, documentData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const { id } = useParams();
    const loading = useState(true);
    const error = useState(null);

    const openModal = (documentType) => {
        setSelectedDocumentType(documentType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDocumentType(null);
    };

    const modalContent = (documentType) => (
        <div>
            <AddDocument documentType={documentType} id={id} ownerName={ownerName} />
        </div>
    );

    if (!documentData || !Array.isArray(documentData)) {
        return <div>Aucune donnée de document disponible</div>;
    }

    let ownerName = '';        

    if (owner) {
        ownerName = `${owner.firstName} ${owner.lastName}`;
    }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

    const documentCard = (name, documentType) => (
        <Card>
            <div className="card-header">
                <h3>{name}</h3>
                <Button 
                    onClick={() => openModal(documentType)}
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                </Button>
            </div>
            <div className='documents'>
                <Paper>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {ColumnDocuments.map((column) => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell> ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
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
            {isModalOpen && (
                <ModalComponent 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    component={modalContent(selectedDocumentType)} 
                />
            )}
        </div>
    );
}

export default Document;
