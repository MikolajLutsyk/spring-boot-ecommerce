package com.mluts.ecommerce.repositories;

import com.mluts.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


//without @RepositoryRestResource annotation because we provide custom implementation of endpoints
public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
