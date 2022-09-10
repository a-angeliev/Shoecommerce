
># ENDPOINTS  
>
>> ### USERS
>>"/login"   ==> POST   :white_check_mark:   
>"/register"  ==> POST  :white_check_mark:   
>"/user/:id" ==> PUT GET    :white_check_mark:   DELETE :heavy_multiplication_x:   
>"/user/:id/orders" ==> GET  
> "/user/:id/comments" ==> GET  
> 
>> ### PRODUCTS   
>>"/products" ==> POST GET  :white_check_mark:      
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
>> "/category"  ==> GET | POST /ADMIN/  :white_check_mark:   
>  "/category/:id"  ==> GET PUT DELETE  /ADMIN/  
> 
>> ### BRAND
>> "/brand"  ==> GET | POST /ADMIN/    :white_check_mark:   
>  "/brand/:id"  ==> GET PUT DELETE  /ADMIN/  

![Database schema](https://i.ibb.co/DMZmMtC/Shoecommerce-database-schema.png)


# REST API

The REST API to the app is described below.


- [Register](#register)
- [Login](#login)
- [User](#user)
    - [Get information about user](#get-information-about-user)
    - [Edit user](#edit-user)
- [Brand](#brand)
    - [Create brand](#create-brand)
    - [Get brands information](#get-brand-information)
>## Register
>### Request
>`[POST] "/register"`
>
>```json
>{
>    "user_data":{
>        "f_name": "firstName",
>        "l_name": "lastName",
>        "phone": "0888429842"
>    },
>    "email": "some@email.com",
>    "password": "goodpassword1"
>}
>```
>### Response
> 
> ```json
> "{\"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0LCJleHAiOjE2NzA0Mzg4OTd9.YVu0irTJl3ZOxdharUiMipaNhHQkAFe3RMd3JCD6iyc\", \"user_id\": 34, \"role\": \"user\"}"
>```
>Server validations are:   
> - Email must be correct email string.   
> - Password must be between 5 and 60 characters.   
> - Password must have atleast one number.   
> - First name must be between 2 and 60 characters.
> - Last name must be between 2 and 60 characters.
>
> Example error massages
>```json
>{
>    "message": {
>        "email": [
>            "Missing data for required field."
>        ],
>        "user_data": {
>            "l_name": [
>                "Length must be between 2 and 60."
>            ],
>            "f_name": [
>                "Length must be between 2 and 60."
>            ],
>            "phone": [
>                "Not a valid integer."
>            ]
>        },
>        "password": [
>            "Length must be between 5 and 60.",
>            "Password must have atleast one number."
>        ]
>    }
>}
>```

>## Login
>### Request
>`[POST] "/login"`
>```json
>{
>    "password": "23233223",
>    "email": "email@abv.bg"
>}
>``` 
>### Response
> ```json
> "{\"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0LCJleHAiOjE2NzA0Mzg4OTd9.YVu0irTJl3ZOxdharUiMipaNhHQkAFe3RMd3JCD6iyc\", \"user_id\": 34, \"role\": \"user\"}"
>```
> Server validations are:
> - Must have sent all fields(email and password)
> - Email must be valid email string
> 
> Example error massages
> If email is valid email string:
> ```json
> {
>    "message": "Wrong email or password!"
> }
>```
>If email is not a valid email string or missing some key (email or password), error will be:
>```json
>{
>    "message": {
>        "email": [
>            "Not a valid email address."
>        ],
>        "password": [
>            "Missing data for required field."
>        ]
>    }
>}
>```

># User
>## Get information about user
>### Request
>`[GET] "/user/:id_"`   
>### Response
> ```json
> "{\"user_data\": {\"f_name\": \"newName1\", \"l_name\": \"newName1\", \"phone\": 1111111}, \"id\": 35, \"email\": \"zrd@zdr2.com\"}"
>```
> Server validations are:
> - Request must have "x-access-token" Header.
> - "x-access-token" value must be with the same id after decode.
> 
> Example error messages If you try to take other user id data:
> ```json
> {
>    "message": "You dont have permission to this resource!"
> }
> ```
> If token is missing:
> ```json
> {
>    "message": "A valid token is missing!"
> }
>```
>## Edit user  
>### Request   
>`[PUT] "/user/:id_"`
> ```json
> {
>    "user_data":{
>        "f_name": "newName1",
>        "l_name": "newName1",
>        "phone": 1111111
>    },
>    "email": "zrd@zdr2.com"
> }
>```
>### Response
>```json
>"{\"user_data\": {\"f_name\": \"newName1\", \"l_name\": \"newName1\", \"phone\": 1111111}, \"id\": 35, \"email\": \"zrd@zdr3.com\"}" 
>```
>Server validations are:
> - Request must have "x-access-token" Header.
> - "x-access-token" value must be with the same id after decode.   
> 
>Example error messages If don't have "x-access-token":
> ```json
> {
>    "message": "A valid token is missing!"
> }
>```
> If missing field:
> ```json
> {
>    "message": {
>        "user_data": {
>            "l_name": [
>                "Missing data for required field."
>            ]
>        }
>    }
> }
>```

># Brand
>## Create brand
>### Request
>`[POST] "/brand"`
> ```json
> {
>    "name": "Puma",
>    "description": "some description",
>    "logo_url": "https://somesdurl.com"
> }
>```
>### Response
> ```json
> {
>    "description": "randomBrandDescription", 
>    "logo_url": "https://randomLogoUrl", 
>    "id": 15, 
>    "name": "randomBrandName", 
>    "products": []
> }
> ```
> Server validations are:
> - Required admin authorization.
> - Request must have body with fields - name, description and logo_url.
> - Logo_url must be string**
> 
> Example error massage:
> ```json
> {
>   "message": {
>        "name": [
>            "Missing data for required field."
>        ],
>        "description": [
>            "Missing data for required field."
>        ],
>        "logo_url": [
>            "Missing data for required field."
>        ]
>    }
> }
>```
>## Get brand information
>### Request
>`[GET] "/brand"`
>
>### Response
> ```json
> [
>    {
>        "id": 2,
>        "logo_url": "https://someurl.com",
>        "name": "nike",
>        "description": "some text"
>    },
>    {
>        "id": 3,
>        "logo_url": "https://somesdurl.com",
>        "name": "some",
>        "description": "some textsd"
>    }
>  ]
> ```
>## Sort products by brand
> To do this you should use url parameters. The endpoint is the same as brand information but at the end you should put the "?brand=". After "=" you can add name of the brand that you want to get products for this brand.   
> Example "/brand?brand=all" -> That will return information about all brands and there products.   
> Example2 "/brand?brand=nike" -> That will return information about Nike brand and all products that are in this brand.   
> Example3 "/brand?brand=brandThatDoesntExist" -> That will return error message.    
> 
> ### Request
> `/brand?brand=nike`
> ### Response
> ```json
> {
>    "logo_url": "https://somesdurl.com",
>    "description": "some textsd",
>    "name": "some",
>    "id": 3,
>    "products": [
>        {
>            "discount": 11,
>            "images": [
>                {
>                    "img_url": "https://link6.com"
>                },
>                {
>                    "img_url": "https://link5.com"
>                }
>            ],
>            "price": 32,
>            "title": "so121111121me a1sd",
>            "id": 92
>        },
>        {
>            "discount": 11,
>            "images": [
>                {
>                    "img_url": "https://link6.com"
>                },
>                {
>                    "img_url": "https://link5.com"
>                }
>            ],
>            "price": 32,
>            "title": "so121111121me a1sd",
>            "id": 91
>        },
>        {
>            "discount": 11,
>            "images": [
>                {
>                    "img_url": "https://link6.com"
>                },
>                {
>                    "img_url": "https://link5.com"
>                }
>            ],
>            "price": 32,
>            "title": "so121111121me a1sd",
>            "id": 90
>        }
>    ]
>    
> }
>```
> Example if brand doesn't exist:
> ```json
> {
>     "message": "There is not brand with that name"
> }
> ```
> # Category 
> 