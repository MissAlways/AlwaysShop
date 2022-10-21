```
     ,----------------------.                                                                    
     |Customer              |                                            ,----------------------.
     |----------------------|                          ,-------------.   |Admin                 |
     |id : int              |                          |Warehouse    |   |----------------------|
     |username : string     |                          |-------------|   |id : int              |
     |firstname : string    |                          |id : int     |   |username : string     |
     |lastname : string     |                          |name : string|   |password_hash : string|
     |password_hash : string|                          `-------------'   |access_level : int    |
     `----------------------'                                 |          `----------------------'
                 |                                            |                                  
                 |                                            |                                  
,--------------------------------.                            |                                  
|Order                           |                            |                                  
|--------------------------------|                            |                                  
|id : int                        |                  ,------------------.                         
|status : int                    |                  |WarehouseProduct  |                         
|address : string                |                  |------------------|                         
|postcode : int                  |                  |id : int          |                         
|city : string                   |                  |product_id : int  |                         
|phone : string                  |                  |warehouse_id : int|                         
|order_date : date               |                  |quantity : int    |                         
|payment_confirmation_date : date|                  `------------------'                         
|package_sent_date : date        |                            |                                  
|package_delivered_date : date   |                            |                                  
`--------------------------------'                            |                                  
                 |                                            |                                  
                 |                                ,-----------------------.                      
                 |                                |Product                |                      
                 |                                |-----------------------|                      
       ,-----------------.                        |id : int               |                      
       |OrderedProduct   |   ,----------------.   |status : int           |                      
       |-----------------|   |Allergy         |   |name :  string         |                      
       |id : int         |   |----------------|   |description : string   |                      
       |order_id : int   |   |id : int        |   |ingredients : string   |                      
       |name : string    |   |product_id : int|   |manufacturer : string  |                      
       |quantity : int   |   |name : string   |   |price : double         |                      
       |price : double   |   `----------------'   |weight : double        |                      
       |discount : double|           |            |unit : int             |                      
       `-----------------'           |       _____|original_price : double|_________             
                                     |       |    |discount : double      |        |              
                                     |       |    `-----------------------'        |              
                                     |       |               |                     |               
                                     |       |               |                     |              
                              ,----------------.    ,----------------.   ,-----------------.     
                              |ProductAllergy  |    |ProductImage    |   |ProductCategory  |     
                              |----------------|    |----------------|   |-----------------|     
                              |id : int        |    |id : int        |   |id : int         |     
                              |allergy_id : int|    |product_id : int|   |product_id : int |     
                              |product_id : int|    |url : string    |   |category_id : int|     
                              `----------------'    `----------------'   `-----------------'     
                                                                                   |             
                                                                           ,-------------.       
                                                                           |Category     |       
                                                                           |-------------|       
                                                                           |id : int     |       
                                                                           |name : string|       
                                                                           `-------------'       

```
