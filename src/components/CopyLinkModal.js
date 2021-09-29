import React from 'react';
import PropTypes from 'prop-types';

function CopyLinkModal({ setShouldDisplayMessage }) {
  return (
    <div
      style={ {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000050',
        top: 0,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      } }
      onClick={ () => setShouldDisplayMessage(false) }
      role="button"
      tabIndex={ 0 }
      onKeyPress={ () => setShouldDisplayMessage(false) }
    >
      <div
        style={ {
          padding: '4rem 3rem',
          backgroundColor: '#fff',
          color: 'black',
        } }
      >
        Link copiado!
      </div>
    </div>
  );
}

CopyLinkModal.propTypes = {
  setShouldDisplayMessage: PropTypes.func.isRequired,
};

export default CopyLinkModal;
