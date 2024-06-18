import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

    constructor() { }

    getValue(key: string): string {
        return localStorage.getItem(key);
    }

    setValue(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeValue(key: string): void {
        localStorage.removeItem(key);
    }

}


export class StorageKey {

    public static myToken = 'myToken';
    public static _id = '_id';
    public static Name = 'name';
    //public static lastName = 'lastName';
    public static email = 'email';
    public static roleId = 'roleId';
    public static accountType = 'accountType';
  public static profileImage = 'profileImage';
    public static Issellerlogin = 'Issellerlogin';
    public static language = 'language';
    public static colour = 'colour';
    public static logo = 'logo';
    public static sidebarImage = 'sidebarImage';
    public static loginLayoutBackgroundImage = 'loginLayoutBackgroundImage';
    public static sectionId = 'sectionId';
}
