import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
  }


  //submit method for the form
  onSubmit() {
    //logging
    console.log("Handling the submit button");
    console.log("Customer data in the form: " + this.checkoutFormGroup.get('customer').value.firstName + " ; " +
      this.checkoutFormGroup.get('customer').value.lastName + " ; " +
      this.checkoutFormGroup.get('customer').value.email);
  }

  //method for the checkbox for copying shipping address to billing address
  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      //if checked, copy data from shipping address to billing address group
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      //in other case, just erase fields of billing address group
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
}