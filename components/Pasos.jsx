import { useRouter } from "next/router"
import useQuiosco from "../hooks/useQuiosco"

const Pasos = () => {

    const {handleChangePaso, paso} = useQuiosco()

    const router = useRouter()

    const pasos = [
        {paso: 1, nombre: 'Menu', url: '/'},
        {paso: 2, nombre: 'Resumen', url: '/resumen'},
        {paso: 3, nombre: 'Datos y Total', url: '/total'}
    ]

    const calcularProgreso = () => {
      let valor;
        if (router.pathname === "/") {
          valor = 2;
        } else if (router.pathname === "/resumen") {
          valor = 50;
        } else {
          valor = 100;
        }
    return valor;
    }
    
  return (
    <>
      <div className="flex justify-between mb-5">
          {pasos.map(paso => (
            <button 
              onClick={() => {
                router.push(paso.url)
                handleChangePaso(paso.paso)
              }}
              className="text-2xl font-bold"
              key={paso.paso}>
              {paso.nombre}
            </button>
          ))}

      </div>

      <div className="bg-gray-200 md-10 rounded-full">
        <div className="rounded-full bg-naranja text-xs leading-none h-2 text-center text-white" style={{width: `${calcularProgreso()}%`}}></div>
      </div>
    </>
  )
}

export default Pasos