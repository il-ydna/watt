import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import moment from 'moment';

// Components
import Layout from './components/Layout';
import Home from './views/Home';
import Utilities from './views/Utilities';
import Classes from './views/Classes';
import Clubs from "./views/Clubs";
import Settings from './views/Settings';
import Testing from './views/Testing';
import PageNotFound from './views/404';
import SgyAuthRedirect from './views/SgyAuthRedirect';

// Context
import {UserData, UserDataProvider} from './contexts/UserDataContext';
import {TimeProvider} from './contexts/CurrentTimeContext';

// Firestore
import firebase from './firebase/Firebase';
import {useCollection, useDocument} from 'react-firebase-hooks/firestore';


const App = () => {
    // Global datetime
    const [date, setDate] = useState(moment());

    // Set interval on mount to update datetime every second
    useEffect(() => {
        const update = () => setDate(moment());
        const timerID = setInterval(
            () => update(),
            1000
        );

        // Clear interval on unmount
        return function cleanup() {
            clearInterval(timerID);
        }
    }, [])

    // Firestore data
    const firestore = firebase.firestore;
    const auth = firebase.auth;

    const [gunnData, gdLoading, gdError] = useCollection(firestore.collection('gunn'));
    const [userData, udLoading, udError] = useDocument(firestore.doc(`users/${auth.currentUser?.uid}`));

    return (
        <Router>
            <UserDataProvider value={userData?.data() as UserData}>
                <TimeProvider value={date}>
                    <Layout>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/utilities' component={Utilities}/>
                            <Route path='/classes' component={Classes}/>
                            <Route path='/clubs' component={Clubs}/>
                            <Route path='/settings' component={Settings}/>
                            <Route path='/super-secret-testing' component={Testing} />
                            <Route path='/schoology/auth' component={SgyAuthRedirect} />
                            <Route component={PageNotFound}/>
                            {/* gunnData && console.log(gunnData.docs.map(x => x.data())) */}
                            {/* gunnData && gunnData.forEach(e => console.log(e.data())) */}
                            {/* userData && console.log(userData.data()) */}
                        </Switch>
                    </Layout>
                </TimeProvider>
            </UserDataProvider>
        </Router>
    );
}

export default App;
