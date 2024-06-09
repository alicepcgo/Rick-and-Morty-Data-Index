import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from "axios";


@Injectable({
    providedIn: 'root'
})
export class ApiService{
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

    async search(type: String, name: String, page: Number = 1){
      const {info, results} = (await this.api.get(`/${type}`, {params: {name: name, page}})).data
      return {
        info,
        results: results.map((item: any) => {
          return {dataType: type, ...item}
        })
      }
    }

    async detail(type: String, id: Number){
      return (await this.api.get(`/${type}/${id}`)).data
    }

    async extras(type: any, ids: String){
      const results = (await this.api.get(`/${type}/${ids}`)).data
      return Array.isArray(results) ? results : [results]
    }
};  