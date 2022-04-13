// eslint-disable-next-line import/prefer-default-export
export const isBtnDisabled = (selectedRow, isLoading, btn) => {
  let disabled = true;
  switch (btn.name) {
    case 'Удалить':
      disabled = !selectedRow;
      break;
    case 'Обновить':
    case 'Добавить':
    default:
      disabled = isLoading;
      break;
  }
  return isLoading ? true : disabled;
};
