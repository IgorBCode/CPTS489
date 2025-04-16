import { Form } from 'react-router';

export default function SearchBar({
    searchTerm,
    handleSearchChange,
    handleSearch,
    ...props
}) {
    return (
        <Form className={`d-flex ${props.className}`} onSubmit={handleSearch}>
            <div className="input-group">
                <input
                    className={`form-control form-control-lg`}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-primary px-4 board-battles-gradient-text" type="submit">
                    Search
                </button>
            </div>
        </Form>
    );
}
