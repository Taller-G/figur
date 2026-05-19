import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sticker {
  id: string;
  number: number;
  playerName: string;
  team: string;
  country: string;
  position: string;
  isSpecial: boolean;
  imageUrl?: string;
}

export interface CreateStickerRequest {
  number: number;
  playerName: string;
  team: string;
  country: string;
  position: string;
  isSpecial?: boolean;
  imageUrl?: string;
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  collectedStickers: Array<{
    stickerId: string;
    quantity: number;
    collectedAt: Date;
  }>;
  totalStickers: number;
  uniqueStickers: number;
}

export interface CreateCollectionRequest {
  userId: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // Stickers
  getStickers(): Observable<Sticker[]> {
    return this.http.get<Sticker[]>(`${this.baseUrl}/stickers`);
  }

  getSticker(id: string): Observable<Sticker> {
    return this.http.get<Sticker>(`${this.baseUrl}/stickers/${id}`);
  }

  createSticker(sticker: CreateStickerRequest): Observable<Sticker> {
    return this.http.post<Sticker>(`${this.baseUrl}/stickers`, sticker);
  }

  // Collections
  createCollection(collection: CreateCollectionRequest): Observable<Collection> {
    return this.http.post<Collection>(`${this.baseUrl}/collections`, collection);
  }

  addStickerToCollection(collectionId: string, stickerId: string, quantity: number = 1): Observable<Collection> {
    return this.http.patch<Collection>(`${this.baseUrl}/collections/${collectionId}/stickers`, {
      stickerId,
      quantity
    });
  }
}