interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <>
      <label className="recipe-search-label" htmlFor="recipe-search">Search recipes</label>
      <input
        id="recipe-search"
        className="recipe-search-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by recipe name or category"
      />
    </>
  );
}
