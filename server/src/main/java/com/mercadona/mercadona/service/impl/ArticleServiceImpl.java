package com.mercadona.mercadona.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mercadona.mercadona.entity.ArticleEntity;
import com.mercadona.mercadona.repository.ArticleRepository;
import com.mercadona.mercadona.service.ArticleService;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public List<ArticleEntity> findAllArticle() {
        return articleRepository.findAll();
    }

    @Override
    public Optional<ArticleEntity> findById(Long id) {
        return articleRepository.findById(id);
    }

    @Override
    public ArticleEntity saveArticle(ArticleEntity articleEntity) {
        return articleRepository.save(articleEntity);
    }

    @Override
    public ArticleEntity updateArticle(ArticleEntity articleEntity) {
        return articleRepository.save(articleEntity);
    }

    @Override
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }

}
