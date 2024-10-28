export const DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE = "DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE";
export const DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE = "DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE";

export const setDownloadNewPageAction = () => {
    return {
        type: DOWNLOAD_NEW_CATALOGUE_PAGE_TYPE,
    };
};

export const setDownloadPrevPageAction = () => {
    return {
        type: DOWNLOAD_PREVIOUS_CATALOGUE_PAGE_TYPE,
    };
};