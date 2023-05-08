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

import com.mercadona.mercadona.entity.PromotionEntity;
import com.mercadona.mercadona.service.PromotionService;

@RestController
@RequestMapping("/promotion")
@CrossOrigin(origins = "http://localhost:4200")
public class PromotionController {
    private final PromotionService promotionService;

    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @GetMapping
    public List<PromotionEntity> findAllPromotion() {
        return promotionService.findAllPromotion();
    }

    @GetMapping("/{id}")
    public Optional<PromotionEntity> findPromotionById(@PathVariable("id") Long id) {
        return promotionService.findById(id);
    }

    @PostMapping
    public PromotionEntity savePromotion(@RequestBody PromotionEntity promotionEntity) {
        return promotionService.savePromotion(promotionEntity);
    }

    @PutMapping
    public PromotionEntity updatePromotion(@RequestBody PromotionEntity promotionEntity) {
        return promotionService.updatePromotion(promotionEntity);
    }

    @DeleteMapping("/{id}")
    public void deletePromotion(@PathVariable("id") Long id) {
        promotionService.deletePromotion(id);
    }

}