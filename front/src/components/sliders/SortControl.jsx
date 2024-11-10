import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getGenresSelector } from '../../store/reducers/catalogue.reducer';

const SortControl = () => {
    const genres = useSelector(getGenresSelector);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    function toSafeId(str) {
        return str.replace(/[^a-zA-Z0-9]/g, "_");
    }

    return (
        <Fragment>
            <section className='catalogue-search'>
                <div className='catalogue-search--input'>
                    <FontAwesomeIcon icon={faSearch} className="icon icon-focus" />
                    <input
                        type="text"
                        placeholder={"Search book name, author, edition..."}
                    />
                </div>

                <div className="filter-menu">
                    <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleDropdown} />
                    {dropdownOpen ? (
                        <div className="filter-menu__dropdown">
                            <div className="filter-menu__section">
                                <h4 className="filter-menu__section-title">Genres</h4>
                                <div className="filter-menu__options">
                                    {genres.map((item, id) => (
                                        <div key={id} className="filter-menu__option">
                                            <input
                                                type="checkbox"
                                                id={toSafeId(item)}
                                                name={toSafeId(item)}
                                                value={item}
                                                className="filter-menu__checkbox"
                                            />
                                            <label htmlFor={toSafeId(item)} className="filter-menu__label">
                                                {item}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
 
                            <button className="filter-menu__button" onClick={() => setDropdownOpen(false)}>Search</button>
                        </div>
                    ) : null}
                </div>
            </section>
        </Fragment>
    );
};

export default SortControl;