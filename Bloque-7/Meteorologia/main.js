let table =
[
    ["Mes", "Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic.", "Anual"],
    ["Temp.max. abs.(°C)", 39.3, 38.1, 36.3, 32.5, 27.4, 22.2, 27.7, 24.7, 28.8, 34.4, 35.7, 39.4, 39.4],
    ["Temp. max. media (°C)", 26.3, 25.8, 23.7, 20.5, 16.8, 13.8, 13.1, 14.4, 16, 18.5, 21.7, 24.4, 19.6],
    ["Temp. media (°C)", 20.3, 19.9, 18.0 , 14.6, 11.3, 8.5, 8.1, 8.9, 10.5, 13.1, 15.9, 18.5, 14.0],
    ["Temp. min. media (°C)", 14.3, 14.1, 12.5, 9.1, 6.4, 4.1, 3.8, 4.0, 5.3, 7.6, 10.1, 12.7, 8.7],
    ["Temp. min. abs (°C)", 4.7, 1.2, 1.9, -1, -3, -5.5, -9.3, -6.4, -5.5, -3, -2, -0.2,-9.3],
    ["Precipitación total (mm)", 100.1, 72.8, 107.0, 73.3, 73.5, 54.9, 58.9, 64.0, 56.4, 83.4, 75.3, 104.0, 923.6],
    ["Días de precipitaciones (>0.1mm)", 9, 8, 9, 9, 9, 9, 9, 8, 7, 10, 10, 10, 107],
    ["Horas de sol", 288.3, 234.5, 232.5, 195.0, 167.4, 120.0, 127.1, 164.3, 174.0, 210.8, 222.0, 269.7, 2405.6],
    ["Tumedad. relativa (%)", 76, 77, 79, 81, 83, 84, 81, 81, 80, 80, 77, 76, 80]
]

let getClassForTemperature = (temp) =>
{
    let class_type = '';
    if (temp >= 39 ) { class_type = "temp_39";}
    else if  (temp < 39 && temp >= 36) { class_type = "temp_36_39";} 
    else if  (temp < 36 && temp >= 33) { class_type = "temp_33_36";} 
    else if  (temp < 33 && temp >= 30) { class_type = "temp_30_33";} 
    else if  (temp < 30 && temp >= 27) { class_type = "temp_27_30";} 
    else if  (temp < 27 && temp >= 24) { class_type = "temp_24_27";}
    else if  (temp < 24 && temp >= 21) { class_type = "temp_21_24";}
    else if  (temp < 21 && temp >= 18) { class_type = "temp_18_21";}
    else if  (temp < 18 && temp >= 15) { class_type = "temp_15_18";}
    else if  (temp < 15 && temp >= 12) { class_type = "temp_12_15";}
    else if  (temp < 12 && temp >= 9) { class_type = "temp_9_12";}
    else if  (temp < 9 && temp >= 6) { class_type = "temp_6_9";}
    else if  (temp < 6 && temp >= 3) { class_type = "temp_3_6";}
    else if  (temp < 3 && temp >= 0) { class_type = "temp_0_3";}
    else if  (temp < 0 && temp >= -3) { class_type = "temp_minus3_0";}
    else if  (temp < -3 && temp >= -6) { class_type = "temp_minus6_minus3";}
    else if  (temp < -6 && temp >= -9) { class_type = "temp_minus9_minus6";}
    else if  (temp < -9 && temp >= -12) { class_type = "temp_minus12_minus9";}
    else if  (temp < -12 ) { class_type = "temp_minus12";}
        
    return class_type;
}

let generateHTMLCode = ( table ) =>
{
    let HTMLCode = `<table>`

    for ( let i=0; i<table.length; i++)
    {
        HTMLCode += `<tr>`;
        
        for (let j=0; j<table[i].length; j++)
        {
            if ( i < 6 && i > 0 ) //temperaturas
            {
               HTMLCode += `<td class="table_font ${getClassForTemperature(table[i][j])}">${table[i][j]}</td>`;
            }
            else if ( i == 6 ) //precipitacion
            {

            }
            else if ( i == 7 ) //dias de precipitaciones
            {

            }
            else if ( i == 8 ) // horas de sol
            {

            }
            else if ( i == 9 ) // humedad relativa
            {

            }

        }            
        
        HTMLCode += `</tr>` ;                                   
    }                       
                        
    HTMLCode += `</table>`;
    
    return HTMLCode;            
}

//Peticiones al servidor en segundo plano

//Dos maneras de hacerlo:

//API XmlHttpRequest

let procesarRespuestaDelServer = ( event ) =>
{
    if ( event.currentTarget.status == 200 )
    {
        let serverResponse = event.currentTarget.responseText;
        alert('Solicitud satisfactoria');
        let body = document.getElementById("gui");
        body.innerHTML = generateHTMLCode( table );
    }
    else
    {
        alert("Hubo errores al procesar la solicitud.");
    }
}

let realizarPeticionAlServer = ( event ) =>
{
    let connection = new XMLHttpRequest();

    connection.open('GET', 'server.php');

    connection.addEventListener('loadend', procesarRespuestaDelServer );
    connection.send();
}



//-------------------------
let botonDeCarga = document.getElementById("loadButton");
botonDeCarga.addEventListener('click', realizarPeticionAlServer );

