import { useMemo, useState } from 'react'
import { Switch } from './components'

function App() {
  const valueOfBox = useMemo(
    () => [
      { title: 'Active', value: 'Active' },
      { title: 'Deactive', value: 'Deactive' },
    ],
    [],
  )
  const [newValue, setNewValue] = useState(valueOfBox[0].value)
  const [prevValue, setPrevValue] = useState(valueOfBox[0].value)
  const [target, setTarget] = useState<string>()

  return (
    <div className="flex flex-col items-center grow justify-center">
      <img className="relative start-0.5" width={200} src="/OmegaLogo.svg" />
      <Switch
        valueOfBox={valueOfBox}
        onChange={({ newValue, prevValue, event }) => {
          setNewValue(newValue as string)
          setPrevValue(prevValue as string)
          setTarget((event.target as HTMLElement).outerHTML)
        }}
      />
      <div className="flex flex-col items-center space-y-2 mt-3">
        <div>{newValue}</div>
        <div>{prevValue}</div>
        <div className="font-mono">{target}</div>
      </div>
    </div>
  )
}

export default App
