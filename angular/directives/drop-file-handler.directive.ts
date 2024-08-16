import {
  Directive,
  HostBinding,
  HostListener,
  output
} from '@angular/core';

/**
 *
 * @example
 * ```html
 * <div dropFileHandler (files)="handleFiles($event)"></div>
 * ``` 
 */
@Directive({
  selector: '[dropFileHandler]',
  standalone: true,
  exportAs: 'drop-file-handler',
})
export class FileDropHandlerDirective {
  //@Output() files = new EventEmitter<File[]>();
  files = output<File[]>();
  @HostBinding('class') private onDragging = '';
  // #sanitizer = inject(DomSanitizer);

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onDragging = 'on-dragging';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onDragging = '';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onDragging = '';
    let files: File[] = [];
    for (let i = 0; i < evt.dataTransfer!.files.length; i++) {
      const file = evt.dataTransfer!.files[i];
      // const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push(file);
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
