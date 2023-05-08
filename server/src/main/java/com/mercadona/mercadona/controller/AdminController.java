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

import com.mercadona.mercadona.entity.AdminEntity;
import com.mercadona.mercadona.service.AdminService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService AdminService) {
        this.adminService = AdminService;
    }

    @GetMapping
    public List<AdminEntity> findAllAdmin() {
        return adminService.findAllAdmin();
    }

    @GetMapping("/{id}")
    public Optional<AdminEntity> findAdminById(@PathVariable("id") Long id) {
        return adminService.findById(id);
    }

    @PostMapping
    public AdminEntity verifyAdminCredentials(@RequestBody AdminEntity adminEntity) {
        return adminService.verifyAdminCredentials(adminEntity);
    }

    @PutMapping
    public AdminEntity updateAdmin(@RequestBody AdminEntity adminEntity) {
        return adminService.updateAdmin(adminEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteAdmin(@PathVariable("id") Long id) {
        adminService.deleteAdmin(id);
    }

}