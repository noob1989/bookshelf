package com.example.bookshelf.services;

import com.example.bookshelf.model.Book;
import com.example.bookshelf.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> findAllBooks(String keyword) {
        if (keyword != null) {
            return bookRepository.search(keyword);
        }
        return bookRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
    }

    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }

    public Book findBookById(String id) {
        return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book by id " + id + " was not found"));
    }

    public List<Book> findBook() {
    return bookRepository.findAll();
    }

    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }
}
