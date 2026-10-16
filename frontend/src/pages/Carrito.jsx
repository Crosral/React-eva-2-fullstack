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

    if(carrito.length === 0){
        return(
            <main className="container my-4">
                <section className="carrito">
                    <h2>Carrito de Compras</h2>
                    <div className="carrito-vacio m-4"></div>
                    <h3>Tu carrito esta vacio</h3>
                    <p>Agrega productos de nuestro catalogo para continuar</p>
                </section>
            </main>

        )
    }

    export default Carrito