import { ReactComponent as Logo } from '../assets/new-point-logo.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <Logo className="logo" />
            </div>
        </header>
    );
};

export default Header;