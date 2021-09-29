import React from 'react';
import { fetchIArea } from '../services';

function SelectArea() {
  const area = 
  const [listArea, setListArea] = useState([]);
  const [nameArea, setNameArea] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      data = await fetchIArea();
      setListArea(data);
    };
    fetchData();
  }, []);

  return (
    <label htmlFor="membership">
      Selecione a origem:
      <select name="membership" id="membership" data-testid="explore-by-area-dropdown">

        <option value="free">Free</option>
        <option value="bronze">Bronze</option>
        <option value="silver" selected>Silver</option>
        <option value="Gold">Gold</option>
      </select>
    </label>
  );
}

export default SelectArea;
