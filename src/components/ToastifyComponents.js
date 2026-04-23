import { toast } from "react-toastify";

// сообщения 
    export const showSuccess = () => toast.success('Успешно!');
    export const showError = () => toast.error('Произошла ошибка при отправке данных!');
    export const showWarning = () => toast.warn('Внимание: заполните все поля');
    export const showErrSave = () => toast.warn('Ошибка при сохранении');
    export const showErrNetwork = () => toast.warn('Ошибка сети');