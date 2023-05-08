package com.mercadona.mercadona.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CategorieEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categorie")
    private Long id;

    @Column(name = "libele")
    private String libele;

    public CategorieEntity() {
    }

    public CategorieEntity(Long id, String libele) {
        this.id = id;
        this.libele = libele;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getLibele() {
        return libele;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setLibele(String libele) {
        this.libele = libele;
    }
}