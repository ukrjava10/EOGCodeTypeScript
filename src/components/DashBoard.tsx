import React from 'react';
import DropDown from '../components/DropDown';
import MetricsList from '../Features/MetricsList/MetricsList';

export default function DashBoard() {
  const [option, setOption] = React.useState('');
  const handleChange = (event: any) => {
    setOption(event.target.value);
  };

  return (
    <div>
      <DropDown option={option} handleChange={handleChange} />;
      <MetricsList option={option} />
    </div>
  );
}
