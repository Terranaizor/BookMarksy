import React, { createContext, useContext, useState } from "react";

const CatalogueDataContext = createContext();

export const CatalogueDataProvider = ({ children }) => {
    const [initialCataloguePage, setInitialCataloguePage] = useState(1);
    const [apiUrlForSortCatalogue, setApiUrlForSortCatalogue] = useState('');
    return (
        <CatalogueDataContext.Provider value={{ initialCataloguePage, setInitialCataloguePage, apiUrlForSortCatalogue, setApiUrlForSortCatalogue }}>
            {children}
        </CatalogueDataContext.Provider>
    );
};

export const useCatalogueData = () => {
    return useContext(CatalogueDataContext);
};