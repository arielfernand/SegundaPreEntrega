import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import ItemCount from "../ItemCount/ItemCount"

const ItemDetail = ({ item }) => {
    const { agregarAlCarrito, isInCart } = useContext(CartContext)

    console.log(isInCart(item.id))

    const [cantidad, setCantidad] = useState(1)

    const handleAgregar = () => {
        const newItem = {
            ...item,
            cantidad
        }
        // const newCart = cart.slice ()
        // newCart.push (newItem)
        // setCart (newCart)

        // setCart([...cart, newItem])
        agregarAlCarrito(newItem)
    }

    return (
        <div className="itemCard container my-5">
            <h2>{item.nombre}</h2>
            <img src={item.img} alt={item.nombre} />
            <p>{item.descripcion}</p>
            <p>{item.data}</p>
            <p>Precio: ${item.precio}</p>

            {
                isInCart(item.id)
                    ? <Link className="btn btn-success" to="/cart">terminar mi compra</Link>
                    : <ItemCount
                        max={item.stock}
                        counter={cantidad}
                        setCounter={setCantidad}
                        agregar={handleAgregar}
                    />
            }



            {/* <button className="btn btn-primary">Agregar al carrito</button> */}

        </div>
    )


}

export default ItemDetail