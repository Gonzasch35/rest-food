import Image from "next/image"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const Producto = ({producto}) => {

    const {handleSetProducto, handleChangeModal} = useQuiosco()

    const {nombre, precio, imagen} = producto

  return (
    <div className="border p-3">
        <Image
            width={400}
            height={500}
            src={`/assets/img/${imagen}.jpg`}
        />
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-naranja">{formatearDinero(precio)}</p>

        <button 
            type="button" 
            className="bg-vio_claro font-bold hover:bg-vio_oscuro text-white w-full mt-5 p-3 uppercase cursor-pointer"
            onClick={() => {
                handleChangeModal()
                handleSetProducto(producto) 
            }}
        >    
            Agregar
        </button>
    </div>
  )
}

export default Producto