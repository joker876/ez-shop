import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

const LOCAL_STORAGE_KEY = 'name';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  private _name: string = this.localStorageService.loadFromLocalStorage(LOCAL_STORAGE_KEY) as string;
  private _nameSubject = new Subject<string>();

  public name = this._nameSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  private _onUpdate() {
    this._nameSubject.next(this._name);
    this.localStorageService.saveToLocalStorage(LOCAL_STORAGE_KEY, this._name);
  }

  nameExists() {
    return Boolean(this._name);
  }
  getName() {
    return this._name;
  }
  setName(name: string) {
    this._name = name;
    this._onUpdate();
  }
}
