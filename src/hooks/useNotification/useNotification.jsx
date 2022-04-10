import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

const defaultErrSettings = {
  vertical: 'bottom',
  horizontal: 'right'
};

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const renderSnackBar = (data, variant) =>
    enqueueSnackbar(data, {
      variant,
      anchorOrigin: defaultErrSettings
    });

  renderSnackBar.propTypes = {
    data: PropTypes.string,
    variant: PropTypes.oneOf(['success', 'error', 'warning', 'info'])
  };

  return renderSnackBar;
};

export default useNotification;
