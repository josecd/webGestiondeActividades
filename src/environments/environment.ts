// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as firebase from "firebase";

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDvptQAOwWmx8U1v_Hbxi7GZMn0-rHmRWg",
    authDomain: "appagendajc.firebaseapp.com",
    databaseURL: "https://appagendajc.firebaseio.com",
    projectId: "appagendajc",
    storageBucket: "appagendajc.appspot.com",
    messagingSenderId: "449065461481",
    appId: "1:449065461481:web:e60d336632694e60367278",
    measurementId: "G-2579451H6X"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
