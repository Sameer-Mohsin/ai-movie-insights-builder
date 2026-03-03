'use client';

import { useState } from 'react';

export default function SearchBar({ onSearch, isLoading }) {
    const [input, setInput] = useState('');

    const isValid = /^tt\d{7,8}$/.test(input.trim());
    const showValidation = input.trim().length > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid && !isLoading) {
            onSearch(input.trim());
        }
    };

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__input-wrapper">
                    <input
                        id="imdb-search-input"
                        className="search__input"
                        type="text"
                        placeholder="Enter IMDb ID (e.g., tt0133093)"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        autoComplete="off"
                        spellCheck="false"
                    />
                    {showValidation && (
                        <span className="search__validation">
                            {isValid ? '✅' : '❌'}
                        </span>
                    )}
                </div>
                <button
                    id="search-button"
                    className={`search__btn ${isLoading ? 'search__btn--loading' : ''}`}
                    type="submit"
                    disabled={!isValid || isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search Movie'}
                </button>
            </form>
            <span className="search__helper">
                💡 Find the IMDb ID in the movie URL: imdb.com/title/<strong>tt0133093</strong>/
            </span>
        </div>
    );
}
