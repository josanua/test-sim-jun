import { ReactComponent as Logo } from '../assets/new-point-logo.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <Logo className="logo" />
                <span className="sub-logo-text">Думай и решай свободно</span>
            </div>
        </header>
    );
};

export default Header;