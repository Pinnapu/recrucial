import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 're-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  animations: [
    trigger('checkAnimation', [
      transition('true => false', [
        query('.check-mark', style({ opacity: 1 }), {optional: true}),
        query('.check-mark',  stagger('200ms', [
          animate('0.2s ease-in', keyframes([
              style({opacity: 1, transform: 'rotateX(0deg)', offset: 0}),
              style({opacity: .5, transform: 'rotateX(45deg)', offset: 0.3}),
              style({opacity: 0, transform: 'rotateX(90deg)', offset: 1.0}),
              ])
          )]), {optional: true}),
      ]),
      transition('false => true', [
        query('.check-mark', style({ opacity: 1 }), {optional: true}),
        query('.check-mark',  stagger('500ms', [
          animate('1s ease-in', keyframes([
              style({transform: 'rotateY(-90deg)', offset: 0}),
              style({transform: 'rotateY(-45deg)', offset: 0.3}),
              style({transform: 'rotateY(0deg)', offset: 1.0}),
              ])
          )]), {optional: true}),
      ])
    ])
  ]
})
export class CheckboxComponent implements OnInit {
  private _checked: string | number | boolean;
  private init = true;
  private selectedIndex = 0;
  @Output() valueChange = new EventEmitter();
  @Input()
  set checked(checked: string | number | boolean) {
    this._checked = checked;
      this.valueChange.emit(checked);
  }
  @Input()
  set default(value: string | number | boolean) {
    this._checked = value;
  }
  get checked() {
    return this._checked;
  }

  constructor() {
   }

  ngOnInit() {
    this.init = true;
  }

}
