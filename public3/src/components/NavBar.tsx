import * as React from "react";
import { Link } from 'react-router-dom';
import * as Styles from '../styles/NavBarStyles';

// State should be which link we're on right now probably

export class NavBar extends React.Component<{},{}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <nav style={Styles.NavBarBackground} className="navbar navbar-expand-lg navbar-dark">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link style={Styles.NavBarLink} className="navbar-brand" to='/'>
                    BUcourses
                </Link>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-md-0">
                        <li className="nav-item active">
                            <Link style={Styles.NavBarLink} className="nav-link" to='/search'>Courses
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a style={Styles.NavBarLink} className="nav-link" href="#!">Link</a>
                        </li>
                        <li className="nav-item">
                            <a style={Styles.NavBarLink} className="nav-link disabled" href="#!">Disabled</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

