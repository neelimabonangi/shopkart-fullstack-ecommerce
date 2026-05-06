package com.shop.ecommerce.controller;

import com.shop.ecommerce.entity.CartItem;
import com.shop.ecommerce.repository.CartRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // ✅ Add to Cart
    @PostMapping
    public CartItem addToCart(@RequestBody CartItem cartItem,
                             Authentication authentication) {

        String email = authentication.getName();
        cartItem.getUser().setEmail(email);

        return cartRepository.save(cartItem);
    }

    // ✅ Get Cart
    @GetMapping
    public List<CartItem> getCart(Authentication authentication) {

        String email = authentication.getName();
        return cartRepository.findByUserEmail(email);
    }

    // ✅ Remove Item
    @DeleteMapping("/{id}")
    public void removeItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }

    // ✅ Clear Cart
    @DeleteMapping("/clear")
    public void clearCart(Authentication authentication) {

        String email = authentication.getName();
        cartRepository.deleteByUserEmail(email);
    }
}