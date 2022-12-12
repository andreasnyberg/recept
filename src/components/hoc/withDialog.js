import { useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const withDialog = Component => props => {
  let history = useHistory();
  const closeDialogOnEsc = useCallback((e) => {
    if(e.keyCode === 27) {
      history.push('/');
    }
  }, [history]);

  useEffect(() => {
    document.addEventListener('keydown', closeDialogOnEsc);

    return () => {
      document.removeEventListener('keydown', closeDialogOnEsc);
    };
  });

  return (
    <div className="dialog-outer">
      <div className="dialog">
        <div className="dialog-inner">
          <Link to="/" className="button dialog-close-button floating-button floating-button--round" />
          <Component {...props} />
        </div>
      </div>
    </div>
  )
}

export default withDialog;