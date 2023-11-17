import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [cantidad, setCantidad] = useState(1)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState('')

    const router = useRouter()
    

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

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad ) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
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

    const handleAddProduct = ({categoriaId, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)

            toast.success('Pedido actualizado', {
                autoClose: 2000,
                position: "bottom-right"
            })
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido', {
                autoClose: 2000,
                position: "bottom-right"
            })
        }

    }

    const handleEditarCantidades = (id) => {
        const productoActualizado = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizado[0])

        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const eliminarProducto = pedido.filter(producto => producto.id !== id)
        setPedido(eliminarProducto)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            // Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente', {
                autoClose: 2000,
                position: "bottom-right"
            })

            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error)
        }

    };

    
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
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}    
        >
            {children}
        </QuioscoContext.Provider>
)}

export {
    QuioscoProvider
}

export default QuioscoContext