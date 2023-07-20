
const ItemDetail = ({item}) =>{

    return(
        <div className="itemCard container my-5">
            <h2>{item.nombre}</h2>
            <img src={item.img}alt= {item.nombre} />
            <p>{item.descripcion}</p>
            <p>{item.data}</p>
            <p>Precio: ${item.precio}</p>

            <button className="btn btn-primary">Agregar al carrito</button>

        </div>
    )


}

export default ItemDetail