package com.mercadona.mercadona.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mercadona.mercadona.entity.ArticleEntity;
import com.mercadona.mercadona.service.ArticleService;

@RestController
@RequestMapping("/article")
@CrossOrigin(origins = "http://localhost:4200")
public class ArticleController {
    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public List<ArticleEntity> findAllArticle() {
        return articleService.findAllArticle();
    }

    @GetMapping("/{id}")
    public Optional<ArticleEntity> findArticleById(@PathVariable("id") Long id) {
        return articleService.findById(id);
    }

    @PostMapping
    public ArticleEntity savArticle(@RequestBody ArticleEntity articleEntity) {
        return articleService.saveArticle(articleEntity);
    }

    @PutMapping
    public ArticleEntity updateArticle(@RequestBody ArticleEntity articleEntity) {
        return articleService.updateArticle(articleEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(@PathVariable("id") Long id) {
        articleService.deleteArticle(id);
    }

}