package com.shop.ecommerce.controller;

import com.shop.ecommerce.entity.CartItem;
import com.shop.ecommerce.repository.CartRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // ---------------- ADD TO CART ----------------
    @PostMapping
    public CartItem addToCart(@RequestBody CartItem cartItem,
                              Authentication authentication) {

        // email comes from JWT
        String email = authentication.getName();
        cartItem.getUser().setEmail(email);

        return cartRepository.save(cartItem);
    }

    // ---------------- GET CART (JWT BASED) ----------------
    @GetMapping
    public List<CartItem> getCart(Authentication authentication) {

        String email = authentication.getName();
        return cartRepository.findByUserEmail(email);
    }

    // ---------------- REMOVE ITEM ----------------
    @DeleteMapping("/{id}")
    public void removeItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }

    // ---------------- CLEAR CART ----------------
    @DeleteMapping("/clear")
    public void clearCart(Authentication authentication) {

        String email = authentication.getName();
        cartRepository.deleteByUserEmail(email);
    }
}
