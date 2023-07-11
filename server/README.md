
># ENDPOINTS  
>
>> ### USERS
>>"/login"   ==> POST   :white_check_mark:   
>"/register"  ==> POST  :white_check_mark:   
>"/user/:id" ==> PUT GET    :white_check_mark:   DELETE :heavy_multiplication_x:   
>"/user/:id/orders" ==> GET  :white_check_mark:     
> "/user/:id/comments" ==> GET   :white_check_mark:   
> 
>> ### PRODUCTS   
>>"/products" ==> POST GET  :white_check_mark:      
>"/products/product/:id" ==> PUT DELETE GET :white_check_mark:  
>"/products/product/:id/images" POST DELETE PUT :white_check_mark:    
>"/products/product/:id/pairs" POST DELETE :white_check_mark:   
>"/products/product/:product_id/pairs/:pair_id" POST DELETE :white_check_mark:   
> 
>>  ### COMMENTS
>>"/comments ==> POST   :white_check_mark:      
>"/comments/:product_id"  ==> GET DELETE PUT  :white_check_mark:      
> 
>> ### ORDERS
>>"/orders"  ==> GET /ADMIN/, POST  :white_check_mark:   
> "/orders/:id" ==> PUT /ADMIN/   :white_check_mark:   
> 
>> ### WISHES
>> "/wishes"  ==>  GET DELETE POST :white_check_mark:     
> 
>> ### NEWSLETTER
>> "/newsletter"  ==> POST DELETE :white_check_mark:    
>  
>> ### DISCOUNT
>> "/discounts"  ==> POST GET  /ADMIN/  :white_check_mark:   
>  "/discounts/:id" ==> DELETE /ADMIN/   :white_check_mark:     
>  "/discount/validate" ==> POST  :white_check_mark:    
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
    - [Get user comments](#get-user-comments)
    - [Get user orders](#get-user-orders)
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
    - [Edit product images](#edit-product-images)
    - [Add pair to product](#add-pair-to-product)
    - [Delete pair from product](#delete-pair-from-product)
    - [Edit pair](#edit-pair)
- [Comments](#comments)
  - [Create comment](#create-comment)
  - [Get comment by id](#get-comment-by-id)
  - [Edit comment](#edit-comment)
  - [Delete comment](#delete-comment)
- [Orders](#orders)
  - [Create order](#create-order)
  - [Get all orders](#get-all-orders)
  - [Change order status](#change-order-status)
- [Wish list](#wish-list)
  - [Add product in wish list](#add-product-in-wish-list)
  - [Get all wishes for current user](#get-all-wishes-for-current-user)
  - [Remove product from wish list](#remove-product-from-wish-list)
- [Discounts](#discounts)
  - [Create discount](#create-discount)
  - [Get all discounts](#get-all-discounts)
  - [Delete discount](#delete-discount)
  - [Check discount is valid](#check-discount-is-valid)
- [Newsletter](#newsletter)
  - [Subscribe](#subscribe)
  - [Unsubscribe](#unsubscribe)
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
> - All fields must be sent(email and password)
> - Email must be valid email string
> 
> Example error massages
> If email is valid email string:
> ```json
> {
>    "message": "Wrong email or password!"
> }
>```
>If the email is not a valid email string or is missing some key (email or password),the error will be:
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
>  "{\"user_data\": {\"l_name\": \"gosho\", \"created_on\": \"2023-04-18 20:01:17.238328\", \"phone\": 92332112, \"f_name\": \"pesho\", \"wishes\": []}, \"email\": \"test123@abv.bg\", \"id\": 4}"
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
>Example error messages If there is not "x-access-token":
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
> 
> ## Get user comments
> ### Request
> `[GET] '/user/:id/comments'`
> ### Response
> ```json
> [
>     {
>         "user_id": 1,
>         "id": 1,
>         "product_id": 70,
>         "product": {
>             "title": "newtitle",
>             "price": 10.1
>         },
>         "comment": "abv",
>         "rate": 3
>     },
>     {
>         "user_id": 1,
>         "id": 2,
>         "product_id": 71,
>         "product": {
>             "title": "product",
>             "price": 5
>         },
>         "comment": "111",
>         "rate": 5
>     }
> ]
> ```
> 
> ## Get user orders
> ### Request
> `[GET] '/user/:id/orders'`
> ### Response
> ```json
> [
>     {
>         "order_items": [
>             {
>                 "pair_size": 40,
>                 "pair_color": "black",
>                 "product_id": 64,
>                 "id": 8,
>                 "price": 21,
>                 "title": "some 141"
>             },
>             {
>                 "pair_size": 43,
>                 "pair_color": "blue",
>                 "product_id": 64,
>                 "id": 9,
>                 "price": 21,
>                 "title": "some 141"
>             }
>         ],
>         "is_shipped": "pending",
>         "user_id": 1,
>         "total_price": 42,
>         "created_on": "2022-09-22T23:24:51.506802",
>         "shipped_on": null,
>         "id": 16,
>         "comment": "123"
>     },
>     {
>         "order_items": [
>             {
>                 "pair_size": 40,
>                 "pair_color": "black",
>                 "product_id": 64,
>                 "id": 10,
>                 "price": 21,
>                 "title": "some 141"
>             },
>             {
>                 "pair_size": 43,
>                 "pair_color": "blue",
>                 "product_id": 64,
>                 "id": 11,
>                 "price": 21,
>                 "title": "some 141"
>             }
>         ],
>         "is_shipped": "pending",
>         "user_id": 1,
>         "total_price": 42,
>         "created_on": "2022-09-22T23:27:14.190322",
>         "shipped_on": null,
>         "id": 17,
>         "comment": "123"
>     }
> ]
> ```
> Server validations are:
> - Requires valid token
> - token must be at the same user as url id


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
> Before createing product you must have created brand and category. To create one product you should provide the main information about product such as title, price and etc, information about product sizes, colors and etc, product images, and existing brand and category.    
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
>     "gender": "kid",
>     "title": "nice Shoes",
>     "price": 10,
>     "discount": 5
> }
> ```
> Server validations are:
> - Requires admin authorization.
> - Request must have valid body as request example.
> - Colors are predefine: black, white, green, red, brown, gray, blue, pink.
> - Genders are predefine: kid, man, women.
> - Price must be higher than the discount.
> 
> ## Get many products
> You can take all existed products, but also you can filter products by gender, category, type.   
> If you want to filter products should use URL params.   
>   
> "?brand=RandomBrand" -> This will filter the products with the selected brand = RandomBrand.   
> "?category=RandomCategory" -> Same as brand filtration.   
> "?gender=kid" -> Same as brand. ** GENDER CAN BE ONLY KID, MAN, WOMAN. If you try something else you will get error.   
> 
> Filters can be stacked. Example:   
> "?brand=nike&gender=kid" -> This will return those products which brand is nike and gender is for kids.
>  
> ### Request
> `[GET] '/products?brand=nike&gender=kid'`
> ### Response
> ```json
> [
>     {
>         "gender": "kid",
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
>         "gender": "kid",
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
>     "gender": "man",
>     "is_deleted": false,
>     "pairs": [
>         {
>             "size": 40,
>             "id": 25,
>             "quantity": 13,
>             "color": "green"
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
>         "name": "some",
>         "description": "some brand description"
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
> To edit product first you should take the personal infromation of current product, then you make the change and send the whole information again.   
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
>             "color": "green"
>         }
>     ]
> }
> ```
> Server validation are:
> - Admin permissions required
> - All fields must be in request
>
> ## Add product images
> You are able to add more images to existing product.
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
> You have to send image id in request body and that id must be attached to product, which id is in url params.   
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
> ## Edit-product-images 
> You have to send object with keys ids and urls. The values should be list of int and strings. Ids are id of images that will be deleted and urls will be new images that should be added.   
> Example: if you access "/products/product/1/images" and send in body {ids: [1], urls: [https://someImageUrl.com]}, image with id 1 will be deleted from product with id 1 and the new image with current ulr will be added to product 1.
> 
> ### Request
> `[PUT] '/products/porduct/:id/images'`
> ```json
> {
>   "ids": [1],
>   "urls": ["https://someImageUrl.com"]
> }
> ```
> ### Response
> ```json
> "You successful edit product images"
> ```
> Server validation are:
> - Admin permissions require
> - Product id in url should be valid product id
> - Image ids in body should be valid image ids
> - Images should be attached to the product
>
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
> - Colors must be from the predifined colors
>
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

> # Comments
> ## Create comment
> ### Request
> `[POST] '/comments'`
> ```json
> {
>    "product_id": 79,
>    "comment": "Random comment",
>    "rate": 3
> }
> ```
> 
> ### Response
> ```json
> {
>     "product_id": 79,
>     "user": {
>         "f_name": "Gosho",
>         "l_name": "Goshev"
>     },
>     "user_id": 1,
>     "id": 12,
>     "rate": 3,
>     "comment": "Random comment"
> }
> ```
> Server validations are:
> - Token required in header
> - Valid product id
> - Rate must be 0, 1, 2 ,3 ,4, 5 or missing in request.
> - *Comment is not required
> - **Rate is not required
>
> ## Get comment by id
> ### Request
> `[GET] '/comments/:id'`
> ### Response
> ```json
> {
>     "product_id": 59,
>     "user": {
>         "f_name": "Gosho",
>         "l_name": "Goshev"
>     },
>     "user_id": 1,
>     "id": 12,
>     "rate": 2,
>     "comment": "32244"
> }
> ```
> 
> ## Edit comment
> ### Request
> `[PUT] '/comments/:id'`
> ```json
> {
>    "comment": "comment",
>    "rate": 5
> }
> ```
> ### Response
> ```json
> {
>     "product_id": 79,
>     "user": {
>         "f_name": "Gosho",
>         "l_name": "Goshev"
>     },
>     "user_id": 1,
>     "id": 12,
>     "rate": 5,
>     "comment": "comment"
> }
> ```
> Server validations are:
> - Require valid token
> - Comment must be created from user with current token
> - Request body can contain comment filed and/or rate field
> - Rate must be one of 0, 1, 2, 3, 4 or 5
> 
> ## Delete comment
> ### Request
> `[DELETE] '/comments/:id'`
> ### Response 
> ```json
> {
>   "message": "You delete the comment successfully!"
> }
> ```
> Server validations are:
> - Required valid token
> - Comment must be created from user with current token
> 

> # Orders
> ## Create order
> ### Request
> `[POST] '/orders'`
> ```json
> {
>    "order_items": [
>                     {"product_id": 64, "pair_id": 29},
>                      {"product_id": 64, "pair_id": 30}
>                   ],
>    "comment": "123",
>    "discount_code": "somecode",
>    "address": [
>                 {"first_name": "Atanas",
>                   "last_name": "Angeliev",
>                   "address_1": "1234",
>                   "post_code": 1234,
>                   "city": "Sofia",
>                   "country": "Bulgaria",
>                   "email": "abvs@abv.bg",
>                   "phone": 12345566789
>                   }
>               ]
> 
> }
> ```
> ### Response
> ```json
>   {
>     "order_items": [
>         {
>             "pair_color": "black",
>             "pair_size": 40,
>             "price": 21,
>             "title": "some 141",
>             "id": 12,
>             "product_id": 64
>         },
>         {
>             "pair_color": "blue",
>             "pair_size": 43,
>             "price": 21,
>             "title": "some 141",
>             "id": 13,
>             "product_id": 64
>         }
>     ],
>     "user_id": 1,
>     "comment": "123",
>     "created_on": "2022-09-24T12:34:02.014696",
>     "id": 18,
>     "is_shipped": "pending",
>     "shipped_on": null,
>     "total_price": 42,
>     "final_price": 42,
>     "address": [
>                   {"first_name": "Atanas",
>                   "last_name": "Angeliev",
>                   "address_1": "1234",
>                   "post_code": 1234,
>                   "city": "Sofia",
>                   "country": "Bulgaria",
>                   "email": "abvs@abv.bg",
>                   "phone": 12345566789
>                   }    
>                ]              
> }
> ```
> Server validation are:
> - Required token in header
> - Comment can be empty string
> - Product and pair must be attached
> - "order_items" must have at least one item
> - "discount_code" can be empty string
>
> ## Get all orders
> ### Request
> `[GET] '/orders'`
> ### Response
> ```json
> [
>   {
>     "order_items": [
>       {
>         "pair_color": "black",
>         "pair_size": 40,
>         "price": 21,
>         "title": "some 141",
>         "id": 8,
>         "product_id": 64
>       },
>       {
>         "pair_color": "blue",
>         "pair_size": 43,
>         "price": 21,
>         "title": "some 141",
>         "id": 9,
>         "product_id": 64
>       }
>     ],
>     "user_id": 1,
>     "comment": "123",
>     "created_on": "2022-09-22T23:24:51.506802",
>     "id": 16,
>     "is_shipped": "pending",
>     "shipped_on": null,
>     "total_price": 42
>   }
> ]
> ```
> Server validations are:
> - Requires admin permissions
>
> ## Change order status
> ### Request
> `[POST] '/orders/:id'`
> ```json
> {
>   "status": "shipped"
> }
> ```
> ### Response
> ```json
>   {
>     "order_items": [
>       {
>         "pair_color": "black",
>         "pair_size": 40,
>         "price": 21,
>         "title": "some 141",
>         "id": 8,
>         "product_id": 64
>       },
>       {
>         "pair_color": "blue",
>         "pair_size": 43,
>         "price": 21,
>         "title": "some 141",
>         "id": 9,
>         "product_id": 64
>       }
>     ],
>     "user_id": 1,
>     "comment": "123",
>     "created_on": "2022-09-22T23:24:51.506802",
>     "id": 16,
>     "is_shipped": "shipped",
>     "shipped_on": "2022-09-24T23:24:51.506802",
>     "total_price": 42
>   }
> ```
> Server validations are:
> - Requires admin permissions
> - status must be pending, shipped or rejected





> # Wish list
> ## Add product in wish list
> ### Request
> `[POST] '/wishes'`   
> 
> In request body put Product id:
> ```json
> {
>     "id": 20 
> }
>```
> 
> ### Response
> If you successfully add product to your wish list, you will get back product id else will get error message.
> ```json
> { 
>   "id": 20
> }
>```
> Server validations are:
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
> - **also you will get error message if product doesn't exist
>
> ## Get all wishes for current user
> Need only to access right endpoint. No needed body or url params. User comes from the token.
> ### Request
> `[GET] /wishes`   
> Response will contain list of objects (products)
> ### Response
> ```json
> [
>    {
>        "gender": "kid",
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
> 

> # Discounts
> ## Create discount
> ### Request
> `[POST] '/discounts'`
> ```json
> {
>    "code": "123asd",
>    "discount": 10,
>    "started_on": "2022-09-04T21:00:00.000Z",
>    "ended_on": "2022-09-04T21:00:00.000Z"
> }
> ```
> ### Response
> ```json
> {
>    "code": "123asd",
>    "id": 2,
>    "discount": 10,
>    "ended_on": "2022-09-04T21:00:00",
>    "started_on": "2022-09-04T21:00:00"
> }
> ```
> Server validations are:
> - Admin permissions required
> - code must be at least 5 char
> - discount is in % between 0 and 100
>
> Here you can see how you can do DateTime input. ![LINK](https://github.com/a-angeliev/React-Riddles-client/blob/main/src/components/AdminPanel/AdminDiscounts/AdminAddDiscount/AdminAddDiscount.js)
>
> ## Get all discounts
> ### Request
> `[GET] '/discounts'`
> ### Response
> ```json
> [
>    {
>        "started_on": "2022-09-04T21:00:00",
>        "ended_on": "2022-09-04T21:00:00",
>        "id": 2,
>        "discount": 10,
>        "code": "123asd"
>    }
> ]
> ```
> Server validations are:
> - Admin permissions required
> 
> ## Delete discount
> ### Request
> `[DELETE] '/discounts/:id'`
> ### Response
> ```json
> {
>    "massage": "You successfully delete the discount"
> }
> ```
> Server validations are:
> - Admin permissions required
>
> ## Check discount is valid
> ### Request
> `[POST] '/discounts/validate'`
> ```json
> {
>    "code": "somecode"
> }
> ```
> ### Response
> ```json
> {
>   "is_valid": true,
>   "discount": 10
> }
> ```
> Example error massage:
> ```json
> {
>   "is_valid": false
> }
> ```
> 

> # Newsletter
> ## Subscribe
> ### Request
> `[POST] '/newsletter'`
> ```json
> {
>   "email": "someemail@gmail.com",
>   "name": "gosho"
> }
> ```
> ### Response
> ```json
> {"message": "You successfully subscribe for our newsletter."}
> ```
> ## Unsubscribe
> ### Request
> `[DELETE] '/newsletter'`
> ```json
> {"email": "someemail@gmail.com"}
> ```