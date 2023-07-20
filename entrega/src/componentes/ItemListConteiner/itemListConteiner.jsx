import { useEffect, useState } from 'react'
import './itemListConteiner.scss'
import { pedirDatos } from '../../Helpers/pedirDatos'
import { ItemList } from '../ItemList/ItemList'
import { useProductos } from '../Hooks/useProductos'
import { useParams } from 'react-router-dom'


const ItemListConteiner = () => {

    // const { productos } = useProductos () este solito anda

    
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState (true)

    const { categoryId } = useParams ()

    useEffect(() => {///useEffect hace que solo se llame a esta funcion una vez, cuando se renderiza por primera vez, asi no cae en un bucle infinito
        setLoading (true)
        
        pedirDatos()
            .then((res) => {
                if (categoryId){
                  setProductos(res.filter (prod => prod.category === categoryId))  
                } else {
                    setProductos(res)
                }
                
            })
            .catch(error => console.log(error))
            .finally (() => { setLoading (false)})
    }, [categoryId])


    return (
        <div>
            <ItemList productos={productos}/>
        </div>
    )

}

export default ItemListConteiner