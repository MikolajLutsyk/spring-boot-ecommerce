package com.mluts.ecommerce.dto;

import com.mluts.ecommerce.entity.Address;
import com.mluts.ecommerce.entity.Customer;
import com.mluts.ecommerce.entity.Order;
import com.mluts.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
