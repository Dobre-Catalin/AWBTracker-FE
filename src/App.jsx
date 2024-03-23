import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn';
import {UserProvider} from './Store/user-context';
import Dashboard from "./Components/Account/Dashboard";
import Account from "./Components/Account/Account";
import ResponsiveAppBarWrapper from "./Containers/ResponsiveAppBarWrapper";
import AuthorizationWrapper from './Containers/AuthorizationWrapper';

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/index" element={<LogIn/>}/>
                    <Route path="/dashboard" element={
                        <AuthorizationWrapper allowedPermissionLevels={['viewOnly', 'admin', 'sender']}>
                            <ResponsiveAppBarWrapper>
                                <Dashboard/>
                            </ResponsiveAppBarWrapper>
                        </AuthorizationWrapper>}/>
                    <Route path="/dashboard/account"
                           element={
                               <AuthorizationWrapper allowedPermissionLevels={['admin', 'sender']}>
                                   <ResponsiveAppBarWrapper>
                                       <Account/>
                                   </ResponsiveAppBarWrapper>
                               </AuthorizationWrapper>}/>
                    <Route path="/" element={<Navigate to={'/index'} />}/>
                    <Route path="*" element={<AuthorizationWrapper allowedPermissionLevels={[]}/>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
