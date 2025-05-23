import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation, Trans } from 'react-i18next';

const Languages = () => {
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }
    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? "Việt Nam" : "English"} id="basic-nav-dropdown" className="languages">
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Languages;