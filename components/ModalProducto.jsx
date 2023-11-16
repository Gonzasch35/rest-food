import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"
import { useEffect, useState } from "react"

const ModalProducto = () => {

    const {producto, handleChangeModal, cantidad, setCantidad, handleSuma, handleResta, handleAddProduct, pedido} = useQuiosco()

    const [edicion, setEdicion] = useState(false)
    
    useEffect(() => {
        if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
          const productoEdicion = pedido.find(
            (pedidoState) => pedidoState.id === producto.id
          );
          setEdicion(true);
          setCantidad(productoEdicion.cantidad);
        }
      }, [producto, pedido]);

  return (
    <div className="md:flex gap-10">
        <div className="md:w-1/3">
            <Image 
                width={300}
                height={400}
                alt={`Imagen producto ${producto.imagen}`}
                src={`/assets/img/${producto.imagen}.jpg`}
            />
        </div>
        <div className="md:w-2/3">
            <div className="flex justify-end">
                <button 
                    onClick={() => handleChangeModal()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
            <p className="mt-5 font-black text-5xl text-naranja">{formatearDinero(producto.precio)}</p>
            <div className="flex gap-5 mt-5">
                <button type="button" className="text-5xl" onClick={handleResta}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
                <p className="text-4xl">{cantidad}</p>
                <button type="button" className="text-5xl" onClick={handleSuma}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </div>

            <button 
                className="bg-vio_claro hover:bg-vio_oscuro px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                onClick={() => {
                    handleAddProduct({...producto, cantidad})
                    handleChangeModal()
                }}
            >{edicion ? 'Guardar cambios' : 'Añadir al pedido'}</button>

        </div>
    </div>
  )
}

export default ModalProducto