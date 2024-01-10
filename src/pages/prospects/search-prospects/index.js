import React, { useState } from 'react';

const SearchProspects = () => {
    const [prospectFilterName, setProspectFilterName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [prospects, setProspects] = useState([]);

    const [contactOrigin, setContactOrigin] = useState('');
    const [title, setTitle] = useState('');
    const [age, setAge] = useState('');
    const [ageComparator, setAgeComparator] = useState('');
    const [profession, setProfession] = useState('');
    //const [authorizeContact, setAuthorizeContact] = useState(true);


    // Gestionnaire d'événements pour le clic sur le bouton "Find"
    const handleFindClick = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        const formData = new FormData(e.target); 
        const formDataObject = {};
        
        // Convertir FormData en objet JavaScript 
        formData.forEach((value, key) => {
            if(value!=="") formDataObject[key] = value;
        });

        console.log("test :", formDataObject);
        
        try {
            const url = `http://localhost:9001/api/v1/prospects/filtred`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formDataObject)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setProspects(result);
        } catch (error) {
            console.error("Error during API call:", error);
        }

    };


    const handleSaveFilter = () => {
        // Ouvrir le popup (modal)
        setShowModal(true);
    };


    const handleModalSave = async () => {
        // Fermer le popup (modal) et récupérer la valeur du champ dans prospectFilterName
        setShowModal(false);
        if(prospectFilterName=="") {
            window.alert("Vous n'avez pas choisi de nom de filtre.");
            return;
        }
    

        // Enregistre le filtre avec le nom dans la console ou effectue d'autres actions nécessaires
        const savedFilter = {
            prospectFilterName,
            contactOrigin,
            title,
            age,
            ageComparator,
            profession,
        };

        console.log("Saved Filter:", savedFilter);

        const formDataObject = {};
        
        Object.entries(savedFilter).forEach(([key, value]) => {
            if (value !== "") formDataObject[key] = value;
        });

        console.log("formDataObject : ", formDataObject);

        const filterKeys = Object.keys(formDataObject);
        if (filterKeys.length === 1 && filterKeys[0] === 'prospectFilterName') {
            window.alert("Vous n'avez pas choisi de caractéristique de filtre.");
        } else {
            try {
                const url = `http://localhost:9001/api/v1/prospects/filter`;
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formDataObject)
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                window.alert("L'opération s'est terminée avec succès.");
            } catch (error) {
                console.error("Error during API call:", error);
        
                // Il y a eu une erreur, afficher une alerte d'erreur
                window.alert("Quelque chose s'est mal passé.");
            }
        }

    };


    const handleModalCancel = () => {
        // Fermer le popup (modal) sans enregistrer
        setShowModal(false);
    };



    return (
        <div>
            <form onSubmit={handleFindClick} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <div>
                        <label htmlFor="contactOrigin">Contact Origin : </label>
                        <select name="contactOrigin" value={contactOrigin} onChange={(e) => setContactOrigin(e.target.value)}>
                            <option value="">Sélectionnez Contact Origin</option>
                            <option value="EMAIL">EMAIL</option>
                            <option value="PHONE">PHONE</option>
                            <option value="SOCIAL_MEDIA">SOCIAL_MEDIA</option>
                            <option value="WEB_SITE">WEB_SITE</option>
                            <option value="WORD_OF_MOUTH">WORD_OF_MOUTH</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title">Title : </label>
                        <select name="title" value={title} onChange={(e) => setTitle(e.target.value)}>
                            <option value="">Sélectionnez Title</option>
                            <option value="MR">MR</option>
                            <option value="MRS">MRS</option>
                            <option value="MISS">MISS</option>
                            <option value="DR">DR</option>
                        </select>
                    </div>  
                    
                    <div>
                        <label htmlFor="profession">Profession : </label>
                        <select name="profession" value={profession} onChange={(e) => setProfession(e.target.value)}>
                            <option value="">Sélectionnez Profession</option>
                            <option value="DOCTOR">DOCTOR</option>
                            <option value="ENGINEER">ENGINEER</option>
                            <option value="TEACHER">TEACHER</option>
                            <option value="STUDENT">STUDENT</option>
                            <option value="COMMERCIAL">COMMERCIAL</option>
                        </select>
                    </div>
                    
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <div>
                        <label htmlFor="age">Age : </label>
                        <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="ageComparator">Age Comparator : </label>
                        <select name="ageComparator" value={ageComparator} onChange={(e) => setAgeComparator(e.target.value)}>
                            <option value="">Sélectionnez Age Comparator</option>
                            <option value="EQUALS">EQUALS</option>
                            <option value="NOT_EQUAL_TO">NOT_EQUAL_TO</option>
                            <option value="GREATER_THAN">GREATER_THAN</option>
                            <option value="LESS_THAN">LESS_THAN</option>
                            <option value="GREATER_THAN_OR_EQUAL_TO">GREATER_THAN_OR_EQUAL_TO</option>
                            <option value="LESS_THAN_OR_EQUAL_TO">LESS_THAN_OR_EQUAL_TO</option>
                        </select>
                    </div>

                    {/**
                     * 
                    <div>
                        <label htmlFor="authorizeContactOnSocialMedia">Authorize Contact : </label>
                        <input type="radio" name="authorizeContactOnSocialMedia" checked={authorizeContact} onChange={(e) => setAuthorizeContact(e.target.checked)} />
                    </div>
                     */}
                </div>
                    
                <div>
                    <button type="submit" style={{ marginRight: '10px' }}>Find</button>
                    <button type="button" onClick={handleSaveFilter}>Save Filter</button>
                </div>
            </form>


            {/* Modal (Popup) pour donner un nom au filtre */}
            {showModal && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                    <label htmlFor="filterName">Donne un nom à ce filtre:</label>
                    <input type="text" id="filterName" value={prospectFilterName} onChange={(e) => setProspectFilterName(e.target.value)} />
                    <button onClick={handleModalSave}>Enregistrer</button>
                    <button onClick={handleModalCancel}>Annuler</button>
                </div>
            )}


            <div>
                <h2>Résultats de la recherche :</h2>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #ddd' }}>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Title</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Nom</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Prénom</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Date de naissance</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Profession</th>
                            {/* Ajoute d'autres colonnes si nécessaire */}
                            <th style={{ padding: '8px', textAlign: 'left' }}>Mail</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Mobile</th>
                            <th style={{ padding: '8px', textAlign: 'left' }}>Contact Origin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prospects.map(prospect => (
                            <tr key={prospect.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '8px' }}>{prospect.title}</td>
                                <td style={{ padding: '8px' }}>{prospect.lastName}</td>
                                <td style={{ padding: '8px' }}>{prospect.firstName}</td>
                                <td style={{ padding: '8px' }}>{prospect.dateOfBirth}</td>
                                <td style={{ padding: '8px' }}>{prospect.profession}</td>
                                {/* Ajoute d'autres cellules si nécessaire */}
                                <td style={{ padding: '8px' }}>{prospect.mail}</td>
                                <td style={{ padding: '8px' }}>{prospect.mobile}</td>
                                <td style={{ padding: '8px' }}>{prospect.contactOrigin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchProspects;
