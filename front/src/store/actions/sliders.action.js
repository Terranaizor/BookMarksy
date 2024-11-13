import axios from "axios";

export const SET_SLIDERS_DATA_LOADING_TYPE = "SET_SLIDERS_DATA_LOADING_TYPE";
export const DOWNLOAD_SLIDERS_DATA_TYPE = "DOWNLOAD_SLIDERS_DATA_TYPE";

export const setSlidersDataLoadingAction = (loading) => {
    return {
        type: SET_SLIDERS_DATA_LOADING_TYPE,
        payload: loading,
    };
};

export const downloadSliderDataAction = (name, title, data) => {
    return {
        type: DOWNLOAD_SLIDERS_DATA_TYPE,
        payload: { name, title, data },
    };
};

export const getSlidersDataThunk = (popularBooksUrl, newBooksUrl) => {
    return async (dispatch) => {
        dispatch(setSlidersDataLoadingAction(true));
        try {
            const [popularResponse, newResponse] = await Promise.all([
                axios.get(popularBooksUrl),
                axios.get(newBooksUrl)
            ]);

            dispatch(downloadSliderDataAction("popularBooks", "popular", popularResponse.data));
            dispatch(downloadSliderDataAction("newBooks", "New", newResponse.data));

        } catch (error) {
            console.error("Error fetching slider data:", error);
        } finally {
            dispatch(setSlidersDataLoadingAction(false));
        }
    }
}