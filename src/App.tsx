import React, {Suspense} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import HeaderForm from "./components/layout/header/HeaderForm";
import AuthPage from "./pages/AuthPage";
import SignUpPage from "./pages/SIgnUpPage";
import Board from "./pages/board/Board";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container, ThemeProvider} from "react-bootstrap";
import BoardInfo from "./pages/board/board-info/BoardInfo";
import NewBoard from "./pages/board/new-board/NewBoard";
import WarningModal from "./components/modal/WarningModal";
import ErrorModal from "./components/modal/ErrorModal";
import AlertModal from "./components/modal/AlertModal";
import {QueryClient, QueryClientProvider} from 'react-query'
import MyPage from "./pages/my-page/MyPage";
import LoadingSpinners from "./components/spinner/LoadingSpinner";

const queryClient = new QueryClient()

function App() {
    // @ts-ignore
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AlertModal/>
                <ErrorModal/>
                <WarningModal/>
                <ThemeProvider
                    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                    minBreakpoint="xxs"
                >
                    <header><HeaderForm/></header>
                        <Suspense fallback={<LoadingSpinners/>}>
                            <main>
                                <Container className={"mx-auto my-3"}>
                                    <Routes>
                                        <Route path="/" element={<Navigate to="/home"/>}/>
                                        <Route path="/home" element={<Home/>}/>
                                        <Route path="/auth" element={<AuthPage/>}/>
                                        <Route path="/sign-up" element={<SignUpPage/>}/>
                                        <Route path="/board" element={<Board/>}/>
                                        <Route path="/boards/info/:id" element={<BoardInfo/>}/>
                                        <Route path="/board/new" element={<NewBoard/>}/>
                                        <Route path="/my-page" element={<MyPage/>}/>
                                    </Routes>
                                </Container>
                            </main>
                        </Suspense>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
