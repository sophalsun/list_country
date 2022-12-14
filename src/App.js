import React from 'react'
import {
  Container, Grid
} from '@mui/material'
import useSWR, { useSWRConfig } from 'swr'
import Table from './components/Table'
import './App.css';

const headCells = [
  { id: 'flags', image: true, label: 'Flags' },
  { id: 'name', label: 'Country Name' },
  { id: 'alpha2Code', label: '2 Country Code' },
  { id: 'alpha3Code', label: '3 Country Code' },
  { id: 'nativeName', label: 'Native Country Name' },
  { id: 'altSpellings', label: 'Alternative Country Name' },
  { id: 'callingCodes', label: 'Country Calling Codes' },
];

function App() {
  const { data, error } = useSWR('https://restcountries.com/v2/all', fetcher)

  const onSearch = () => {

  }

  return <Container>
    <Table
      headCells={headCells}
      rows={data || []}
      onSearch={onSearch}
    />
  </Container>
}

export default App;

export const fetcher = async url => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = {
      message: await res.json(),
      status: res.status
    }
    throw error
  }

  const resData = await res.json()
  return resData
}
