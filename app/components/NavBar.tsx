
import {Link} from 'react-router'
const NavBar= () => {
    return(
            <nav className="navbar">
                <Link to="/">
                    <p className="text-2xl font-semibold text-gradient">RESUMEMIND</p>
                </Link>
                <Link to="/upload"className="primary-button w-fit">
                    Upload Your Resume
                </Link>
            </nav>
    )
}
export default NavBar;