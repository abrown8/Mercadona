package com.mercadona.mercadona.service;

import com.mercadona.mercadona.entity.ArticleEntity;
import java.util.List;
import java.util.Optional;

public interface ArticleService {
    List<ArticleEntity> findAllArticle();

    Optional<ArticleEntity> findById(Long id);

    ArticleEntity saveArticle(ArticleEntity articleEntity);

    ArticleEntity updateArticle(ArticleEntity articleEntity);

    void deleteArticle(Long id);
}
