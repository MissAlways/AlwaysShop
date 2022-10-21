```
,----------------------.                                               
|Customer              |                       ,----------------------.
|----------------------|     ,-------------.   |Admin                 |
|id : int              |     |Warehouse    |   |----------------------|
|username : string     |     |-------------|   |id : int              |
|firstname : string    |     |id : int     |   |username : string     |
|lastname : string     |     |name : string|   |password_hash : string|
|password_hash : string|     `-------------'   |access_level : int    |
`----------------------'            |          `----------------------'
            |                       |                                  
            |                       |                                  
   ,----------------.               |                                  
   |Order           |     ,------------------.                         
   |----------------|     |WarehouseProduct  |                         
   |id : int        |     |------------------|                         
   |status : int    |     |id : int          |                         
   |address : string|     |product_id : int  |                         
   |postcode : int  |     |warehouse_id : int|                         
   |city : string   |     |quantity : int    |                         
   |phone : string  |     `------------------'                         
   `----------------'               |                                  
            |                       |                                  
            |           ,-----------------------.                      
  ,-----------------.   |Product                |                      
  |OrderedProduct   |   |-----------------------|                      
  |-----------------|   |id : int               |                      
  |id : int         |   |status : int           |                      
  |order_id : int   |   |name :  string         |                      
  |name : string    |   |description : string   |                      
  |quantity : int   |   |price : double         |                      
  |price : double   |   |original_price : double|                      
  |discount : double|   |discount : double      |                      
  `-----------------'   `-----------------------'                      
                                                                       
                                                                       
                 ,----------------.  ,-----------------.               
                 |ProductImage    |  |ProductCategory  |               
                 |----------------|  |-----------------|               
                 |id : int        |  |id : int         |               
                 |product_id : int|  |product_id : int |               
                 |url : string    |  |category_id : int|               
                 `----------------'  `-----------------'               
                                               |                       
                                       ,-------------.                 
                                       |Category     |                 
                                       |-------------|                 
                                       |id : int     |                 
                                       |name : string|                 
                                       `-------------'                 
```