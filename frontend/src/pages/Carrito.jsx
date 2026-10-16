import { Link, useNavigate } from "react-router-dom";
import { useCart } from "CartContext.jsx";

function obtenerUsuariosActivos(){
    try{
        return JSON.parse(localStorage.getItem("U"))
    }
}