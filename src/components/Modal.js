import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const styles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 8
  },
  wrapper: {
    display: 'flex',
    alignItems: 'space-between'
  },
  flag: {
    width: '100px',
    height: '100px',
    borderRadius: '25%',
    marginRight: 16
  },
  countryInfo: {

  }
};

export default props => {
  const { data, open, onClose } = props
  return  <Modal
    open={open}
    onClose={onClose}
  >
    <Box sx={styles.content}>
      <Box sx={styles.wrapper}>
        <img style={styles.flag} src={data?.flags?.png} />

        <Box sx={styles.countryInfo}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { data?.name?.official }
          </Typography>
          <Typography>Population: { data?.population }</Typography>
          <Typography>Region: { data?.region }</Typography>
          <Typography>Capital: { data?.capital.join(' , ') }</Typography>
        </Box>
      </Box>
    </Box>
  </Modal>
}