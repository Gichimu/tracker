import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Case } from '../case';
import { HttpService } from '../services/http/http.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ELEMENT_DATA: Case[] = [];
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['country', 'cases', 'active', 'deaths', 'recovered'];
  dataSource = new MatTableDataSource<Case>(this.ELEMENT_DATA);


  constructor(private readonly httpservice: HttpService) { }

  ngOnInit(): void {
    
    this.getAllData();
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

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
