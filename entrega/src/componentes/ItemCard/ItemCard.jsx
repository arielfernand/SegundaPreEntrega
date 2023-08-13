import { Link } from "react-router-dom"
import './ItemCard.scss'

export const ItemCard = ({item}) => {
    return (
        <div key={item.id} className='itemCard col-2 m-2'>
            <h4>{item.nombre}</h4>
            <img className='itemImg' src={item.img} alt={item.nombre} />
            <p>{item.descripcion}</p>
            <p>Precio: ${item.precio}</p>
            {
                item.stock < 30 && <p className="text-red-500">Ultimas unidades!</p>
            }
            <Link to={`/detail/${item.id}`}className='btn btn-primary'>Comprar</Link>
        </div>
    )
}