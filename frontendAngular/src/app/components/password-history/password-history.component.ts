import { Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-password-history',
  templateUrl: './password-history.component.html',
  styleUrls: ['./password-history.component.css']
})
export class PasswordHistoryComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() passwordHistoryUpdated!: EventEmitter<any[]>;
  @Input() passwordHistory: any[] = [];
  showPasswords: boolean = false;
  paginatedDataSource = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.passwordHistoryUpdated.subscribe((history: any[]) => {
      this.passwordHistory = [...history];
      this.sortPasswordHistory();
      this.updateDataSource();
    });
    this.updateDataSource();
  }

  ngAfterViewInit() {
    this.paginatedDataSource.paginator = this.paginator;
  }

  toggleShowPasswords() {
    this.showPasswords = !this.showPasswords;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['passwordHistory'] && !changes['passwordHistory'].isFirstChange()) {
      this.sortPasswordHistory();
      this.updateDataSource();
    }
  }

  sortPasswordHistory() {
    this.passwordHistory.sort((a: { generatedAt: string | number | Date }, b: { generatedAt: string | number | Date }) => 
      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    );
  }

  updateDataSource() {
    this.paginatedDataSource.data = this.passwordHistory;
  }
}
