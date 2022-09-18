
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
>"/products/product/:id" ==> PUT DELETE GET :white_check_mark:  
>"/products/product/:id/images" POST DELETE :white_check_mark:   
>"/products/product/:id/pairs" POST DELETE :white_check_mark:   
>"/products/product/:product_id/pairs/:pair_id" POST DELETE :white_check_mark:   
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
>> "/wishes"  ==>  GET DELETE POST :white_check_mark:     
> 
>> ### NEWSLETTER
>> "/newsletter"  ==> POST DELETE | GET  
>  
>> ### DISCOUNT
>> "/discount"  ==> POST GET  /ADMIN/   
>  "/discount/:id"  ==> PUT DELETE GET  /ADMIN/  
>  "/discount/check" ==> POST  {discount: discount, isValid: true}
>   
>> ### CATEGORIES
>> "/category"  ==> GET | POST /ADMIN/  :white_check_mark:   
>  "/category/:id"  ==> GET PUT DELETE  /ADMIN/  
> 
>> ### BRANDS
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
- [Category](#category)
  - [Create category](#create-category)
  - [Get categories information](#get-categories-information)
- [Products](#products)
  - [Create product](#create-product)
  - [Get many products](#get-many-products)
  - [Product](#product)
    - [Get product information by id](#get-product-information-by-id)
    - [Delete product](#delete-product)
    - [Edit general product information](#edit-general-product-information)
    - [Add product images](#add-product-images)
    - [Delete product images](#delete-product-images)
    - [Add pair to product](#add-pair-to-product)
    - [Delete pair from product](#delete-pari-from-product)
    - [Edit pair](#edit-pair)
- [Wish list](#wish-list)
  - [Add product in wish list](#add-product-in-wish-list)
  - [Get all wishes for current user](#get-all-wishes-for-current-user)
  - [Remove product from wish list](#remove-product-from-wish-list)
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

> # Category 
> ## Create category
> ### Request
> `[POST] /category`
> ```json
> {
>    "title": "sport"
> }
>```
> ### Response
> ```json
> {
>   "title": "sport", 
>   "id": 7, 
>   "products": []
> }
>```
> ## Get categories information
>### Request
>`[GET] "/category"`
>
>### Response
> ```json
> [
>    {
>        "title": "outdoor",
>        "id": 1
>    },
>    {
>        "title": "indoor",
>        "id": 3
>    },
>    {
>        "title": "sport",
>        "id": 7
>    }
> ]
> ```

> # Products
> ## Create product
> Before create product you must have created brand and category. To create one product you should provide main information about product like title, price and etc, information about product sizes, colors and etc, product images, and existing brands and category.   
> ### Request
>`[POST] '/products' `
> ```json
> {
>     "title": "nice Shoes",
>     "description": "random description",
>     "price": 10.0,
>     "discount": 5.0,
>     "gender": "kid",
>     "brand_name": "nike",
>     "category_title": "sport",
>     "images": [ "https://img1.com", "https://img2.com"],
>     "pairs": [
>         {"size": 40, "color": "black", "quantity": 3},
>         {"size": 39, "color": "red", "quantity": 5}
>     ]
> }
> ```
> ### Response
> ```json
> {
>     "brand": {
>         "logo_url": "https://someurl.com",
>         "name": "nike"
>     },
>     "description": "random description",
>     "images": [
>         {
>             "img_url": "https://img1.com",
>             "id": 87
>         },
>         {
>             "img_url": "https://img2.com",
>             "id": 88
>         }
>     ],
>     "pairs": [
>         {
>             "quantity": 3,
>             "size": 40,
>             "id": 26,
>             "color": "black"
>         },
>         {
>             "quantity": 5,
>             "size": 39,
>             "id": 27,
>             "color": "red"
>         }
>     ],
>     "id": 93,
>     "category": {
>         "title": "sport"
>     },
>     "is_deleted": false,
>     "gender": "GenderType.kid",
>     "title": "nice Shoes",
>     "price": 10,
>     "discount": 5
> }
> ```
> Server validations are:
> - Required admin authorization.
> - Request must have valid body as request example.
> - Colors are predefine: black, white, green, red, brown, gray, blue, pink.
> - Genders are predefine: kid, man, women.
> - Price must be bigger than discount.
> 
> ## Get many products
> You can take all existed products, but also you can filter products by gender, category, type.   
> If you want to filter products should use URL params.   
> "?brand=RandomBrand" -> That will filter products and you will get only that they have brand = RandomBrand.   
> "?category=RandomCategory" -> Same as brand filtration.   
> "?gender=kid" -> Same as brand. ** GENDER CAN BE ONLY KID, MAN, WOMAN. If you try with something else you will get error.   
> 
> Filters can be stacked. Example:   
> "?brand=nike&gender=kid" -> That will return those products that brand is nike and gender is for kids.
>  
> ### Request
> `[GET] '/products?brand=nike&gender=kid'`
> ### Response
> ```json
> [
>     {
>         "gender": "GenderType.kid",
>         "is_deleted": false,
>         "pairs": [],
>         "title": "some shoes3",
>         "images": [
>             {
>                 "id": 13,
>                 "img_url": "https://link1.com"
>             },
>             {
>                 "id": 14,
>                 "img_url": "https://link2.com"
>             }
>         ],
>         "brand": {
>             "logo_url": "https://someurl.com",
>             "name": "nike"
>         },
>         "description": "description",
>         "price": 32,
>         "category": {
>             "title": "outdoor"
>         },
>         "id": 46,
>         "discount": 11
>     },
>     {
>         "gender": "GenderType.kid",
>         "is_deleted": false,
>         "pairs": [],
>         "title": "some shoes5",
>         "images": [
>             {
>                 "id": 15,
>                 "img_url": "https://link1.com"
>             },
>             {
>                 "id": 16,
>                 "img_url": "https://link2.com"
>             }
>         ],
>         "brand": {
>             "logo_url": "https://someurl.com",
>             "name": "nike"
>         },
>         "description": "description",
>         "price": 32,
>         "category": {
>             "title": "outdoor"
>         },
>         "id": 54,
>         "discount": 11
>     }
> ]
> ```
> Example errors when gender is invalid:
> ```json
> {
>     "message": "There is not gender with that name"
> }
> ```
> 
> # Product
> ## Get product information by id
> ### Request
> `[GET] '/products/product/:id'`
> ### Response
> ```json
> {
>     "gender": "GenderType.man",
>     "is_deleted": false,
>     "pairs": [
>         {
>             "size": 40,
>             "id": 25,
>             "quantity": 13,
>             "color": "PairColor.green"
>         }
>     ],
>     "title": "newtitle",
>     "images": [
>         {
>             "id": 39,
>             "img_url": "https://link6.com"
>         },
>         {
>             "id": 40,
>             "img_url": "https://link5.com"
>         }
>     ],
>     "brand": {
>         "logo_url": "https://somesdurl.com",
>         "name": "some"
>     },
>     "description": "newdescription",
>     "price": 10.1,
>     "category": {
>         "title": "outdoor"
>     },
>     "id": 70,
>     "discount": 5
> }
> ```
> Example errors when product doesn't exist.
> ```json
> {
>     "message": "This product does not exist."
> }
> ```
> 
> ## Delete product
> Products have bool field "is_deleted". If you want to delete product, server set this field on True and this products will be invisible for users.   
> ### Request
> `[DELETE] '/products/product/:id'`
> ### Response
> ```json
> {
>   "message": "Product is deleted"
> }
>```
> Server validation are:
> - Require admin permissions   
> 
> Example error message:
> ```json
> {
>    "message": "This product does not exist."
> }
>```
> 
> ## Edit general product information
> To edit the whole product you should access different endpoint. At this endpoint you can edit general information about product like title, description, gender, price, discount, category and brand.   
> To edit product you should take first current product personal information then you need to change what you want to be changed and send the whole information again.   
> ### Request
> `[PUT] '/products/product/:id'`
> ```json
> {
>    "title": "newtitle",
>    "description": "newdescription",
>    "price": 10.1,
>    "discount": 5.0,
>    "gender": "man",
>    "brand_name": "some",
>    "category_title": "outdoor"
> }
>```
> ### Response
> ```json
> {
>     "gender": "man",
>     "title": "newtitle",
>     "description": "newdescription",
>     "discount": 5,
>     "category": {
>         "title": "outdoor"
>     },
>     "images": [
>         {
>             "img_url": "https://link6.com",
>             "id": 39
>         },
>         {
>             "img_url": "https://link5.com",
>             "id": 40
>         }
>     ],
>     "brand": {
>         "logo_url": "https://somesdurl.com",
>         "name": "some"
>     },
>     "is_deleted": false,
>     "id": 70,
>     "price": 10.1,
>     "pairs": [
>         {
>             "size": 40,
>             "quantity": 13,
>             "id": 25,
>             "color": "PairColor.green"
>         }
>     ]
> }
> ```
> Server validation are:
> - Admin permissions required
> - All fields must be in request
>
> ## Add product images
> You are able to add more images to existed product.
> ### Request
> `[POST] '/products/product/:id/images'`
> ```json
> {
>   "img_url": "https://img.com"
> }
> ```
> ### Response
> ```json
> {
>    "product_id": 70,
>    "id": 89,
>    "img_url": "https://sdk.com"
> }
> ```
> Server validation are:
> - Admin permissions required
> - ** You can add same pictures
> 
> ## Delete product images
> You have to send in request body image id and that id must be attached to product that id is in url params.   
> Example: if you access "/products/product/1/images" and send in body "'id':4", that mean image with id 4 must be attached to product with id 1.   
> 
> ### Request
> `[DELETE] '/products/porduct/:id/images'`
> ```json
> {
>   "id": 4
> }
> ```
> ### Response
> ```json
> "You delete image with id: 89 successfully"
> ```
> Server validation are:
> - Admin permissions require
> - Product id in url should be valid product id
> - Image id in body should be valid image id
> - Image should be attached to the product
> 
> Example error massages:
> - if image doesn't exist
> ```json
> { 
>     "message": "There is not images with id: 891"
> }
> ```
> - if product doesn't exist
> ```json
> {
>    "message": "There is not product with id: 702"
> }
> ```
> - if image is not attached to the product
> ```json
> {
>     "message": "images with id: 88 is not attached to product with id: 70"
> }
> ```
> 
> ## Add pair to product
>  You can add pairs when you create product. After product is created you can add additional pairs.   
>  Data provided in body will create pair and that pair will be attached to product with id from url params.   
> 
> ### Request
> `[POST] '/products/product/:id/pairs'`
> ```json
> {
>    "size": 40,
>    "color": "black",
>    "quantity": 10
> }
> ```
> ### Response
> ```json
> {
>    "size": 40,
>    "product_id": 70,
>    "quantity": 10,
>    "color": "black",
>    "id": 28
> }
>```
> Server validation are:
> - Admin permissions required
> - Pair is unique for product /Can't be added pair with same size and color twice/   
> - All fields must persist in request body
> - Colors must be 
> Example error messages:
> ```json
> {
>    "message": "Pair with color: black and 40 already attached to product with id: 70"
> }
> ```
> 
> ## Delete pair from product
> To delete pair from product you should provide product id as url params and pair id as body.   
> ### Request
> `[DELETE] '/products/product/:id/pairs'`
> ```json
> {
>   "id": 28
> }
>```
> ### Response
> ```json
>   "You delete image with id: 28 successfully"
>```
> Server validation are:
> - Admin permission required
> - Product id must be valid id
> - Pair id must be valid id
> - Pair with provided id must be attached to product with provided id
> 
> Example error messages:
> ```json
> {
>    "message": "pair with id: 23 is not attached to product with id: 70"
> }
>```
> ## Edit pair
> To edit pair you should provide product id and pair id as url params. Also, you should provide updated information about pairs.   
> ### Request
> `[PUT] '/products/product/:product_id/pairs/:pair_id'`
> ```json
> {
>    "size": 40,
>    "color": "green",
>    "quantity": 13
> }
> ```
> ### Response
> ```json
> {
>    "size": 40,
>    "product_id": 70,
>    "quantity": 13,
>    "color": "green",
>    "id": 25
> }
> ```
> Server validation are:
> - Admin permission required
> - Product id must be correct
> - Pair id must be correct
> - Pair should be attached to the product   
>
> Example error messages:
> - if pair is not attached to the product
> ```json
> {
>    "message": "pair with id: 25 is not attached to product with id: 73"
> }
> ```
> - if pair doesn't exist
> ```json
> {
>     "message": "There is not pair with id: 252"
> }
> ```
> - if product doesn't exist
> ```json
> {
>     "message": "There is not product with id: 732"
> }
> ```

> # Wish list
> ## Add product in wish list
> ### Request
> `[POST] '/wishes'`   
> 
> In request body pass Product id:
> ```json
> {
>     "id": 20 
> }
>```
> 
> ### Response
> If you success add product to your wish list you will get back product id else will get error message.
> ```json
> { 
>   "id": 20
> }
>```
> Server require:
>  - Valid Access token via x-access-token header.(Token is used to provide current user where need to be attached product)
>  - Valid product id field in body.   
> 
> Example errors:
> - if you don't send valid token/ missing token
> ```json
> {
>   "message": "The token is not valid/missing token"
> }
> ```
> - if you try to add same product twice:
> ```json
> {
>   "message": "The item already exist"
> }
>```
> - **also you will get error message if product or doesn't exist
>
> ## Get all wishes for current user
> Need only to access right endpoint. No needed body or url params. User comes from the token.
> ### Request
> `[GET] /wishes`   
> Response will contains list of products objects
> ### Response
> ```json
> [
>    {
>        "gender": "GenderType.kid",
>        "brand": {
>            "name": "nike",
>            "logo_url": "https://someurl.com"
>        },
>        "images": [
>            {
>                "img_url": "https://link1.com",
>                "id": 13
>            },
>            {
>                "img_url": "https://link2.com",
>                "id": 14
>            }
>        ],
>        "category": {
>            "title": "outdoor"
>        },
>        "id": 46,
>        "is_deleted": false,
>        "title": "some shoes3",
>        "discount": 11,
>        "pairs": [],
>        "description": "description",
>        "price": 32
>    }
> ]
>```
> 
> ## Remove product from wish list
> ### Request
> `[DELETE] '/wishes'`
> ```json
> {
>   "id": 20
> } 
>```
> ### Response
> **Status code 202 ACCEPTED
>  ```json
> {
>   "id": 20
> } 
> ```