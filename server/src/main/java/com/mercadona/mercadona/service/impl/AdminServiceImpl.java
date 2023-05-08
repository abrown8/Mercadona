package com.mercadona.mercadona.service.impl;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.mercadona.mercadona.entity.AdminEntity;
import com.mercadona.mercadona.repository.AdminRepository;
import com.mercadona.mercadona.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public List<AdminEntity> findAllAdmin() {
        return adminRepository.findAll();
    }

    @Override
    public Optional<AdminEntity> findById(Long id) {
        return adminRepository.findById(id);
    }

    @Override
    public AdminEntity verifyAdminCredentials(AdminEntity adminEntity) {
        String email = adminEntity.getEmail();
        String password = adminEntity.getPassword();

        Optional<AdminEntity> adminOptional = adminRepository.findByEmail(email);
        if (!adminOptional.isPresent()) {
            return null;
        }

        AdminEntity admin = adminOptional.get();
        String hashedPassword = admin.getPassword();
        // System.out.println(BCrypt.hashpw(password, BCrypt.gensalt()));

        if (!BCrypt.checkpw(password, hashedPassword)) {
            return null;
        }

        return admin;
    }

    @Override
    public AdminEntity updateAdmin(AdminEntity adminEntity) {
        return adminRepository.save(adminEntity);
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

}
