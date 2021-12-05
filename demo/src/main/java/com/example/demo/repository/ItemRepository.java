package com.example.demo.repository;

import com.example.demo.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>
{
    @Query(value = "SELECT i FROM Item i WHERE (i.name LIKE CONCAT('%', :searchKey, '%') OR i.description LIKE CONCAT('%', :searchKey, '%')) AND i.isDeleted = false")
    Page<Item> searchItems(Pageable pageable, @Param("searchKey") String searchKey);
}
