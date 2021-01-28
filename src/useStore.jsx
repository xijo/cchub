import { useState, useEffect } from 'react';
import { store } from './Store'

export const useStore = (key) => {
  const [value, setValue] = useState(store.get(key))

  useEffect(() => {
    store.onDidChange(key, setValue)
  }, [])

  const changeValue = (newValue) => {
    store.set(key, newValue)
    setValue(newValue)
  }

  return [value, changeValue]
}
