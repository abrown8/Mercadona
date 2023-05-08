package com.mercadona.mercadona.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mercadona.mercadona.entity.PromotionEntity;
import com.mercadona.mercadona.repository.PromotionRepository;
import com.mercadona.mercadona.service.PromotionService;

@Service
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepository promotionRepository;

    public PromotionServiceImpl(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    @Override
    public List<PromotionEntity> findAllPromotion() {
        return promotionRepository.findAll();
    }

    @Override
    public Optional<PromotionEntity> findById(Long id) {
        return promotionRepository.findById(id);
    }

    @Override
    public PromotionEntity savePromotion(PromotionEntity promotionEntity) {
        return promotionRepository.save(promotionEntity);
    }

    @Override
    public PromotionEntity updatePromotion(PromotionEntity promotionEntity) {
        return promotionRepository.save(promotionEntity);
    }

    @Override
    public void deletePromotion(Long id) {
        promotionRepository.deleteById(id);
    }

}
