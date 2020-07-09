import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from "rxjs/operators";
import { resolve } from 'url';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable({
    providedIn: 'root'
})

export class StorageService {
    constructor(private storage: AngularFireStorage) {}

    uploadHorario(file): Promise<string> {
        return new Promise((resolve, reject) => {
            this.uploadFile(file, 'horario').then(
                url => {
                    resolve(url);
                }, err => reject(err)
            ).catch(err => reject(err));
        });
    }



    private uploadFile(file, location): Promise<string> {
        return new Promise((resolve, reject) => {
            const nombreArchivo: string = new Date().valueOf().toString();
            const filePath = `${location}/${nombreArchivo}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(`${location}/${nombreArchivo}`, file);

            let _storageListener: Subscription = new Subscription();
    
            task
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        const downloadUrl = fileRef.getDownloadURL();
                        _storageListener = downloadUrl.subscribe(url => {
                            if (url) {
                                resolve(url);   
                                _storageListener.unsubscribe(); 
                            }
                          });
                    })
                ).subscribe(url => {
                    if (url) {
                           
                    }
                });
        });
        
    }
    
    private uploadFiles(file, id,location): Promise<string> {
        return new Promise((resolve, reject) => {
            const nombreArchivo: string = new Date().valueOf().toString()+ String.fromCharCode(65 + Math.floor(Math.random() * 26));
            const filePath = `${location}/${id}/${nombreArchivo}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(`${location}/${id}/${nombreArchivo}`, file);

            let _storageListener: Subscription = new Subscription();
    
            task
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        const downloadUrl = fileRef.getDownloadURL();
                        _storageListener = downloadUrl.subscribe(url => {
                            if (url) {
                                const data :any ={
                                    url: url,
                                    ref:filePath
                                }
                                
                                resolve(data);   
                                _storageListener.unsubscribe(); 
                            }
                          });
                    })
                ).subscribe(url => {
                    if (url) {
                      
                    }
                });
        });
        
    }

    deleteImgDatabase(item) {
        var storageRef = firebase.storage().ref();
        var desertRef = storageRef.child(item);
        // Delete the file
        desertRef.delete().then(function () {
            console.log('Imagen eliminada');
            
        }).catch(function (error) {
    
        });
      }
}