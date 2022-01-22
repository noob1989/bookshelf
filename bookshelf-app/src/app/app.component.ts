import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateDialogComponent } from './shared/create-update-dialog/create-update-dialog.component';
import { IBook, IBookObject } from './shared/types';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  books: IBookObject[];
  dataToDisplay: IBook[];

  displayedColumns: string[] = [
    'isbn',
    'title',
    'author',
    'publisher',
    'price',
    'actions',
  ];

  constructor(private bookService: BookService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getBooks();
  }

  onSearchChange = (value: string): void => {
    if (value) {
      this.getBooks(value);
    } else {
      this.getBooks();
    }
  };

  getBooks(keyword?: string): void {
    this.bookService.getBooks(keyword).subscribe({
      next: (response) => {
        this.books = response;
        this.dataToDisplay = this.books;
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  addBook() {
    const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
      width: '300px',
    });

    // The book has been created and now we want to refresh the list of books
    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    });
  }
  editBook(book: IBookObject) {
    const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
      width: '300px',
      data: book,
    });

    // The book has been updated and now we want to refresh the list of books
    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    });
  }

  deleteBook(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this book?',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        console.log(result);

        this.bookService.deleteBook(id).subscribe(() => {
          // The book has been deleted and now we want to refresh the list of books
          this.getBooks();
        });
      }
    });
  }
}
