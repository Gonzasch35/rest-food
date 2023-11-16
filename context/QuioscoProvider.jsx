import { createContext, useState, useEffect } from "react"
import axios from "axios"


const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [cantidad, setCantidad] = useState(1)

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {  
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id)
        setCategoriaActual(categoria[0])
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }
    
    const handleChangeModal = () => {
        setModal(!modal)
        setCantidad(1)
    }

    const handleSuma = () => {
        if(cantidad <= 5) setCantidad(cantidad + 1)
    }
    
    const handleResta = () => {
        if(cantidad >= 2) setCantidad(cantidad - 1)
    }
    
    return( 
        <QuioscoContext.Provider 
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetProducto,
                producto,
                modal,
                handleChangeModal,
                setModal,
                handleSuma,
                cantidad,
                handleResta
            }}    
        >
            {children}
        </QuioscoContext.Provider>
)}

export {
    QuioscoProvider
}

export default QuioscoContext