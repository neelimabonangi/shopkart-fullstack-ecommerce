package com.shop.ecommerce.controller;

import com.shop.ecommerce.entity.Order;
import com.shop.ecommerce.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // ---------------- PLACE ORDER (Checkout) ----------------
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {

        // mock payment success
        order.setPaymentStatus("SUCCESS");
        order.setOrderStatus("PLACED");

        return orderRepository.save(order);
    }

    // ---------------- ORDER HISTORY (User wise) ----------------
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
