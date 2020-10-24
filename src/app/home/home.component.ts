import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Case } from '../case';
import { HttpService } from '../services/http/http.service';

export interface DialogData {
  country: string;
  countryFlag: string;   
  cases: number;
  active: number;
  deaths: number;
  recovered: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ELEMENT_DATA: Case[] = [];

  tweets: any[] = []
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['country', 'cases', 'active', 'deaths', 'recovered'];
  dataSource = new MatTableDataSource<Case>(this.ELEMENT_DATA);


  constructor(private readonly httpservice: HttpService, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getAllData();
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


    this.httpservice.getTweets().subscribe(
      data => this.tweets = data
    )
    
  }

  getTweets(): void{
    
    
    
  }

  getCountryInfo(row: string): void{
    this.dialog.open(DialogContentExampleDialog, {
      data: row
    })
  }

  getAllData(): void{
    this.httpservice.getAll().subscribe(
      data => this.dataSource.data = data as Case[]
    )
  }

  filterCountry(filterText: string): void{
    this.dataSource.filter = filterText.trim().toLowerCase()
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['dialog-content-example-dialog.css'],
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}