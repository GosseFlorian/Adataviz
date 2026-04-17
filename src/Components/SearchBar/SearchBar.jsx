import './searchBar.css'

export function SearchBar({placeholder, onInput}) {

    return (
        <input className="search-bar" onInput={onInput} placeholder={placeholder} type="text" />
    )
}