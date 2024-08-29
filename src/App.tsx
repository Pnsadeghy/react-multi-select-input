import type InputOptionInterface from "./components/base-multi-select-input/interfaces/input.option.interface";
import BaseMultiSelectInput from "./components/base-multi-select-input/BaseMultiSelectInput";
import React, {useState} from 'react';
import './App.scss';

function App() {

    const inputOptions: InputOptionInterface[] = [
        {
            value: "1",
            label: "Option 1",
            icon: "assets/icon/omega.png"
        },
        {
            value: "test",
            label: "Option Test",
            icon: "assets/icon/renren.png"
        }
    ]

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
