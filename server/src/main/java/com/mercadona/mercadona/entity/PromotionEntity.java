package com.mercadona.mercadona.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class PromotionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_promotion")
    private Long id;

    @Column(name = "date_debut")
    private Date date_debut;

    @Column(name = "date_fin")
    private Date date_fin;

    @Column(name = "pourcentage_remise")
    private Float pourcentage_remise;

    @OneToOne
    @JoinColumn(name = "id_article", referencedColumnName = "id_article")
    private ArticleEntity article;

    public PromotionEntity() {
    }

    public PromotionEntity(Date date_debut, Date date_fin, Float pourcentage_remise, ArticleEntity article) {
        this.date_debut = date_debut;
        this.date_fin = date_fin;
        this.pourcentage_remise = pourcentage_remise;
        this.article = article;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate_debut() {
        return date_debut;
    }

    public void setDate_debut(Date date_debut) {
        this.date_debut = date_debut;
    }

    public Date getDate_fin() {
        return date_fin;
    }

    public void setDate_fin(Date date_fin) {
        this.date_fin = date_fin;
    }

    public Float getPourcentage_remise() {
        return pourcentage_remise;
    }

    public void setPourcentage_remise(Float pourcentage_remise) {
        this.pourcentage_remise = pourcentage_remise;
    }

    public ArticleEntity getArticle() {
        return article;
    }

    public void setArticle(ArticleEntity article) {
        this.article = article;
    }
}
