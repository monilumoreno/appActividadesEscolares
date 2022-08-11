import swal from "sweetalert";

class ErrorAlert {
    showAlert (mensaje) {
        swal({
            title: 'Error',
            text: mensaje,
            icon: 'error',
            buttons: {
                confirm: {
                    text: 'Aceptar',
                    value: true,
                    visible: true,
                    className: 'btn btn-danger',
                    closeModal: true
                }
            }
        });
    }
}

export default new ErrorAlert()