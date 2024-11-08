package com.mluts.ecommerce.service;

import com.mluts.ecommerce.dto.Purchase;
import com.mluts.ecommerce.dto.PurchaseResponse;
import com.mluts.ecommerce.entity.Customer;
import com.mluts.ecommerce.entity.Order;
import com.mluts.ecommerce.entity.OrderItem;
import com.mluts.ecommerce.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve data from dto
        Order order = purchase.getOrder();

        //generate tracking number
        String orderTrackNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackNumber);
        //populate order with
        //orderItem

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        //billingAddress shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        //populate customer
        //order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        //save to db
        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackNumber);
    }

    //random tracking number generation
    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
