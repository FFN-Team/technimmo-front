const columnsBuyers = [
    { id: 'title', label: 'Title', minWidth: 10 },
    { id: 'lastName', label: 'Last Name', minWidth: 80 },
    { id: 'firstName', label: 'First Name', minWidth: 80 },
    { id: 'mobile', label: 'Mobile', minWidth: 50, format: (value) => value.toLocaleString() },
    { id: 'mail', label: 'Email', minWidth: 100 },
    { id: 'statut', label: 'Statut', minWidth: 80 },
  ];
  
  export default columnsBuyers;