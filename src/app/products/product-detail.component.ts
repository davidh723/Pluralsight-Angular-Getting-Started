import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { PorductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product Detail";
  imageWidth: number = 100;
  imageMargin: number = 2;
  products: IProduct[] = [];
  product!: IProduct | undefined;
  errorMessage: string = "";
  sub!: Subscription;

  constructor(private route: ActivatedRoute, private productService: PorductService, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.product = this.products.filter((product: IProduct) => product.productId === id)[0];
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(["/products"]);
  }
}
