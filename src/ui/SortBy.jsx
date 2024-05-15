import Select from "/src/ui/Select.jsx";
import {useSearchParams} from "react-router-dom";

function SortBy({options}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <Select value={sortBy} options={options} type="white"
              onChange={handleChange}/>
    </div>
  );
}

export default SortBy;
