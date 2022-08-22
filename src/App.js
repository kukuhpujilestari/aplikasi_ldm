import React from "react";
import { Router, BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import history from './history';

import Login from "./pages/Login";
import Body2 from "./thames/body2";
import Footer from "./thames/footer";
import Navbar from "./thames/navbar";
import Sidenav from "./thames/sidenav";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import NotFound from "./pages/404";
import EditUser from "./pages/EditUser";
import IndexProducts from "./pages/products/IndexProducts";
import IndexCategories from "./pages/categories/IndexCategories";
import IndexJob from "./pages/jobs/indexJob";
import createJob from "./pages/jobs/createJob";
import EditJob from "./pages/jobs/editJob";
import IndexReport from "./pages/report/IndexReport";
import DetailReport from "./pages/report/detailReport";
import UploadImageJob from "./pages/jobs/uploadImageJob";

const App = ({auth}) => {
    if(auth.isAuthenticated){
        return (
            <Router history={history}>
                    <>
                        <Navbar/>
                        <div id="layoutSidenav">
                            <Sidenav/>
                            <div id="layoutSidenav_content">
                                <Switch>
                                    <Route exact path='/' component={auth.role === 'Admin' || auth.role === 'Super-Visor' ? Dashboard : auth.role === 'QC' ? IndexCategories : IndexJob } />
                                    <Route path='/users/' component={Users} />
                                    <Route exact path='/add-user/' component={CreateUser} />
                                    <Route path='/edit-user/:id' exact component={EditUser} />
                                    <Route path='/products' exact component={IndexProducts}/>
                                    <Route path='/categories' exact component={IndexCategories}/>
                                    <Route path='/jobs' exact component={IndexJob}/>
                                    <Route path='/add-job' exact component={createJob}/>
                                    <Route path='/edit-job/:id' exact component={EditJob}/>
                                    <Route path='/reports' exact component={IndexReport}/>
                                    <Route path='/reports/detail/:id' exact component={DetailReport}/>
                                    <Route path='/upload-job/:id' exact component={UploadImageJob}/>
                                    <Route exact path='/login/' component={Login} />
                                    <Route exact path='/dashboard/' component={Dashboard}/>
                                    <Route exact path='/nav/' component={Body2} />
                                    <Route path="*" component={NotFound} />
                                </Switch>
                                <Footer/>
                            </div>
                        </div>
                    </>
            </Router>
            )
    }else{
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, null)(App);