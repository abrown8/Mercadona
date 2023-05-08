package com.mercadona.mercadona.service;

import com.mercadona.mercadona.entity.AdminEntity;
import java.util.List;
import java.util.Optional;

public interface AdminService {
    List<AdminEntity> findAllAdmin();

    Optional<AdminEntity> findById(Long id);

    AdminEntity verifyAdminCredentials(AdminEntity adminEntity);

    AdminEntity updateAdmin(AdminEntity adminEntity);

    void deleteAdmin(Long id);
}
