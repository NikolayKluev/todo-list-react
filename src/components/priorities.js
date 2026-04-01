export const priorityLabels = {
  high: 'Высокий',
  middle: 'Средний',
  low: 'Низкий',
};

// Функция-помощник с обработкой ошибок
export const getPriorityLabel = (priorityCode) => {
  return priorityLabels[priorityCode] || 'Неизвестный приоритет';
};