export const priorityLabels = {
  high: 'Высокий',
  middle: 'Средний',
  low: 'Низкий',
};

export const priorityColors = {
  high: '#e448dc',
  middle: '#e2e612',
  low: '#83f88c',
  default: '#f5f5f5',
};

// Функция-помощник с обработкой ошибок
export const getPriorityLabel = (priorityCode) => {
  return priorityLabels[priorityCode] || 'Неизвестный приоритет';
};