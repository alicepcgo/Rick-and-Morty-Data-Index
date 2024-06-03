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

    async search(type: String, name: String){
      return (await this.api.get(`/${type}`, {params: {name: name}})).data.results.map((item: any) => {
        console.log(item);        
        return {dataType: type, ...item}
      })
    }

    async detail(type: String, id: Number){
      return (await this.api.get(`/${type}/${id}`)).data
    }
};  