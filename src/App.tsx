import type InputOptionInterface from "./components/base-multi-select-input/interfaces/input.option.interface";
import BaseMultiSelectInput from "./components/base-multi-select-input/BaseMultiSelectInput";
import OmegaImage from "./assets/icons/omega.png";
import RenrenImage from "./assets/icons/renren.png";
import React, {useState} from 'react';
import './App.scss';

function App() {

    const inputOptions: InputOptionInterface[] = [
        {
            value: "1",
            label: "Option 1",
            icon: OmegaImage
        },
        {
            value: "test",
            label: "Option Test",
            icon: RenrenImage
        }
    ]

    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleInputChanges = (selected: string[]) => {
        setSelectedValues(selected);
    };

  return (
    <div className="App">
      <div className="container" >
          <BaseMultiSelectInput
              options={inputOptions}
              model={selectedValues}
              onChange={handleInputChanges}
          />
      </div>
    </div>
  );
}

export default App;
