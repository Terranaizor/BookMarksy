import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const baseUrl = 'http://localhost:8000/api/books/links/';
    const [fullResponse, setFullResponse] = useState(null);
    const [links, setLinks] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl);
                setFullResponse(response);
                setLinks(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        if (!fullResponse) {
            fetchData();
        }
    }, [])

    return (
        <DataContext.Provider value={{ fullResponse, links, loading }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};