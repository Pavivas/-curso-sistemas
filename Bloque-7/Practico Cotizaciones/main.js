


let reloadDolarBlueView = (data) =>
{
    let compra = data [1].casa.compra;
    let venta = data[1].casa.venta;
    let variacion = data[1].casa.variacion;
    document.getElementById("DolarBlueCompraVenta").innerText= `$${compra}-----$${venta}`;
    document.getElementById("DolarBlueVariacion").innerText= `VARIACION = ${variacion}%`; 
}

let reloadDolarOficialView = (data) =>
{
    let compra = data [0].casa.compra;
    let venta = data[0].casa.venta;
    let variacion = data[0].casa.variacion;
    document.getElementById("DolarOficialCompraVenta").innerText= `$${compra}-----$${venta}`;
    document.getElementById("DolarOficialVariacion").innerText= `VARIACION = ${variacion}%`; 
}


let reloadContadoconLiquiView = (data) =>
{
    let compra = data [3].casa.compra;
    let venta = data[3].casa.venta;
    let variacion = data[3].casa.variacion;
    document.getElementById("ContadoconLiquiCompraVenta").innerText= `$${compra}-----$${venta}`;
    document.getElementById("ContadoconLiquiVariacion").innerText= `VARIACION = ${variacion}%`; 
}


let reloadDolarPromedioView = (data) =>
{
    let compra = data [9].casa.compra;
    let venta = data[9].casa.venta;
    let variacion = data[9].casa.variacion;
    document.getElementById("DolarPromedioCompraVenta").innerText= `$${compra}-----$${venta}`;
    document.getElementById("DolarPromedioVariacion").innerText= `VARIACION = ${variacion}%`; 
}


let reloadDolarBolsaView = (data) =>
{
    let compra = data [4].casa.compra;
    let venta = data[4].casa.venta;
    let variacion = data[4].casa.variacion;
    document.getElementById("DolarBolsaCompraVenta").innerText= `$${compra}-----$${venta}`;
    document.getElementById("DolarBolsaVariacion").innerText= `VARIACION = ${variacion}%`; 
}


let reloadDolarTuristaView = (data) =>
{
    let compra = data [7].casa.compra;
    let venta = data[7].casa.venta;
    let variacion = data[7].casa.variacion;
    document.getElementById("DolarTuristaCompraVenta").innerText= `$${compra}-----$${venta}`;
    document.getElementById("DolarTuristaVariacion").innerText= `VARIACION = ${variacion}%`; 
}


let reloadTableView = (data) =>
{
    reloadDolarOficialView(data);
    reloadDolarBlueView(data);
    reloadContadoconLiquiView(data);
    reloadDolarPromedioView(data);
    reloadDolarBolsaView(data);
    reloadDolarTuristaView(data);
}


let processServerResponse = ( event ) =>
{
    let data= {};
    if ( event.currentTarget.status == 200 )
    {
        let serverResponse = event.currentTarget.responseText;        
        data = JSON.parse(serverResponse);   
        console.log(data);
        reloadTableView(data);
    }
    else
    {
        alert("Hubo errores al procesar la solicitud.");
    }
}


let getCotizacion = () =>
{
    let connection = new XMLHttpRequest();
    connection.open('GET', 'https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    connection.addEventListener('loadend', processServerResponse);
    connection.send();
}


let start = () =>
{
    getCotizacion();
}


window.addEventListener('DOMContentLoaded', start );

//let botonDeCarga = document.getElementById("loadButton");
//botonDeCarga.addEventListener('click', start() );



