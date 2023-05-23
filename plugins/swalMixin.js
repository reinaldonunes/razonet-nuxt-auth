import Swal from 'sweetalert';

const swalMixin = {
  methods: {
    showSuccessAlert(message) {
      Swal({
        title: 'Sucesso!',
        text: message,
        icon: 'success',
      })
    },

    showErrorAlert(message) {
      Swal({
        title: 'Ops!',
        text: message,
        icon: 'error',
      })
    }
  }
}

export default swalMixin