import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fecha, setFecha] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pais, setPais] = useState("");
  const [producto, setProducto] = useState("");
  const [estado, setEstado] = useState("En proceso");
  const [pickingResume, setPickingResume] = useState([]);
  const [search, SetSearch] = useState("");
  

  useEffect(() => {
    Axios.get("http://localhost:4000/api/get").then((response) => {
      setPickingResume(response.data);
    });
  }, []);

  const HandleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/api/insert", {
      nombre: nombre,
      apellido: apellido,
      fecha: fecha,
      pais: pais,
      direccion: direccion,
      producto: producto,
      estado: estado,
    });
    setPickingResume([
      ...pickingResume,
      {
        nombre: nombre,
        apellido: apellido,
        fecha: fecha,
        pais: pais,
        direccion: direccion,
        producto: producto,
        estado: estado,
      },
    ]);
    setPickingResume("")
  };

  return (
    <div className="App">
      <h1>CONTROL PICKING</h1>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-25">
              <label htmlFor="fecha">
                <h3>Fecha</h3>
              </label>
            </div>
          </div>
          <div className="col-75">
            <input
              type="date"
              name="fecha"
              value={fecha}
              onChange={(e) => {
                setFecha(e.target.value);
              }}
            />
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="nombre">
                <h3>Nombres</h3>
              </label>
            </div>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="nombre"
              value={nombre}
              required
              placeholder="Nombre Cliente"
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="apellido">
                <h3>Apellidos</h3>
              </label>
            </div>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="apellido"
              value={apellido}
              placeholder="Apellido Cliente"
              required
              onChange={(e) => {
                setApellido(e.target.value);
              }}
            />
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="direccion">
                <h3>Direccion de envio</h3>
              </label>
            </div>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="direccion"
              placeholder="Direccion"
              value={direccion}
              required
              onChange={(e) => {
                setDireccion(e.target.value);
              }}
            />
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="pais">
                <h3>Pais de envio</h3>
              </label>
            </div>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="pais"
              value={pais}
              placeholder="Pais"
              onChange={(e) => {
                setPais(e.target.value);
              }}
            />
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="productos">
                <h3>Detalle Productos</h3>
              </label>
            </div>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="productos"
              value={producto}
              placeholder="Detalle del producto"
              onChange={(e) => {
                setProducto(e.target.value);
              }}
            />
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="estado">
                <h3>Estado Pedido</h3>
              </label>
            </div>
          </div>
          <div className="col-75">
            <select
              value={estado}
              onChange={(e) => {
                setEstado(e.target.value);
              }}
            >
              <option className="col-75" value="En proceso">
                {" "}
                En proceso
              </option>
              <option className="col-75" value="Pago aceptado">
                {" "}
                Pago aceptado
              </option>
            </select>
          </div>
          <div className="col-75">
            <input type="submit" value="Agregar" onClick={HandleSubmit} />
          </div>
        </form>
      </div>

      {/* Tabla de Pedidos*/}

      <input
        type="type"
        placeholder="Search..."
        onChange={(e) => {
          SetSearch(e.target.value);
        }}
      />

      <table id="customers">
        <tr>
          <th>Pedido #</th>
          <th>Fecha del pedido </th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Direccion</th>
          <th>Pais Envio</th>
          <th>Productos</th>
          <th>Estado del pedido </th>
        </tr>
      </table>

      {pickingResume.filter((list) => {
        
        if(search === ""){
          return list
          
        } else if(list.nombre.toLowerCase().includes(search.toLowerCase())){
          return list
        }
        return false
      }).map((list) => (
        <div key={list.id}>
          <table id="customers">
            <tr>
              <td>{list.id}</td>
              <td>{list.fecha}</td>
              <td>{list.nombre}</td>
              <td>{list.apellido}</td>
              <td>{list.direccion}</td>
              <td>{list.pais}</td>
              <td>{list.producto}</td>
              <td>{list.estado}</td>
            </tr>
          </table>
         
        </div>
      ))}
    </div>
  );
}

export default App;
