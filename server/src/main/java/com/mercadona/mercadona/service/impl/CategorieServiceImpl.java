package com.mercadona.mercadona.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mercadona.mercadona.entity.CategorieEntity;
import com.mercadona.mercadona.repository.CategorieRepository;
import com.mercadona.mercadona.service.CategorieService;

@Service
public class CategorieServiceImpl implements CategorieService {

    private final CategorieRepository categorieRepository;

    public CategorieServiceImpl(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @Override
    public List<CategorieEntity> findAllCategorie() {
        return categorieRepository.findAll();
    }

    @Override
    public Optional<CategorieEntity> findById(Long id) {
        return categorieRepository.findById(id);
    }

    @Override
    public CategorieEntity saveCategorie(CategorieEntity categorieEntity) {
        return categorieRepository.save(categorieEntity);
    }

    @Override
    public CategorieEntity updateCategorie(CategorieEntity categorieEntity) {
        return categorieRepository.save(categorieEntity);
    }

    @Override
    public void deleteCategorie(Long id) {
        categorieRepository.deleteById(id);
    }

}
