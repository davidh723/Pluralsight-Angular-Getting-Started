import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { IProduct } from "./product";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PorductService {
  private _productUrl = "api/products/products.json";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this._productUrl).pipe(
      tap(data => console.log("All: ", JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}