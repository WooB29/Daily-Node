import { Toast } from 'react-native-toast-message/lib/src/Toast';

const showToast = (text) =>{
    Toast.show({
        type: 'error',
        position: 'bottom',
        text1: text,
      });
};

export default showToast;