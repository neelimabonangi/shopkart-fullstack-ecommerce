package com.shop.ecommerce.service;

import com.shop.ecommerce.entity.Product;
import com.shop.ecommerce.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    // Constructor injection (BEST PRACTICE)
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ✅ Save product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // ✅ Delete product by ID
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}


