export const SET_LINKS_TYPE = "SET_LINKS_TYPE";

export const setLinksAction = (links) => {
    return {
        type: SET_LINKS_TYPE,
        payload: links
    };
};