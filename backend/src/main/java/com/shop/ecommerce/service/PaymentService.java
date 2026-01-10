package com.shop.ecommerce.service;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    // Mock payment logic
    public boolean processPayment(Double amount) {

        // Simulate payment success (always true for now)
        return true;
    }
}

