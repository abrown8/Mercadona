package com.mercadona.mercadona.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercadona.mercadona.entity.CategorieEntity;
import com.mercadona.mercadona.service.CategorieService;

@RestController
@RequestMapping("/categorie")
@CrossOrigin(origins = "http://localhost:4200")
public class CategorieController {
    private final CategorieService categorieService;

    public CategorieController(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    @GetMapping
    public List<CategorieEntity> findAllCategorie() {
        return categorieService.findAllCategorie();
    }

    @GetMapping("/{id}")
    public Optional<CategorieEntity> findCategorieById(@PathVariable("id") Long id) {
        return categorieService.findById(id);
    }

    @PostMapping
    public CategorieEntity saveCategorie(@RequestBody CategorieEntity categorieEntity) {
        return categorieService.saveCategorie(categorieEntity);
    }

    @PutMapping
    public CategorieEntity updateCategorie(@RequestBody CategorieEntity categorieEntity) {
        return categorieService.updateCategorie(categorieEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteCategorie(@PathVariable("id") Long id) {
        categorieService.deleteCategorie(id);
    }

}