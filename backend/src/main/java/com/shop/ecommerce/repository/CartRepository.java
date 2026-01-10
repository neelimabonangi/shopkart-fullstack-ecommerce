package com.shop.ecommerce.repository;

import com.shop.ecommerce.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Long> {

    // ✅ Fetch cart items using user's email
    List<CartItem> findByUserEmail(String email);

    // ✅ Delete all cart items of a user
    void deleteByUserEmail(String email);
}

