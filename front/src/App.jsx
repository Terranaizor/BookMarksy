import { Fragment, useEffect, useState } from 'react'
import MainPage from './pages/MainPage'
import { NavBar, Footer, LoginPopup } from './components/'
import { useTheme } from './context/ThemeContext'
import { useData } from './context/DataContext'
import { useDispatch, useSelector } from 'react-redux'
import { setLinksAction } from './store/actions/links.action'
import { getCatalogueThunk } from './store/actions/catalogue.action'
import { getCatalogueBooksUrlSelector } from './store/reducers/links.reducer'

function App() {
  const { theme } = useTheme();
  const [showLogin, SetShowLogin] = useState(false);
  const [currentLoginState, SetCurrentLoginState] = useState("Sign up");
  const { links, loading, initialCataloguePage } = useData();

  const dispatch = useDispatch();
  const catalogueBooksUrl = useSelector(getCatalogueBooksUrlSelector);

  useEffect(() => {
    if (!loading) {
      dispatch(setLinksAction({
        newBooksUrl: links.newBooksUrl,
        popularBooksUrl: links.popularBooksUrl,
        catalogueBooksUrl: links.catalogueBooksUrl,
        genresListUrl: links.genresListUrl,
        publishersListUrl: links.publishersListUrl
      }));
      if (catalogueBooksUrl) { dispatch(getCatalogueThunk(catalogueBooksUrl, initialCataloguePage)); }
    }
  }, [links, catalogueBooksUrl])

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
        <MainPage />
        <Footer SetShowLogin={SetShowLogin} toggleLoginPopup={toggleLoginPopup}
          currentLoginState={currentLoginState} SetCurrentLoginState={SetCurrentLoginState} />
      </Fragment>
    </div>
  )
}

export default App
