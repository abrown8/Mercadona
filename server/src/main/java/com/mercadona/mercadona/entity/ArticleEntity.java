package com.mercadona.mercadona.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class ArticleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_article")
    private Long id;

    @Column(name = "libele")
    private String libele;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "prix")
    private Float prix;

    @OneToOne
    @JoinColumn(name = "id_categorie", referencedColumnName = "id_categorie")
    private CategorieEntity categorie;

    public ArticleEntity() {
    }

    public ArticleEntity(Long id, String libele, String description, String image, Float prix,
            CategorieEntity categorie) {
        this.id = id;
        this.libele = libele;
        this.description = description;
        this.image = image;
        this.prix = prix;
        this.categorie = categorie;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getLibele() {
        return libele;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public Float getPrix() {
        return prix;
    }

    public CategorieEntity getCategorie() {
        return categorie;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setLibele(String libele) {
        this.libele = libele;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setPrix(Float prix) {
        this.prix = prix;
    }

    public void setCategorie(CategorieEntity categorie) {
        this.categorie = categorie;
    }

}
