import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faHeart } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeSelect = () => {
    const { theme, changeTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const themes = [
        { value: 'light', label: 'Світла', icon: faSun },
        { value: 'dark', label: 'Темна', icon: faMoon },
        { value: 'pink', label: 'Пінкова', icon: faHeart }
    ];
    const availableThemes = themes.filter(t => t.value !== theme);

    const handleThemeChange = (selectedTheme) => {
        changeTheme(selectedTheme);
        setIsOpen(false);
    };

    return (
        <div className="theme-select"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <FontAwesomeIcon className="icon" icon={themes.find(t => t.value === theme).icon} />
            {isOpen && (
                <ul className="dropdown-menu">
                    {availableThemes.map((t) => (
                        <li key={t.value} onClick={() => handleThemeChange(t.value)}>
                            <FontAwesomeIcon className="icon" icon={t.icon} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ThemeSelect;