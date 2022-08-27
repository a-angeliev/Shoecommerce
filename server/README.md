

># ENDPOINTS  
>
>> ### USERS
>>"/lgoin"   ==> POST  
>"/register"  ==> POST  
>"/user/:id" ==> PUT DELETE GET  
>"/user/:id/orders" ==> GET  
> "/user/:id/comments" ==> GET  
> 
>> ### PRODUCTS   
>>"/product" ==> POST              (?where:category_title="sport")
>"/product/:id" ==> PUT DELETE GET /PATCH/  
>
>>  ### COMMENTS
>>"/comments/:product_id"  ==> GET POST DELETE PUT  
> 
>> ### ORDERS
>>"/orders"  ==> GET /ADMIN/  
> "/orders/:id" ==> PUT /ADMIN/
> "/orders/:user_id"  ==> GET  
> 
>> ### WISHES
>> "/wishes/:user_id"  ==>  GET DELETE POST
> 
>> ### NEWSLETTER
>> "/newsletter"  ==> POST DELETE | GET  
>  
>> ### DISCOUNT
>> "/discount"  ==> POST GET  /ADMIN/   
>  "/discount/:id"  ==> PUT DELETE GET  /ADMIN/  
>  "/discount/check" ==> POST  {discount: discount, isValid: true}
>   
>> ### CATEGORY 
>> "/category"  ==> GET | POST /ADMIN/  
>  "/category/:id"  ==> GET PUT DELETE  /ADMIN/  
> 
>> ### BRAND
>> "/brand"  ==> GET | POST /ADMIN/  
>  "/brand/:id"  ==> GET PUT DELETE  /ADMIN/  