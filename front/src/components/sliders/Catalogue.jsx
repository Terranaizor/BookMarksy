import React from 'react';
import { SortControl, CatalogueBookSection, PaginationComponent } from '../';

const Catalogue = () => {
    return (
        <section className='catalogue-section'>
            <SortControl />
            <CatalogueBookSection />
            <PaginationComponent />
        </section>
    );
};

export default Catalogue;