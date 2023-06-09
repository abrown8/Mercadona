package com.mercadona.mercadona.service;

import com.mercadona.mercadona.entity.CategorieEntity;
import java.util.List;
import java.util.Optional;

public interface CategorieService {
    List<CategorieEntity> findAllCategorie();

    Optional<CategorieEntity> findById(Long id);

    CategorieEntity saveCategorie(CategorieEntity categorieEntity);

    CategorieEntity updateCategorie(CategorieEntity categorieEntity);

    void deleteCategorie(Long id);
}
