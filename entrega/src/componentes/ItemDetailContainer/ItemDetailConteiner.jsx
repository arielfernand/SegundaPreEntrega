import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { pedirDatos } from "../../Helpers/pedirDatos"
import ItemDetail from "../ItemDetail/ItemDetail"
import Loader from "../Loader/Loader"
import { doc, getDoc } from "firebase/firestore"
import {db} from '../../firebase/config'


const ItemDetailConteiner = () => {
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const { itemId } = useParams()
    // console.log(itemId)

    useEffect(() => {
        setLoading(true)

        //armar referencia
        const itemRef = doc (db, "productos", itemId)

        ///llamar ref
        getDoc (itemRef)
            .then ((doc)=>{
                setItem({
                    id:doc.id,
                    ...doc.data()
                })
            })
            .catch (e=> console.log (e))
            .finally (()=> setLoading(false))

        /// aca queda el codigo viejo
        // pedirDatos()
        //     .then(r => {
        //         setItem(r.find(prod => prod.id === Number(itemId)))
        //     })
        //     .finally(() => setLoading(false))

    }, [])

    return (
        <div className="container my-5">
            {
                loading
                    ? <Loader/>
                    : <ItemDetail item={item} />
            }

        </div>
    )

}

export default ItemDetailConteiner
