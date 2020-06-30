import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.add = functions.https.onCall((data, context ) => {
    console.log(data);
    
    const nombre = data.text.nombre;
    const correo = data.text.correo;
    const urlPerfil = data.text.urlPerfil;
    const contresena = data.text.contrasena;
    return admin.auth().createUser({
        email: correo,
        emailVerified: false,
        password: contresena,
        displayName: nombre,
        photoURL: urlPerfil

    }).then(async function (userRecord) {
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            _id: userRecord.uid,
            created_at: new Date(),
            updated_at: new Date(),
            isDeleted: false,
            status: true,
            nombre: nombre,
            correo: correo,
            urlPerfil: urlPerfil
        }).catch(error => {
            console.log('falle', error)
        })
        return { success: 'Nuevo usuario creado' };

    }).catch(error => {
        console.log("Error creating new user:", error);
        return { error: error.message };
    });

});

exports.updateUser = functions.firestore.document('users/{usuarioId}').onUpdate(event => {
    const data = event.after.data();
    if (data) {
        if (data._id && data.correo) {
            const _id = data._id;
            const email = data.correo;
            const displayName = data.nombre
            const photoURL = data.urlPerfil
            return admin.auth().updateUser(_id, {
                email: email,
                emailVerified: false,
                displayName: displayName,
                photoURL: photoURL
            }).then(function (userRecord) {
                console.log("Successfully update user:", userRecord.uid);
                return 1;
            }).catch(function (error) {
                console.log("Error creating new user:", error);
                return { error: error }
            });
        } else {
            return null;
        }
    }
    return 1;

});
