let auth =
{
    username: 'test',
    password: 1234
}

let userModule =
{
    read : (data) =>
    {
        data = {};
        data.auth = auth;

        let connection = new XMLHttpRequest();

        connection.open('POST', './backend/user/read.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'read') } );
        connection.send( JSON.stringify(data) );
    },

    create : (data) =>
    {
        data.auth = auth;

        let connection = new XMLHttpRequest();

        connection.open('POST', './backend/user/create.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'create') } );
        connection.send( JSON.stringify(data) );
    },

    edit : ( data ) =>
    {
        data.auth = auth;

        let connection = new XMLHttpRequest();

        connection.open('POST', './backend/user/edit.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'edit') } );
        connection.send( JSON.stringify(data) );
    },

    remove : (data) =>
    {
        data.auth = auth;

        let connection = new XMLHttpRequest();

        connection.open('POST', './backend/user/remove.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'remove') } );
        connection.send( JSON.stringify(data) );
    },

    login : (data) =>
    {   
        auth.username = data.username;
        auth.password = data.password;

        data.auth = auth;

        let connection = new XMLHttpRequest();

        connection.open('POST', './backend/auth/login.php');

        connection.addEventListener('loadend', event =>{ userModule.processServerResponse(event, 'login') } );
        connection.send( JSON.stringify(data) );
    },

    HTMLUserTable : ( data ) =>
    {
        data.unshift(['id', 'username', 'password']);

        let HTMLCode = `<table>`

        for ( let row=0; row<data.length; row++)
        {
            HTMLCode += `<tr id='${data[row][0]}'>`;

            for (let column=0; column<data[row].length; column++)
            {
                HTMLCode += `<td>${data[row][column]}</td>`;
            }

            if ( row == 0 )
            {
                HTMLCode += `<td>actions</td>`;
            }
            else
            {
                HTMLCode += `<td>
                            <button name="edit">Editar</button>
                            <button name="remove">Borrar</button>
                        </td>`;
            }

            HTMLCode += `</tr>` ;                                   
        }                       
                            
        HTMLCode += `</table>`;
        HTMLCode += `<button name="create">new user</button>`;
        return HTMLCode;
    },

    HTMLLoginFormUserDialog : () =>
    {
        let HTMLCode =
            ` <div class="w3-container w3-card-4 w3-light-grey w3-padding-16">
                <h2 class="w3-center" style='font-weight: bold'>LOGIN FOR USER & PASSWORD</h2>
                <label>Name*</label><br>
                <input id ='username' class="w3-input w3-border w3-round-large w3-text-grey" type="text" name="Name" value=""><br>
                <label>Password*</label><br>
                <input id ='password' class="w3-input w3-border w3-round-large w3-text-grey" type="password" name="pass" value=""><br>
            `;

        let getFormData = () =>
        {
            let data =
            {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }

            return data;
        }
     
        let dialog =
        {
            HTMLDialogView: HTMLCode,
            formData: getFormData
        }

        return dialog;
    },

    HTMLCreateFormUserDialog : () =>
    {
        let HTMLCode =
        `<table>
            <tr>
                <td colspan="2">
                    <h1>Create User</h1>
                </td>
            </tr>
            <tr>
                <td>
                    <label>username</label><br>
                    <input id='username' type="text" value=""><br>
                </td>
                <td>
                    <label>password</label><br>
                    <input id='password' type="password" value=""><br>
                </td>   
            </tr>
        </table>`;

        let getFormData = () =>
        {
            let data =
            {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }

            return data;
        }
     
        let dialog =
        {
            HTMLDialogView: HTMLCode,
            formData: getFormData
        }

        return dialog;
    },

    HTMLEditFormUserDialog : (id) =>
    {
        let element = document.getElementById(id);

        let HTMLCode =
        `<table>
            <tr>
                <td colspan="2">
                    <h1>Edit User ID=${element.childNodes[0].innerText }</h1>
                </td>
            </tr>
            <tr>
                <td>
                    <label>username</label><br>
                    <input id='username' type="text" value="${element.childNodes[1].innerText }"><br>
                </td>
                <td>
                    <label>password</label><br>
                    <input id='password' type="password" value="${element.childNodes[2].innerText }"><br>
                </td>   
            </tr>
        </table>`;

        let getFormData = () =>
        {
            let data =
            {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }

            return data;
        }
     
        let dialog =
        {
            HTMLDialogView: HTMLCode,
            formData: getFormData
        }

        return dialog;
    },

    HTMLRemoveFormUserDialog : (id) =>
    {
        let element = document.getElementById(id);

        let HTMLCode =
        `<h1>Remove User ID=${element.childNodes[0].innerText }?</h1>`;

        let getFormData = () =>
        {
            let data =
            {
                id: element.childNodes[0].innerText
            }

            return data;
        }
     
        let dialog =
        {
            HTMLDialogView: HTMLCode,
            formData: getFormData
        }

        return dialog;
    },


    showModalDialog : ( HTMLDialogFormElement, confirmAction, cancelAction ) =>
    {
        let modalElement = document.getElementById('modalDialogView');
       
        modalElement.innerHTML =
        `<div class="w3-modal-content w3-animate-top w3-card-4">
            <header class="w3-container w3-teal"> 
            <span id="cancel" class="w3-button w3-display-topright">&times;</span>
        </header>
        ${ HTMLDialogFormElement.HTMLDialogView }
            <button id="confirm">Accept</button> 
        </div>`;

        let confirmButtonClick = (event) =>
        {
            if ( confirmAction != undefined || confirmAction != null )
                confirmAction( HTMLDialogFormElement.formData() );
            
            modalElement.style.display = 'none';
            modalElement.removeEventListener('click',confirmButtonClick);
            modalElement.removeEventListener('click',cancelButtonClick);
        }

        let cancelButtonClick = (event) =>
        {
            if ( cancelAction != undefined || cancelAction != null )
                cancelAction(HTMLDialogFormElement.formData());
                    
            modalElement.style.display = 'none';
            modalElement.removeEventListener('click',confirmButtonClick);
            modalElement.removeEventListener('click',cancelButtonClick);
        }

        document.getElementById('confirm').addEventListener('click', confirmButtonClick );
        document.getElementById('cancel').addEventListener('click', cancelButtonClick );

        modalElement.style.display = 'block';
    },

    processActionButtonClickEvents : (event) =>
    {
        let element = event.target;
        let actionName = element.name;
        let elementId = element.parentElement.parentElement.id;

        switch(actionName) 
        {
            case 'create':
                let createDialog = userModule.HTMLCreateFormUserDialog();
                console.log('create request action for new server id');
                userModule.showModalDialog(createDialog, userModule.create, null );
            break;
           
            case 'edit':
                let editDialog = userModule.HTMLEditFormUserDialog(elementId);
                console.log('edit request action for data id='+elementId);
                userModule.showModalDialog(editDialog, userModule.edit, null );
            break;
            
            case 'remove':
                let removeDialog = userModule.HTMLRemoveFormUserDialog(elementId);
                console.log('remove request action for data id='+elementId);
                userModule.showModalDialog(removeDialog, userModule.remove, null );
            break;
            
            default:
        } 
    },

    updateView : (data) =>
    {
        let viewElement = document.getElementById("moduleView");
        viewElement.removeEventListener('click', userModule.processActionButtonClickEvents );

        //Insert HTML Code inside Element
        if ( Array.isArray(data) )
            viewElement.innerHTML = userModule.HTMLUserTable( data )
        else
            viewElement.innerHTML = userModule.HTMLUserTable( [] )

        //Associate Event Handlers for User Interface (After HTML Insertion)
        viewElement.addEventListener('click', userModule.processActionButtonClickEvents );
    },

    processServerResponse : ( event, name ) =>
    {
        if ( event.currentTarget.status == 200 )
        {
            switch(name) 
            {
                case 'read':
                    let serverResponse = event.currentTarget.responseText;
                    data = JSON.parse(serverResponse)       
                    userModule.updateView( data );
                break;

                case 'create':
                    userModule.updateView( data );
                    read();
                break;
               
                case 'edit':
                    userModule.updateView( data );
                    read();
                break;
                
                case 'remove':
                    userModule.updateView( data );
                    read();
                break;

                case 'login':
                {
                    let serverResponse = event.currentTarget.responseText;
                    data = JSON.parse(serverResponse)       
                    
                    if ( data == true )
                        userModule.welcome();
                    else
                    {
                        alert('Usuario y/o contraseÃ±a invÃ¡lida');
                        let loginDialog = userModule.HTMLLoginFormUserDialog();
                        showModalDialog( loginDialog, login, null );
                    }
                };
                
                default:
            }
        }
        else
        {
            alert("Hubo errores al procesar la solicitud.");
        }
    }

}


