import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-ts';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private encryptionKey = '11112223345RESHAV67889990000';

  constructor() {}

  set(key: string, value: any): void {
    try {
      const jsonData = JSON.stringify(value);
      const encryptedData = CryptoJS.AES.encrypt(
        jsonData,
        this.encryptionKey
      ).toString();

      localStorage.setItem(key, encryptedData);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const encryptedData = localStorage.getItem(key);
      if (!encryptedData) return null;
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      return decryptedData ? JSON.parse(decryptedData) : null;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  }

  clear(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing from localStorage', error);
    }
  }

  clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing all localStorage', error);
    }
  }
}
