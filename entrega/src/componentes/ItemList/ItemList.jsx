import { ItemCard } from "../ItemCard/ItemCard"


export const ItemList = ({productos})=>{

    return (
        <div className="container">
            <h2>Nuestra tienda on line</h2>
            <hr />

            
            <div className='row'>
                {
                    productos.map((prod) => <ItemCard key= {prod.id} item = {prod}/>)
                }
            </div>
        

        </div>
    )




}