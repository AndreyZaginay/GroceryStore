import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
  standalone: true
})
export class DragAndDropDirective {

  @Output()
  readonly dropFile = new EventEmitter<File>();

  @HostListener('dragover', ['$event'])
  onDragOver(e: DragEvent) {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer!.files[0];
    if (!file || file.type !== 'image/jpeg') {
      return;
    }
    this.dropFile.emit(file);
  }
}
