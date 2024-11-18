import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getFiltersSelector } from '../../store/reducers/catalogue.reducer';
import { getCatalogueThunk, showFilteredAction } from '../../store/actions/catalogue.action';
import { useCatalogueData } from '../../context/CatalogueDataContext.jsx';

const SortControl = () => {
    const filters = useSelector(getFiltersSelector);
    const dropdownRef = useRef(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { initialCataloguePage, setApiUrlForSortCatalogue } = useCatalogueData();

    // Create initial state dynamically from filters
    const initialSelectedFilters = Object.keys(filters).reduce((acc, key) => {
        acc[key] = [];
        return acc;
    }, {});
    const [selectedFilters, setSelectedFilters] = useState(initialSelectedFilters);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    function toSafeId(str) {
        return str.replace(/[^a-zA-Z0-9]/g, "_");
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleCheckboxChange = (category, value) => {
        setSelectedFilters((prev) => {
            const currentValues = prev[category] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((item) => item !== value) // Remove if already selected
                : [...currentValues, value]; // Add if not selected

            return { ...prev, [category]: newValues };
        });
    };

    const generateApiUrl = () => {
        const queryParams = [];
        Object.entries(selectedFilters).forEach(([category, values]) => {
            values.forEach((value) => {
                queryParams.push(`${category}=${encodeURIComponent(value)}`);
            });
        });
        const apiUrl = `http://localhost:8000/api/books/filtered/?${queryParams.join("&")}&search=Twenty`;
        dispatch(getCatalogueThunk(apiUrl, initialCataloguePage));
        setApiUrlForSortCatalogue(apiUrl);
        dispatch(showFilteredAction(true));
    };

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
                <div className="filter-menu" ref={dropdownRef}>
                    <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleDropdown} />
                    {dropdownOpen ? (
                        <div className="filter-menu__dropdown">
                            {Object.entries(filters).map(([categoryName, items]) => (
                                <div key={categoryName} className="filter-menu__section">
                                    <h4 className="filter-menu__section-title">{categoryName}</h4>
                                    <div className="filter-menu__options">
                                        {items.map((item, id) => (
                                            <div key={id} className="filter-menu__option">
                                                <input
                                                    type="checkbox"
                                                    id={toSafeId(item)}
                                                    name={toSafeId(item)}
                                                    value={item}
                                                    className="filter-menu__checkbox"
                                                    onChange={() =>
                                                        handleCheckboxChange(categoryName, item)
                                                    }
                                                />
                                                <label htmlFor={toSafeId(item)} className="filter-menu__label">
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button className="filter-menu__button" onClick={() => {
                                generateApiUrl();
                                setDropdownOpen(false)
                            }
                            }>Search</button>
                        </div>
                    ) : null}
                </div>
            </section>
        </Fragment>
    );
};

export default SortControl;