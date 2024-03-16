
export default function validateForm(value, type) {
      if (value.trim() == '') {
            return { error: true, text: 'fields must not be empty!' };
      }

      if (type == 'email' && !/[A-z0-9_.%+-]+@[a-z]+\.[a-z]{2,}$/.test(value)) {
            return { error: true, text: 'this is not the right email type' };
      }
                  
      if (type == 'password' && value.length < 8) {
            return { error: true, text: 'password must have at least 8 symbols!' };
      }

      return { error: false, text: '' };
}

