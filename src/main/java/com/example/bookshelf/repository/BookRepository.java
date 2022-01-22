package com.example.bookshelf.repository;

import com.example.bookshelf.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String> {
    @Query("SELECT b FROM Book b WHERE lower(CONCAT(b.isbn,' ', b.title,' ', b.author,' ', b.publisher)) LIKE lower(CONCAT('%',?1,'%'))")
    public List<Book> search(String keyword);
}
