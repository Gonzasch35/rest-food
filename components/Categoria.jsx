import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

const Categoria = ({categoria}) => {

    const {categoriaActual, handleClickCategoria} = useQuiosco()
    const {nombre, icono, id} = categoria
  return (
    <div className={`${categoriaActual?.id === id ? 'bg-naranja' : ''} flex items-center gap-4 w-full border p-5 hover:bg-naranja cursor-pointer`}
    onClick={() => handleClickCategoria(id)}>
        <Image
            width={50}
            height={50}
            src={`/assets/img/icono_${icono}.svg`}
            alt="imagen-icono"    
        />

        <button
            type="button"
            className="text-2xl font-bold hover:cursor-pointer"
            onClick={() => handleClickCategoria(id)}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria