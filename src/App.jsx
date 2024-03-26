import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import LogIn from './Components/LogIn/LogIn';
import {UserProvider} from './Store/user-context';
import Dashboard from "./Components/Account/Dashboard";
import Account from "./Components/Account/Account";
import ResponsiveAppBarWrapper from "./Containers/ResponsiveAppBarWrapper";
import AuthorizationWrapper from './Containers/AuthorizationWrapper';
import SearchAWB from "./Components/Futures/SearchAWB";
import SendParcel from "./Components/Futures/SendParcel";
import Users from "./Components/Admin/Users";
import React from "react";
import Parcels from "./Components/Admin/Parcels";
import NewUserForm from "./Components/Admin/NewUserForm";
import UpdateUserForm from "./Components/Admin/UpdateUserForm";
import Transports from "./Components/Admin/Transports";
import Hubs from "./Components/Admin/Hubs";
import NewHubForm from "./Components/Admin/NewHubForm";
import Vehicles from "./Components/Admin/Vehicles";

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
                    <Route path="/dashboard/account/"
                           element={
                                 <AuthorizationWrapper allowedPermissionLevels={['admin', 'sender', 'viewOnly']}>
                                      <ResponsiveAppBarWrapper>
                                        <Account/>
                                      </ResponsiveAppBarWrapper>
                                    </AuthorizationWrapper>
                               }/>
                    <Route path="/dashboard/search_awb/"
                            element={
                                 <AuthorizationWrapper allowedPermissionLevels={['admin', 'sender', 'viewOnly']}>
                                      <ResponsiveAppBarWrapper>
                                        <SearchAWB/>
                                      </ResponsiveAppBarWrapper>
                                 </AuthorizationWrapper>}/>
                    <Route path="/dashboard/send_parcel/"
                           element={
                                    <AuthorizationWrapper allowedPermissionLevels={['admin', 'sender']}>
                                        <ResponsiveAppBarWrapper>
                                            <SendParcel/>
                                        </ResponsiveAppBarWrapper>
                                    </AuthorizationWrapper>}/>
                    <Route path="dashboard/manage_users"
                            element={
                                        <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                         <ResponsiveAppBarWrapper>
                                              <Users/>
                                         </ResponsiveAppBarWrapper>
                                        </AuthorizationWrapper>}/>
                    <Route path="dashboard/manage_users/add"
                           element={
                               <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                   <ResponsiveAppBarWrapper>
                                       <NewUserForm/>
                                   </ResponsiveAppBarWrapper>
                               </AuthorizationWrapper>}/>
                    <Route path="dashboard/manage_users/update/:id"
                           element={
                               <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                   <ResponsiveAppBarWrapper>
                                       <UpdateUserForm/>
                                   </ResponsiveAppBarWrapper>
                               </AuthorizationWrapper>}/>
                    <Route path="dashboard/manage_parcels"
                           element={
                               <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                   <ResponsiveAppBarWrapper>
                                       <Parcels/>
                                   </ResponsiveAppBarWrapper>
                               </AuthorizationWrapper>}/>

                    <Route path="dashboard/manage_transports"
                            element={
                                        <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                         <ResponsiveAppBarWrapper>
                                              <Transports/>
                                         </ResponsiveAppBarWrapper>
                                        </AuthorizationWrapper>}/>
                    <Route path="dashboard/manage_hubs"
                           element={
                               <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                   <ResponsiveAppBarWrapper>
                                       <Hubs/>
                                   </ResponsiveAppBarWrapper>
                               </AuthorizationWrapper>}/>
                    <Route path="/dashboard/manage_hubs/add"
                            element={
                                 <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                      <ResponsiveAppBarWrapper>
                                        <NewHubForm/>
                                      </ResponsiveAppBarWrapper>
                                 </AuthorizationWrapper>}/>
                    <Route path="/dashboard/manage_hubs/update/:id"
                           element={
                               <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                   <ResponsiveAppBarWrapper>
                                       <NewHubForm/>
                                   </ResponsiveAppBarWrapper>
                               </AuthorizationWrapper>}/>
                    <Route path="/dashboard/manage_vehicles"
                            element={
                                <AuthorizationWrapper allowedPermissionLevels={['admin']}>
                                    <ResponsiveAppBarWrapper>
                                        <Vehicles/>
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
