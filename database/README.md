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
   ,----------------.                                    |                                  
   |Order           |                          ,------------------.                         
   |----------------|                          |WarehouseProduct  |                         
   |id : int        |                          |------------------|                         
   |status : int    |                          |id : int          |                         
   |address : string|                          |product_id : int  |                         
   |postcode : int  |                          |warehouse_id : int|                         
   |city : string   |                          |quantity : int    |                         
   |phone : string  |                          `------------------'                         
   `----------------'                                    |                                  
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
  |discount : double|             |          |unit : int             |                      
  `-----------------'             |       ___|original_price : double|______                      
                                  |       |  |discount : double      |     |                
                                  |       |  `-----------------------'     |                
                                  |       |             |                  |                 
                                  |       |             |                  |                 
                         ,----------------.     ,----------------.   ,-----------------.     
                         |ProductAllergy  |     |ProductImage    |   |ProductCategory  |     
                         |----------------|     |----------------|   |-----------------|     
                         |id : int        |     |id : int        |   |id : int         |     
                         |allergy_id : int|     |product_id : int|   |product_id : int |     
                         |product_id : int|     |url : string    |   |category_id : int|     
                         `----------------'     `----------------'   `-----------------'     
                                                                              |             
                                                                      ,-------------.       
                                                                      |Category     |       
                                                                      |-------------|       
                                                                      |id : int     |       
                                                                      |name : string|       
                                                                      `-------------'       

```
