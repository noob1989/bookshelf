import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IBook, IBookObject } from './shared/types';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getBooks(keyword?: string): Observable<IBookObject[]> {
    const params = keyword
      ? {
          keyword,
        }
      : undefined;

    return this.http.get<IBookObject[]>(`${this.apiServerUrl}/book/all`, {
      params,
    });
  }

  public addBook(book: IBook): Observable<IBookObject> {
    return this.http.post<IBookObject>(`${this.apiServerUrl}/book/add`, book);
  }

  public updateBook(book: IBookObject): Observable<IBookObject> {
    return this.http.put<IBookObject>(`${this.apiServerUrl}/book/update`, book);
  }

  public deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/book/delete/${bookId}`);
  }
}
