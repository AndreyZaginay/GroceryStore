import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public orderPrice$!: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private readonly basketService: BasketService
  ){}

  ngOnInit(): void {
    this.orderPrice$ = this.basketService.sumUp();
  }

  closeDialog(): void {
    console.log('successful');
    this.basketService.purchases = [];
    this.basketService.emitPurchases([]);
    this.dialogRef.close();
  }
}
