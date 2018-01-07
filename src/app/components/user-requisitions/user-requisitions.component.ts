import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import {map} from 'rxjs/operators';

@Component({
  selector: 're-user-requisitions',
  templateUrl: './user-requisitions.component.html',
  styleUrls: ['./user-requisitions.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('80ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, filter: 'blur(5px)', transform: 'rotateY(-90deg)', offset: 0}),
            style({opacity: .5, filter: 'blur(2.5px)', transform: 'rotateY(-45deg)', offset: 0.3}),
            style({opacity: 1, filter: 'blur(0px)', transform: 'rotateY(0deg)', offset: 1.0}),
          ]))]), {optional: true}),
        query(':leave', stagger('12ms', [
          animate('1s ease-out', keyframes([
            style({opacity: 1, transform: 'rotateY(0deg)', offset: 0}),
            style({opacity: .5, transform: 'rotateY(45deg)',  offset: 0.3}),
            style({opacity: 0, transform: 'rotateY(90deg)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class UserRequisitionsComponent implements OnInit {
  buttons: Array<{label: string, value: string | number | boolean}>;
  columns: Array<{width: string, label: string}>;
  data: Array<{
    selected: boolean,
    title: string,
    reqID: string,
    recName: string,
    hireMgr: string,
    privacy: string}>;
  selected = 0;
  searchText = '';
  tab = 'my';
  constructor(private http: HttpClient) {
    this.buttons = [
      {label: 'My Requisitions', value: 'my'},
      {label: 'Recent Requisitions', value: 'rec'},
      {label: 'All Requisitions', value: 'all'}
    ];
    this.columns = [{width: '290px', label: 'Requisition'},
                    {width: '145px', label: 'Requisition ID'}, {width: '145px', label: 'Recruiter'},
                    {width: '145px', label: 'Hiring'}, {width: '145px', label: 'Privacy'}];
  }

  ngOnInit() {
    this.http.get('/assets/data.json').subscribe((response: any) => {
      this.data = response;
      this.getSelectedCount();
    });
  }

  onValueChange(value) {
    let count = 0;
    this.data.forEach((row) => {
      !!row.selected ? count++ : count = count;
    });
    this.selected = count;
  }

  selectAll(value) {
    if (!!this.data) {
      this.data.map((row) => {
        if ( this.searchText.length !== 0 ) {
          const found = this.hasText(row.title, this.searchText)
          || this.hasText(row.hireMgr, this.searchText)
          || this.hasText(row.recName, this.searchText)
          || this.hasText(row.reqID, this.searchText);
            row.selected = found ? value : row.selected;
        } else {
          row.selected = value;
        }
      });
    }
  }

  getColumns(row) {
    const col = [];
    Object.keys(row).filter((key, index) => {
      if ( index !== 0 ) {
        col.push(row[key]);
      }
    });
    return col;
  }

  getFilteredData() {
    return this.data && this.data.filter((row) => {
      if ( this.searchText.length !== 0 ) {
        return this.hasText(row.title, this.searchText)
                || this.hasText(row.hireMgr, this.searchText)
                || this.hasText(row.recName, this.searchText)
                || this.hasText(row.reqID, this.searchText);
      }
      return true;
    }) || [];
  }

  hasText(src: string, search: string): boolean {
    if ( !!src && src.length && !!search && search.length) {
      return src.toLowerCase().indexOf(search.toLowerCase()) > -1;
    }
    return false;
  }

  getSelectedCount() {
    let count = 0;
    this.data.forEach((row) => {
      !!row.selected ? count++ : count = count;
    });
    this.selected = count;
    return count;
  }
}
