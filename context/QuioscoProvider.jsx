import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"


const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [cantidad, setCantidad] = useState(1)
    const [pedido, setPedido] = useState([])
    const [paso, setPaso] = useState(1)

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

    const handleAddProduct = ({categoriaId, imagen, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)

            toast.success('Pedido actualizado', {
                autoClose: 2000,
            })
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido', {
                autoClose: 2000,
            })
        }

    }

    const handleChangePaso = (paso) => {
        setPaso(paso)
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
                setCantidad,
                handleResta,
                handleAddProduct,
                pedido,
                handleChangePaso,
                paso
            }}    
        >
            {children}
        </QuioscoContext.Provider>
)}

export {
    QuioscoProvider
}

export default QuioscoContext