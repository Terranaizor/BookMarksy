import React, { createContext, useContext, useState } from "react"; // Додано useState

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Змінна стану для теми

    const changeTheme = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};