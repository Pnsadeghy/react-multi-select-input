import type InputOptionInterface from "./components/base-multi-select-input/interfaces/input.option.interface";
import BaseMultiSelectInput from "./components/base-multi-select-input/BaseMultiSelectInput";
import React, {useState} from 'react';
import './App.scss';

function App() {

    const inputOptions: InputOptionInterface[] = []

    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleInputChanges = (selected: string[]) => {
        setSelectedValues(selected);
    };

  return (
    <div className="App">
      <BaseMultiSelectInput
          options={inputOptions}
          model={selectedValues}
          onChange={handleInputChanges}
      />
    </div>
  );
}

export default App;
