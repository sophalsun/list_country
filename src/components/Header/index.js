import React, { useCallback } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search'

export default props => {
  const { onSearch } = props

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn = useCallback(debounce(onSearch), []);

  return <div style={styles.headWraper}>
    <div style={styles.seachWrapper}>
      <h1 style={{color: 'white'}}>Search Country here</h1>
      <Box style={styles.search}>
        <SearchIcon sx={{ fontSize: 50, marginRight: 1 }} />
        <TextField
          id="search" variant="standard" fullWidth
          inputProps={{style: {fontSize: 40}}}
          onChange={optimizedFn}
        />
      </Box>
    </div>
  </div>
}

const styles = {
  headWraper: {
    position: "relative",
    backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80")',
    width: '100%',
    height: '50vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    margin: '0 auto'
  },
  seachWrapper: {
    width: '100%',
    height: '50vh',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    width: '50%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: '20px'
  }
}
