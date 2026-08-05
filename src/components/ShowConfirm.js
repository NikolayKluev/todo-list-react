import { confirmAlert } from "react-confirm-alert";

export const showConfirm = (navigate, action) => {
    confirmAlert({
        title: 'Подтверждение действия',
        message: 'Вы уверены, что хотите удалить этот элемент?',
        buttons: [
            {
                label: 'Да',
                onClick: () => {
                    action();
                    navigate(-1);
                }
            },
            {
                label: 'Нет',
                onClick: () => { console.log('Отмена удаления'); }
            }
        ]
    });
};

export const showConfirmWithoutNav = (action) => {
    confirmAlert({
        title: 'Подтверждение действия',
        message: 'Вы уверены, что хотите удалить этот элемент?',
        buttons: [
            {
                label: 'Да',
                onClick: () => {
                    action();
                }
            },
            {
                label: 'Нет',
                onClick: () => { console.log('Отмена удаления'); }
            }
        ]
    });
};