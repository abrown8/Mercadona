package com.mercadona.mercadona.service;

import com.mercadona.mercadona.entity.PromotionEntity;
import java.util.List;
import java.util.Optional;

public interface PromotionService {
    List<PromotionEntity> findAllPromotion();

    Optional<PromotionEntity> findById(Long id);

    PromotionEntity savePromotion(PromotionEntity promotionEntity);

    PromotionEntity updatePromotion(PromotionEntity promotionEntity);

    void deletePromotion(Long id);
}
