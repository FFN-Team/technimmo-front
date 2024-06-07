import React, { useState, useEffect } from 'react';

const DocumentList = () => {
    const [classifiedDocuments, setClassifiedDocuments] = useState({});

    const documentData = [
        ["Justificatif d'identité du propriétaire", 'PROSPECT_IDENTITY'],
        ["Etat civil", 'CIVIL_STATUS']
    ];

    useEffect(() => {
        fetch('your-api-endpoint')
            .then(response => response.json())
            .then(data => {
                const filesByType = {};

                data.files.forEach(fileGroup => {
                    filesByType[fileGroup.documentTypeCode] = fileGroup.documentTypeFiles;
                });

                const classifiedDocs = documentData.reduce((acc, [type]) => {
                    acc[type] = filesByType[type] || [];
                    return acc;
                }, {});

                setClassifiedDocuments(classifiedDocs);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Documents Classifiés</h1>
            {documentData.map(([label, type]) => (
                <div key={type}>
                    <h2>{label}</h2>
                    {classifiedDocuments[type] && classifiedDocuments[type].length > 0 ? (
                        <ul>
                            {classifiedDocuments[type].map(file => (
                                <li key={file.documentId}>
                                    <a href={file.webLink} target="_blank" rel="noopener noreferrer">{file.name}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun fichier disponible pour {label}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DocumentList;