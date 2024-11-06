import React from 'react';
import { SideBar, SearchBar, CatalogueBookSection, PaginationComponent } from '../';

const Catalogue = () => {
    return (
        <section className='catalogue-section'>
            <SearchBar />
            <SideBar />
            <CatalogueBookSection />
            <PaginationComponent />
        </section>
    );
};

export default Catalogue;