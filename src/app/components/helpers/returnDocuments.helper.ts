export const returnDocuments = (snapShot: firebase.firestore.QuerySnapshot ) => {
    const documents: any[] = [];
    snapShot.forEach((d: firebase.firestore.DocumentData) => { documents.push(d.data()) });
    console.log('DOCUMENTS', documents);
    return documents;
}

export const returnDocumentsWithId = (snapShot: firebase.firestore.QuerySnapshot ) => {
    const documents: any[] = [];
    snapShot.forEach((d: firebase.firestore.DocumentData) => { 
        documents.push( {...d.data(), _id: d.id} );
    });
    return documents;
}