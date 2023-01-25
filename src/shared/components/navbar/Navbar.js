import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import NavFavLeagues from './NavFavLeagues'
import NavCountries from './NavCountries'

const Navbar = ({ data, isActiveHandler }) => {
    const navigation = useNavigate()
    const [nationsPagination, setNationsPagination] = React.useState(1)
    const [repos, setRepos] = React.useState(() => {
        return __isBrowser__
            ? window.__INITIAL_NATIONS_DATA__
            : data.nationsData
    })
    const [loading, setLoading] = React.useState(repos ? false : true)
    const [favourites, setFavourites] = React.useState(() => {
        return __isBrowser__
            ? localStorage.favourites
                ? JSON.parse(localStorage.favourites)
                : localStorage.setItem('favourites', JSON.stringify({
                    favLeagues: [
                        {
                            id: '19686',
                            name: 'Superliga',
                            imgPath: 'https://cdn.sportmonks.com/images/countries/png/short/dk.png'
                        },
                        {
                            id: '19735',
                            name: 'Premiership',
                            imgPath: 'https://cdn.sportmonks.com/images/countries/png/short/scotland.png'
                        }
                    ],
                    favClubs: []
                }))
            : { favLeagues: [], favClubs: [] }
    })

    React.useEffect(async () => {
        if (!repos) {
            setLoading(true)
            const response = await fetch(`/fetchNationsData/${nationsPagination}`);
            const newRepos = await response.json()
            if (!response.ok) {
                navigation('/something-went-wrong', { replace: true, state: newRepos })
            } else {
                setRepos(newRepos)
                setNationsPagination((prevState) => {
                    return (prevState + 1)
                })
                setLoading(false)
            }
        }
        if (!favourites) {
            setFavourites(JSON.parse(localStorage.favourites))
        }
    }, [nationsPagination])

    const favLeagueHandler = async (event) => {
        const { id, title: name, slot: imgPath } = event.target
        const foundLeague = favourites.favLeagues.find(e => e.id === id) || null
        if (foundLeague) {
            const localStorFav = JSON.parse(localStorage.favourites)
            localStorage.setItem('favourites', JSON.stringify({
                favClubs: localStorFav.favClubs,
                favLeagues: localStorFav.favLeagues.filter(e => e.id !== foundLeague.id)
            }))
            setFavourites((prevState) => {
                return {
                    favClubs: prevState.favClubs,
                    favLeagues: prevState.favLeagues.filter(e => e.id !== foundLeague.id)
                }
            })
        }
        else {
            const localStorFav = JSON.parse(localStorage.favourites)
            localStorage.setItem('favourites', JSON.stringify({
                favClubs: localStorFav.favClubs,
                favLeagues: [...localStorFav.favLeagues, { id, name, imgPath }]
            }))
            setFavourites((prevState) => {
                return {
                    favClubs: prevState.favClubs,
                    favLeagues: [...prevState.favLeagues, { id, name, imgPath }]
                }
            })
        }
    }

    return (
        loading
            ? <div className="lds-dual-ring-nav"></div>
            : <div className="navbar">
                <NavFavLeagues favourites={favourites} favLeagueHandler={favLeagueHandler}
                    isActiveHandler={isActiveHandler} />
                <NavCountries repos={repos} favourites={favourites} favLeagueHandler={favLeagueHandler}
                    isActiveHandler={isActiveHandler} />
            </div>
    )
}

export default Navbar