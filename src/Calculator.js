import React, {useState} from "react";
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };
  
  function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }
  
  function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }
  
  function BoilingVerdict(props) {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
  }
  
  const TemperatureInput = ({scale, onScaleChange, temperature, onTemperatureChange}) => {
    function handleChange(e) {
      onTemperatureChange(e.target.value);
      onScaleChange(scale);
    }
    
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={handleChange} />
      </fieldset>
    );
  }
  
  const Calculator = () => {
    const [scale, setScale] = React.useState('c');
    const [temperature, setTemperature] = React.useState('');
  
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
  
    return (
      <>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onScaleChange={setScale} 
          onTemperatureChange={setTemperature} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onScaleChange={setScale} 
          onTemperatureChange={setTemperature} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </>
    );
    
  }
  
export default Calculator;