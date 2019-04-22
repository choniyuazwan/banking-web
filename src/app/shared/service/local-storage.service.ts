import { Injectable,Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'username';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  anotherTodolist = [];

  constructor(@Inject(LOCAL_STORAGE) private storage:StorageService) { }

  public storeOnLocalStorage(theCif: string): void {
    this.storage.set(STORAGE_KEY, theCif);
    console.log(this.storage.get(STORAGE_KEY));
  }

  public removeOnLocalStorage(){
    this.storage.clear();
  }

  public getOnLocalStorage(){
    return this.storage.get(STORAGE_KEY);
  }
}
