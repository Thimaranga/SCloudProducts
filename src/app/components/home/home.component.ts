import { ProductService } from '../../services/product.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CardItem } from 'src/app/models/cardItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  cardItems: any[] = [];

  constructor(private productService: ProductService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getCards();
  }

  private getCards(): void {
    this.spinner.show();
    const limit:number = 10;
    this.productService.getProducts(limit)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe((res: any) => {
        this.cardItems = res?.products;
      });
  }

  //TODO
  openCardDetails(card: CardItem) {}

}
