import { Component, ElementRef, ViewChild } from '@angular/core';
import { DragAndDropDirective } from '@directives/drag-and-drop.directive';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [    
  DragAndDropDirective,  
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  file: File | undefined;

  @ViewChild('fileInput')
  readonly fileInput!: ElementRef<HTMLInputElement>;

  selectFile(e: Event) {
    this.setUpFile((e.target as HTMLInputElement).files![0]);
  }

  dragFile(file: File) {
    const dataTransfer = new DataTransfer;
    dataTransfer.items.add(file);
    this.fileInput.nativeElement.files = dataTransfer.files;
    this.setUpFile(file);
  }

  setUpFile(file: File) {
    this.file = file;
    console.log(file.name);
  }
}
