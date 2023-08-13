import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { collection, addDoc, getDoc, getDocs, doc, query, updateDoc, writeBatch, where, documentId } from "firebase/firestore"
import { db } from "../../firebase/config"
import { Link } from "react-router-dom";



const Check = () => {
    const { cart, totalCompra, vaciarCarrito } = useContext (CartContext)
    const [loading, setLoading]  = useState (false)
    const [orderId, setOrderId] = useState (null)

    const [values, setValues] = useState({
        nombre: '',
        direccion: '',
        email: '',
    })

    
    const handleInputChange = (e) => {
        console.log(e.target)

        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        

        const orden = {
            cliente: values,
            items: cart.map (item=>({id:item.id, precio:item.precio, cantidad:item.cantidad, nombre: item.nombre})),
            total: totalCompra(),
            fyh: new Date(),
        }
        console.log (orden)
        console.log (cart.map(item => item.id))

        /// enviar a firebase

        const batch = writeBatch (db)
        const productosRef = collection (db, "productos")
        const q = query(productosRef, where (documentId (), "in", cart.map(item => item.id)))
        const orderRef = collection (db, "orders")
        const productos = await getDocs (q)
        const outOfStock = []

        productos.docs.forEach((doc)=> {
            const item = cart.find (prod=> prod.id === doc.id)
            const stock = doc.data ().stock
            
            if ( stock >= item.cantidad ) {
                    batch.update(doc.ref, {
                        stock: stock - item.cantidad
                    })
            } else {
                outOfStock.push (item)
            }
        })

        if (outOfStock.length === 0){
            await batch.commit()
            const doc = await addDoc  (orderRef, orden)

            vaciarCarrito ()
            setOrderId (doc.id)
            
        } else {
            alert ('Hay items sin stock')
            console.log (outOfStock)
        }


        // orden.items.forEach(item =>{

        //     const docRef = doc(db, "productos", item.id)
        //     getDoc(docRef)
        //         .then((doc)=>{
        //             const stock = doc.data ().stock
        //             if(stock >= item.cantidad){
        //               updateDoc(docRef, {
        //                 stock: stock - item.cantidad
        //             })  
        //             }else {
        //                 alert ("No hay stock de " + item.nombre)
        //             }

                    
        //         })
        // })

        // const orderRef = collection (db, "orders")
        // addDoc(orderRef, orden)
        //     .then((doc) =>{
        //         console.log(doc.id)
        //         vaciarCarrito()
        //         setOrderId(doc.id)
        //     })
        setLoading(false)
    }

    if (orderId){
        return(
            <div className="container my-5">
                <h2 className="text-4xl">Tu compra se registro exitosamente</h2>
                <p>Tu orden es la Numero: <strong>{orderId}</strong></p>
                <Link to="/">Volver</Link>
            </div>
        )
    }

    if(cart.length === 0){
        return <Navigate to="/"/>
    }

    return (
        <div className="container my-5">
            <h2>Checkout</h2>
            <hr />

            <form onSubmit={handleSubmit}>
                <input

                    // value={values.nombre}
                    onChange={handleInputChange}
                    value={values.nombre}
                    type="text"
                    className="form-control my-2"
                    placeholder="Nombre"
                    name="nombre"
                />
                <input

                    // value={values.direccion}
                    onChange={handleInputChange}
                    value={values.direccion}
                    type="text"
                    className="form-control my-2"
                    placeholder="direccion"
                    name="direccion"
                />
                <input
                    onChange={handleInputChange}
                    value={values.email}
                    type="email"
                    className="form-control my-2"
                    placeholder="email"
                    name="email"
                />
                <button disabled={loading} className="btn btn-success"> enviar</button>



            </form>
        </div>

    )
}

export default Check
