package com.mluts.ecommerce.service;

import com.mluts.ecommerce.dto.Purchase;
import com.mluts.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

}
