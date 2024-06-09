import { Injectable } from "@angular/core";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface SearchResult<T> {
  info: Info;
  results: T[];
}

export interface Item {
  dataType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://rickandmortyapi.com/api',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  async search(type: string, name: string, page: number = 1): Promise<SearchResult<Item>> {
    const response: AxiosResponse<{ info: Info; results: any[] }> = await this.api.get(`/${type}`, { params: { name, page } });
    const { info, results } = response.data;
    return {
      info,
      results: results.map(item => ({ dataType: type, ...item }))
    };
  }

  async detail(type: string, id: number): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(`/${type}/${id}`);
    return response.data;
  }

  async extras(type: string, ids: string): Promise<any[]> {
    const response: AxiosResponse<any> = await this.api.get(`/${type}/${ids}`);
    const results = response.data;
    return Array.isArray(results) ? results : [results];
  }
}
