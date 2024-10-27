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
  showPasswords = false;
  paginatedDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.passwordHistoryUpdated.subscribe(this.updatePasswordHistory);
    this.updateDataSource();
  }

  ngAfterViewInit() {
    this.paginatedDataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['passwordHistory'] && !changes['passwordHistory'].isFirstChange()) {
      this.updateDataSource();
    }
  }

  toggleShowPasswords() {
    this.showPasswords = !this.showPasswords;
  }

  private updatePasswordHistory = (history: any[]) => {
    this.passwordHistory = [...history].sort((a, b) =>
      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    );
    this.updateDataSource();
  }

  private updateDataSource() {
    this.paginatedDataSource.data = this.passwordHistory;
  }
}
