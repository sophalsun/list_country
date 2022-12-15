import React, { useState } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import Header from './components/Header'
import Table from './components/Table'
import Modal from './components/Modal'
import './App.css';

const headCells = [
  { id: 'flags', image: true, label: 'Flags' },
  { id: 'name', label: 'Country Name' },
  { id: 'cca2', label: '2 Country Code' },
  { id: 'cca3', label: '3 Country Code' },
  { id: 'nativeName', label: 'Native Country Name' },
  { id: 'altSpellings', label: 'Alternative Country Name' },
  { id: 'callingCodes', label: 'Country Calling Codes' },
];

function App() {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR('https://restcountries.com/v3.1/all', fetcher)
  const [country, setCountry] = useState(null)

  const onSearch = event => {
    const value = event.target.value
    const endpoint = !!value ? `https://restcountries.com/v3.1/name/${value}` : 'https://restcountries.com/v3.1/all'
    handleMutation({ mutate,
      url: 'https://restcountries.com/v3.1/all',
      mutateUrl: endpoint, method: 'GET'
    })
  }

  return <div>
    <Header onSearch={onSearch} />
    <Table headCells={headCells} rows={data || []} onClick={data => setCountry(data)} />
    <Modal data={country} open={!!country} onClose={() => setCountry(null)} />
  </div>
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

const handleMutation = ({ mutate, options = {}, mutateUrl, url, body, method }) => {
  const mutateFn = () => fetch(mutateUrl, {
    method,
    body: JSON.stringify(body)
  }).then(res => res.json())

  return mutate(url, mutateFn, {
    populateCache: (payload, items) => {
      if(!payload)
        return items

      return payload
    },
    revalidate: false,
    ...options
  })
}