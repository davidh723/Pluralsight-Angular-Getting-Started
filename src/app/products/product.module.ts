import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailGuard } from './product-detail.guard';

const routes: Routes = [
  { path: "products", component: ProductListComponent },
  { path: "products/:id", canActivate: [ProductDetailGuard],component: ProductDetailComponent },
]; 

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductModule { }
