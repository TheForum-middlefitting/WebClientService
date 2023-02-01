import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../../../store/context/auth-context";
import {useContext, useEffect, useState} from "react";

export default function HeaderForm() {
    const location = useLocation();
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState<boolean>(!!localStorage.getItem('authorization'));

    useEffect(() => {
        setIsLogin(authCtx.isLoggedIn)
    }, [authCtx.isLoggedIn])

    const toLoginPage = () => {
        navigate('/auth', {
            state: {
                returnUrl: location.pathname
            }
        });
    }

    const toSignUpPage = () => {
        navigate("/sign-up")
    }

    const toHomePage = () => {
        navigate("/home")
    }

    const toMyPage = () => {
        navigate("/my-page")
    }

    const toBoardPage = () => {
        navigate("/board")
    }

    const loginForm = <button type="button" className="btn btn-outline-light me-2" onClick={toLoginPage}>Login</button>;
    const logoutForm = <button type="button" className="btn btn-outline-light me-2"
                               onClick={authCtx.logout}>Logout</button>;
    const signUpForm = <button type="button" className="btn btn-warning" onClick={toSignUpPage}>Sign-up</button>;
    const myPageForm = <button type="button" className="btn btn-warning" onClick={toMyPage}>My-page</button>

    return (
        <>
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                                <use xlinkHref="#bootstrap"></use>
                            </svg>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a role={"button"} className="nav-link px-2 text-secondary"
                                   onClick={toHomePage}>Home</a></li>
                            <li><a role={"button"} className="nav-link px-2 text-white" onClick={toBoardPage}>Board</a>
                            </li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control form-control-dark text-bg-dark"
                                   placeholder="Search..."
                                   aria-label="Search"/>
                        </form>
                        <div className="text-end">
                            {isLogin ? logoutForm : loginForm}
                            {isLogin ? myPageForm : signUpForm}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
