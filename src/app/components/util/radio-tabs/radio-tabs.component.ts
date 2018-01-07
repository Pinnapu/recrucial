import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 're-radio-tabs',
  templateUrl: './radio-tabs.component.html',
  styleUrls: ['./radio-tabs.component.scss']
})
export class RadioTabsComponent implements OnInit {
  @Input()
  buttons: Array<{label: string, value: string | number | boolean}>;
  private _value: string | number | boolean;
  private init = true;
  /**
   * Prevent multiple event firing
   */
  private emitCounter = 0;
  private selectedIndex = 0;
  @Output() valueChange = new EventEmitter();
  @Input()
  set value(value: string | number | boolean) {
    this._value = value;
    if ( !this.init) {
      if ( this.emitCounter % 2 === 0 ) {
        this.valueChange.emit(value);
        this.emitCounter++;
      } else {
        this.emitCounter = 0;
      }
    }
  }
  @Input()
  set default(value: string | number | boolean) {
    this._value = value;
  }
  get value() {
    return this._value;
  }

  constructor() {
   }

  ngOnInit() {
    this.init = false;
    this.buttons.filter((button, index) => {
      if ( button.value === this._value ) {
        this.selectedIndex = index;
      }
    });
  }

}
