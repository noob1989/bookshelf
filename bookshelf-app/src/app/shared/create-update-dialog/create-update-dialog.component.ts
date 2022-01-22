import { Component, Inject, Input, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { positiveNumberValidator } from '../positive-number-validator';
import { IBook, IBookObject } from '../types';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.scss'],
})
export class CreateUpdateDialogComponent implements OnInit {
  book: IBook;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<CreateUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: IBookObject
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      isbn: [
        this.data?.isbn || null,
        [
          Validators.required,
          Validators.pattern(
            '^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$'
          ),
        ],
      ],
      title: [this.data?.title || null, [Validators.required]],
      author: [
        this.data?.author || null,
        [Validators.required, Validators.minLength(3)],
      ],
      publisher: [
        this.data?.publisher || null,
        [Validators.required, Validators.minLength(3)],
      ],
      price: [
        this.data?.price || null,
        [Validators.required, positiveNumberValidator()],
      ],
    });
  }

  public handleSubmit() {
    if (this.form.valid) {
      const book: IBook = {
        isbn: this.form.get('isbn')?.value,
        title: this.form.get('title')?.value,
        author: this.form.get('author')?.value,
        publisher: this.form.get('publisher')?.value,
        price: this.form.get('price')?.value,
      };

      // If we have the id of the book that means that the edit action was triggered
      if (this.data?.id) {
        const bookObject: IBookObject = { ...book, id: this.data.id };

        this.bookService.updateBook(bookObject).subscribe(() => {
          this.closeDialog();
        });
      } else {
        // Else, create a new book
        this.bookService.addBook(book).subscribe((Book) => {
          this.closeDialog();
        });
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
