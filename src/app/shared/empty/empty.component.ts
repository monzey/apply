import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  @Input() public actionLabel: string;
  @Input() public icon: string;
  @Input() public condition: boolean = true;
  @Output() public action: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public triggerAction(): void {
    this.action.emit();
  }

}
