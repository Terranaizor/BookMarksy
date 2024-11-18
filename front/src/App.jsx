import { Fragment, useEffect, useState } from 'react'
import MainPage from './pages/MainPage'
import { NavBar, Footer, LoginPopup } from './components/'
import { useTheme } from './context/ThemeContext'
import { useData } from './context/DataContext'
import { useDispatch, useSelector } from 'react-redux'
import { setLinksAction } from './store/actions/links.action'
import { getCatalogueThunk, getFiltersThunk } from './store/actions/catalogue.action'
import { getCatalogueBooksUrlSelector, getFilterParanetersUrlSelector, getGenresListUrlSelector, getNewBooksUrlSelector, getPopularBooksUrlSelector } from './store/reducers/links.reducer'
import { getSlidersDataThunk } from './store/actions/sliders.action'
import { useCatalogueData } from './context/CatalogueDataContext'

function App() {
  const { theme } = useTheme();
  const [showLogin, SetShowLogin] = useState(false);
  const [currentLoginState, SetCurrentLoginState] = useState("Sign up");
  const { links, loading } = useData();
  const { initialCataloguePage } = useCatalogueData();

  const dispatch = useDispatch();
  const catalogueBooksUrl = useSelector(getCatalogueBooksUrlSelector);
  const genresListUrl = useSelector(getGenresListUrlSelector);
  const popularBooksUrl = useSelector(getPopularBooksUrlSelector);
  const newBooksUrl = useSelector(getNewBooksUrlSelector);
  const filterParametersUrl = useSelector(getFilterParanetersUrlSelector);

  useEffect(() => {
    if (!loading) {
      dispatch(setLinksAction({
        newBooksUrl: links.newBooksUrl,
        popularBooksUrl: links.popularBooksUrl,
        catalogueBooksUrl: links.catalogueBooksUrl,
        genresListUrl: links.genresListUrl,
        publishersListUrl: links.publishersListUrl,
        filterParametersUrl: links.filterParametersUrl,
      }));
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      if (catalogueBooksUrl && filterParametersUrl) {
        const requests = [
          dispatch(getCatalogueThunk(catalogueBooksUrl, initialCataloguePage)),
          dispatch(getFiltersThunk(filterParametersUrl)),
          dispatch(getSlidersDataThunk(popularBooksUrl, newBooksUrl))
        ];
        try {
          await Promise.all(requests);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
  }, [catalogueBooksUrl, genresListUrl, loading, popularBooksUrl, newBooksUrl]);

  const toggleLoginPopup = () => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = showLogin ? '' : `${scrollBarWidth}px`;
    document.body.style.overflow = showLogin ? '' : 'hidden';
  };

  return (
    <div className={theme}>
      <Fragment>
        {showLogin ? <LoginPopup SetShowLogin={SetShowLogin} toggleLoginPopup={toggleLoginPopup}
          currentLoginState={currentLoginState} SetCurrentLoginState={SetCurrentLoginState} /> : <></>}
        <NavBar SetShowLogin={SetShowLogin} toggleLoginPopup={toggleLoginPopup} />
        {/* routes */}
        <MainPage />
        {/* routes */}
        <Footer SetShowLogin={SetShowLogin} toggleLoginPopup={toggleLoginPopup}
          currentLoginState={currentLoginState} SetCurrentLoginState={SetCurrentLoginState} />
      </Fragment>
    </div>
  )
}

export default App
