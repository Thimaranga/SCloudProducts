import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  env = environment;
  commonAPIUrl = this.env.appSettings.dummyjsonUrl;

  constructor(private http: HttpClient) { }

  getProducts(limit?: number) {
    let url = `${this.commonAPIUrl}/products`;
    if (limit) {
      url += `?limit=${limit}`;
    }
    return this.http.get(url);
  }

  getProductById(productId: string) {
    const url = `${this.commonAPIUrl}/products/${productId}`;
    return this.http.get(url);
  }

  searchProducts(keyWord: string) {
    const url = `${this.commonAPIUrl}/products/search?q=${keyWord}`;
    return this.http.get(url);
  }

  addProduct(data: Product) {
    const url = `${this.commonAPIUrl}/products/add`;
    return this.http.post(url, data);
  }

  updateProduct(productId: string, data: any) {
    const url = `${this.commonAPIUrl}/products/${productId}`;
    return this.http.put(url, data);
  }

  removeProductById(productId: string) {
    const url = `${this.commonAPIUrl}/products/${productId}`;
    return this.http.delete(url);
  }
}
