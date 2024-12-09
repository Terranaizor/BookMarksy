import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getFiltersSelector, getIsFilteredSelector } from '../../store/reducers/catalogue.reducer';
import { getCatalogueThunk, showFilteredAction } from '../../store/actions/catalogue.action';
import { useCatalogueData } from '../../context/CatalogueDataContext.jsx';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { getCatalogueBooksUrlSelector } from '../../store/reducers/links.reducer.js';

const SortControl = () => {
    // Select filters from the Redux store
    const filters = useSelector(getFiltersSelector);
    const dropdownRef = useRef(null); // Reference for the dropdown menu

    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
    const { initialCataloguePage, setApiUrlForSortCatalogue } = useCatalogueData(); // Context for catalog data
    const [inputData, setInputData] = useState(''); // State to handle search input

    // Initialize selected filters based on the available filters in the Redux store
    const initialSelectedFilters = Object.keys(filters).reduce((acc, key) => {
        const filterType = filters[key]?.type;
        if (filterType === 'radio') {
            acc[key] = null; // For radio filters, we store the selected value
        } else {
            acc[key] = []; // For checkboxes, we store an array of selected values
        }
        return acc;
    }, {});

    const [selectedFilters, setSelectedFilters] = useState(initialSelectedFilters || {}); // State for the currently selected filters
    const dispatch = useDispatch(); // Dispatch function for Redux actions
    const catalogueBooksUrl = useSelector(getCatalogueBooksUrlSelector); // Select the current catalogue books URL
    const isFiltered = useSelector(getIsFilteredSelector); // Check if the catalogue is filtered

    // Toggle the dropdown menu visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Utility function to convert strings to a safe ID format (replace non-alphanumeric characters with underscores)
    function toSafeId(str) {
        return str.replace(/[^a-zA-Z0-9]/g, "_");
    }

    // Close the dropdown if clicked outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    // Set up event listener for closing the dropdown when clicking outside
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

    // Handle the change in checkbox/radio selection
    const handleCheckboxChange = (category, value) => {
        setSelectedFilters((prev) => {
            const filterType = filters[category]?.type;
            if (filterType === 'radio') {
                // For radio buttons, only one value can be selected
                return { ...prev, [category]: value };
            } else {
                // For checkboxes, toggle the value in the array
                const currentValues = prev[category] || [];
                const newValues = currentValues.includes(value)
                    ? currentValues.filter((item) => item !== value) // Remove if already selected
                    : [...currentValues, value]; // Add if not selected

                return { ...prev, [category]: newValues };
            }
        });
    };

    // Handle the change in the search input field
    const handleInputChange = (e) => {
        setInputData(e.target.value || ''); // Update the input value state
    };

    // Generate the API URL based on selected filters and search input
    const generateApiUrl = () => {
        const queryParams = [];
        Object.entries(selectedFilters).forEach(([category, values]) => {
            // Adjust category names (e.g., Publishers -> publisher)
            const adjustedCategory = category === "Publishers" ? "publisher" : category;
            const lowerCaseCategory = adjustedCategory.toLowerCase();
            const lowerCaseValues = Array.isArray(values)
                ? values.map((value) => value.toLowerCase()) // Handle multiple selected values
                : [values.toLowerCase()];
            lowerCaseValues.forEach((value) => {
                queryParams.push(`${lowerCaseCategory}=${encodeURIComponent(value)}`);
            });
        });
        let apiUrl = '';
        // If there is a search input, include it in the URL
        if (inputData === '') {
            apiUrl = `http://localhost:8000/api/books/filtered/?${queryParams.join("&")}`;
        } else {
            apiUrl = `http://localhost:8000/api/books/filtered/?${queryParams.join("&")}&search=${inputData}`;
        }
        // Dispatch actions to update the catalogue
        dispatch(getCatalogueThunk(apiUrl, initialCataloguePage));
        setApiUrlForSortCatalogue(apiUrl);
        dispatch(showFilteredAction(true)); // Indicate that the catalogue is filtered
        setInputData(''); // Clear the search input
        setSelectedFilters(initialSelectedFilters); // Reset selected filters to initial state
    };

    // Handle the "back" button action to return to the unfiltered catalogue
    const returnBack = () => {
        dispatch(showFilteredAction(false)); // Indicate that the catalogue is not filtered
        dispatch(getCatalogueThunk(catalogueBooksUrl, initialCataloguePage)); // Load the unfiltered catalogue
    };
    
    return (
        <Fragment>
            <section className='catalogue-search'>
                {
                    isFiltered ? <FontAwesomeIcon icon={faCircleLeft} className="icon" onClick={returnBack} />
                        : <div></div>
                }
                <div className="filter-menu" ref={dropdownRef}>
                    <FontAwesomeIcon icon={faBars} className="icon" onClick={toggleDropdown} />
                    {dropdownOpen ? (
                        <div className="filter-menu__dropdown">
                            <div className="filter-menu__section">
                                <h4 className="filter-menu__section-title"> Search book by name </h4>
                                <div className='catalogue-search--input'>
                                    <FontAwesomeIcon icon={faSearch} className="icon icon-focus" />
                                    <input
                                        type="text"
                                        placeholder={"Search book, author, edition..."}
                                        onChange={handleInputChange}
                                        value={inputData || ''}
                                    />
                                </div>
                            </div>
                            {Object.entries(filters).map(([categoryName, { data, type }]) => (
                                <div key={categoryName} className="filter-menu__section">
                                    <h4 className="filter-menu__section-title">{categoryName}</h4>
                                    <div className="filter-menu__options">
                                        {Array.isArray(data) && data.map((item, id) => (
                                            <div key={id} className="filter-menu__option">
                                                <input
                                                    type={type === 'radio' ? 'radio' : 'checkbox'}
                                                    id={toSafeId(item)}
                                                    name={toSafeId(item)}
                                                    value={item}
                                                    className="filter-menu__checkbox"
                                                    onChange={() =>
                                                        handleCheckboxChange(categoryName, item, type)
                                                    }
                                                    checked={type === 'radio'
                                                        ? selectedFilters[categoryName] === item
                                                        : selectedFilters[categoryName]?.includes(item) || false
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