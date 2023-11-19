import Image from "next/image"
import axios from "axios"
import { formatearDinero } from "../helpers"
import { toast } from "react-toastify"


const Orden = ({orden, pedido}) => {

    const {id, nombre, total} = orden

    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden Lista')
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

  return (
    <div className="border p-10 space-y-5">
        <h3 className="text-2xl font-oold">Orden: {id}</h3>
        <p className="text-lg font-bold">Nombre del cliente: {nombre}</p>

        <div>
            {
                pedido?.map(producto => (

                    <div key={producto.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                        <div className="w-32">
                            <Image 
                                width={400}
                                height={500}
                                src={`/assets/img/${producto.imagen}.jpg`}
                            />
                        </div>

                        <div className="p-5 space-y-2">
                            <h4 className="text-xl font-bold text-naranja">{producto.nombre}</h4>
                            <p className="text-lg font-bold">Cantidad: {producto.cantidad}</p>
                        </div>
                    </div>
                ))}
        </div>
        <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-bold text-4xl text-naranja">Total a pagar: {formatearDinero(total)}</p>
                <button 
                    className="bg-vio_claro hover:bg-vio_oscuro text-white mt-5 md:mt-8 py-3 px-10 uppercase font-bold rounded"
                    type="submit"
                    onClick={completarOrden}
                >
                    Completar orden
                </button>
        </div>
    </div>
  )
}

export default Orden