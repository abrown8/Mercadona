package com.mercadona.mercadona.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mercadona.mercadona.entity.CategorieEntity;

@Repository
public interface CategorieRepository extends JpaRepository<CategorieEntity, Long> {

}
