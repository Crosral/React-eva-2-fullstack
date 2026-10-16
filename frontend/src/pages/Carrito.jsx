import { Link, useNavigate } from "react-router-dom";
import { useCart } from "CartContext.jsx";

function obtenerUsuariosActivo(){
    try{
        return JSON.parse(localStorage.getItem("usuarioActivo"));
    }catch{
        return null;
    }
}

    function Carrito() {
        useCart();
        const Navigate = useNavigate();
    }

    function manejarFinalizarCompra(){
        const orden = finalizarCompra(obtenerUsuariosActivo());
        if (!order){
            alert("Tu carrito esta vacio");
            return;
        }
        alert("Gracias por tu compra")
        navigate("/productos");
    }

    export default Carrito