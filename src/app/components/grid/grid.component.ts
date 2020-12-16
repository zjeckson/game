import {
  Component,
  OnInit,
  AfterContentChecked,
  ViewChild,
  ElementRef,
  Renderer2, Output, Input
} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  providers: []
})
export class GridComponent implements OnInit, AfterContentChecked {
  @ViewChild('grid')
  grid: ElementRef;

  @Output()
  private event: MouseEvent;

  @Input()
  public width = 700;

  @Input()
  public height = 500;

  @Input()
  public cellNumber = 50;

  private context: CanvasRenderingContext2D;
  private cellWidth: number = this.width / this.cellNumber;
  private cellHeight: number = this.height / this.cellNumber;
  private clientX: number;
  private clientY: number;
  private rect: any;

  constructor(private render: Renderer2) {}

  ngOnInit() {
    this.render.listen('window', 'load', () => {
      this.rect = this.grid.nativeElement.getBoundingClientRect();
    });
  }

  ngAfterContentChecked() {
    this.context = (this.grid.nativeElement as HTMLCanvasElement).getContext('2d');
    this.drawGrid();
  }

  onEvent(event: MouseEvent): void {
    this.event = event;
  }

  getCoords(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  public paintCell() {
    const { x, y } = this.getSquare();
    this.fillSquare(x, y);
  }

  private drawGrid() {
    this.context.strokeStyle = 'grey';
    let x = 0;
    let y = 0;
    while (y <= this.height && x <= this.width) {
      this.context.moveTo(0, y);
      this.context.lineTo(this.width, y);
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.height);
      x += this.cellWidth;
      y += this.cellHeight;
    }
    this.context.stroke();
  }

  private getSquare() {
    return {
      x: 1 + (this.clientX - this.rect.left) - ((this.clientX - this.rect.left) % this.cellWidth),
      y: 1 + (this.clientY - this.rect.top) - ((this.clientY - this.rect.top) % this.cellHeight)
    };
  }

  private fillSquare(x, y) {
    this.context.fillStyle = 'black';
    this.context.fillRect(x, y, this.cellWidth, this.cellHeight);
  }
}
