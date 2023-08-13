import { useEffect, useState } from 'react'
import './itemListConteiner.scss'
import { pedirDatos } from '../../Helpers/pedirDatos'
import { ItemList } from '../ItemList/ItemList'
import { useProductos } from '../Hooks/useProductos'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { collection, getDocs, query, where} from 'firebase/firestore'
import {db} from '../../firebase/config'


const ItemListConteiner = () => {

    // const { productos } = useProductos () este solito anda

    
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState (true)
    console.log (productos)
    const { categoryId } = useParams ()

    useEffect(() => {///useEffect hace que solo se llame a esta funcion una vez, cuando se renderiza por primera vez, asi no cae en un bucle infinito
        setLoading (true)


        //// EJEMPLO DEL TUTOR
        // const productsRef = categoryId 
        //     ?query (collection(db, 'products'), where('category', '==', categoryId))
        //     :query (collection(db, 'products'))
        
        // armamos la referencia 
        // const productosRef = collection (db, "productos")
        // const q = query ( productosRef, where('category', '==', categoryId) )
        //llamamos a la referencia

        /////ACA TENGO EL DESPELOTE /////
        const productosRef = collection (db, "productos")
        const q = categoryId
                    ? query(productosRef, where ('category', "===", categoryId))
                    : productosRef

        
        getDocs (q)
            .then((resp)=>{
                const docs = resp.docs.map ((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setProductos (docs)
            })
            .catch (e => console.log (e))
            .finally(()=> setLoading (false))


        /// aca abado dejo el codigo anterior ///
        // pedirDatos()
        //     .then((res) => {
        //         if (categoryId){
        //           setProductos(res.filter (prod => prod.category === categoryId))  
        //         } else {
        //             setProductos(res)
        //         }
                
        //     })
        //     .catch(error => console.log(error))
        //     .finally (() => { setLoading (false)})
    }, [categoryId])


    return (
        <div>
            {
                loading
                ? <Loader />
                :<ItemList productos={productos}/>
            }
            
        </div>
    )

}

export default ItemListConteiner