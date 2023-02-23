import "./fonts/icomoon/style.css"
import "./css/bootstrap.min.css"
import "./css/style.css"
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
    return (
    <footer className="footer-20192 mt-auto">
        <div className="site-section">
            <div className="container">
                {/*<div className="cta d-block d-md-flex align-items-center px-5">*/}
                {/*    <div>*/}
                {/*        <h2 className="mb-0">Ready for a next project?</h2>*/}
                {/*        <h3 className="text-dark">Let's get started!</h3>*/}
                {/*    </div>*/}
                {/*    <div className="ml-auto">*/}
                {/*        <a href="#" className="btn btn-dark rounded-0 py-3 px-5">Contact us</a>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="row">

                    <div className="col-sm">
                        <a href="#" className="footer-logo">THEFORUM</a>
                        <p className="copyright">
                            <small>&copy; 2023</small>
                        </p>
                    </div>
                    <div className="col-sm">
                        <h3>Developer</h3>
                        <ul className="list-unstyled links">
                            <li><a href="https://github.com/middlefitting">Middlefitting</a></li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <h3>Further Information</h3>
                        <ul className="list-unstyled links">
                            <li><a href="https://github.com/TheForum-middlefitting">Overview</a></li>
                            {/*<li><a href="#">Privacy Policy</a></li>*/}
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h3>Contact us</h3>
                        <ul className="list-unstyled social">
                            <li><a href="https://github.com/middlefitting"><span className="icon-github"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
}
