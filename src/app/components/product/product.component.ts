import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  products: any[] = [];
  paginatedProducts: any[] = [];
  newProduct: any = {};
  closeResult: string | undefined;

  productForm: FormGroup;

  pageSize = 5;
  currentPage = 1;

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
    });
    this.updatePaginatedProducts();

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  private loadProducts(): void {
    this.spinner.show();
    this.productService.getProducts()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((res: any) => {
        this.products = res?.products;
        this.updatePaginatedProducts();
      });
  }

  openUpdateModal(product: any, content: any): void {
    this.newProduct = product;

    const titleValue = product.title;
    const descriptionValue = product.description;
    const priceValue = product.price;

    this.productForm.setValue({
      title: titleValue,
      description: descriptionValue,
      price: priceValue,
    });
    this.modalService.open(content, { backdrop: 'static', keyboard: false });
  }

  deleteProduct(productId: string): void {
    this.productService
      .removeProductById(productId)
      .subscribe((res: any) => {
        if (res.isDeleted) {
          this.loadProducts();
        } else {
          alert(`Failed to delete product no.${productId}`);
        }
      })
  }

  open(content: any) {
    this.modalService.open(content);
  }

  closeModal() {
    this.productForm.reset();
    this.modalService.dismissAll();
  }

  createProduct() {
    if (this.productForm.valid) {
      const titleValue = this.productForm.get('title')?.value;
      const descriptionValue = this.productForm.get('description')?.value;
      const priceValue = this.productForm.get('price')?.value;

      const product: Product = {
        title: titleValue,
        description: descriptionValue,
        price: priceValue,
      };

      this.productService.
        addProduct(product)
        .subscribe((res: any) => {
          this.modalService.dismissAll();
          if (res.id) {
            this.productForm.reset();
            alert("Successfully created a product");
          }
        });

    } else {

    }
  }

  updateProduct() {
    if (this.productForm.valid && this.productForm.valueChanges && this.newProduct) {
      const titleValue = this.productForm.get('title')?.value;
      const descriptionValue = this.productForm.get('description')?.value;
      const priceValue = this.productForm.get('price')?.value;

      const product: Product = {
        title: titleValue,
        description: descriptionValue,
        price: priceValue,
      };

      this.productService.
        updateProduct(this.newProduct?.id, product)
        .subscribe((res: any) => {
          this.modalService.dismissAll();
          if (res.id) {
            this.productForm.reset();
            alert("Successfully created a product");
          }
        });
    }

  }

}
