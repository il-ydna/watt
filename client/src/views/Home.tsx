import React, {useContext, useState} from 'react';
import moment from 'moment-timezone';
import {Moment} from 'moment';

// Components
//import Clock from './schedule/Clock.js'; // Date handling has been passed down to Home.js, retiring this
import DateSelector from '../components/schedule/DateSelector';
import Periods from '../components/schedule/Periods';
import DayAlert from '../components/schedule/DayAlert';
import WIP from '../components/misc/WIP';

// Hooks
import {useScreenType} from '../hooks/useScreenType';

// Contexts
import CurrentTimeContext from '../contexts/CurrentTimeContext';
import UserDataContext from '../contexts/UserDataContext';


const Home = () => {
    // Date variables
    // Here, date is the current time of the user (passed in from outer scope), used for things that should not be
    // normalized to PST (like the clock), while viewDate is the current day but converted to PST for things that should be normalized;
    // viewDate is crucially used for calculations on period start times, etc.
    const date = useContext(CurrentTimeContext);
    const viewDateCurr = date.clone().tz('America/Los_Angeles').startOf('date');
    const [viewDate, setViewDate] = useState(viewDateCurr);

    // Functions for manipulating viewDate
    // It is necessary to clone viewDate before changing it because moment objects are mutable and
    // will cause an infinite cascade of rerenders without clone
    const incDay = () => setViewDate(viewDate.clone().add(1, 'days'));
    const decDay = () => setViewDate(viewDate.clone().subtract(1, 'days'));
    const jumpToPres = () => setViewDate(viewDateCurr.clone());
    const setViewDateFromJSDate = (d: Date) => setViewDate(moment(d));

    // Relative days for the day alert
    // viewDate here is compared to viewDateCurr instead of simply date because date still possesses minutes and seconds,
    // which may disrupt the comparison in undesirable ways
    let relDays = viewDate.diff(viewDateCurr, 'days');

    // Screen type for responsive design
    const screenType = useScreenType();
    const displayFromScreenType = (screenType: 'desktop' | 'tablet' | 'smallScreen' | 'phone') => {
        if (screenType === 'desktop' || screenType === 'tablet') return 'two-col';
        return 'one-col';
    }

    // User data for preferred time display
    const userData = useContext(UserDataContext);
    const format = userData?.options.time === '24' ? 'H:mm:ss' : 'h:mm:ss A';


    return (
        <div className={`home ${displayFromScreenType(screenType)}`}>
            <div id="red-bg" />

            {/* Schedule */}
            <div className="schedule">
                {relDays !== 0 && <DayAlert jumpToPres={jumpToPres} daysRelToCur={relDays}/>}

                <h2 className="center">{date.format(format)}</h2>
                <DateSelector
                    incDay={incDay}
                    decDay={decDay}
                    viewDate={viewDate}
                    setViewDate={setViewDateFromJSDate}
                />
                <h1 className="schedule-dayname">{viewDate.format('dddd')}</h1>
                <h2 className="schedule-date">{viewDate.format('MMMM Do, YYYY')}</h2>

                {/* <CSSTransition> */}
                <div className="schedule-wrapper">
                    <Periods viewDate={viewDate} />
                </div>
                {/* </CSSTransition> */}

                <div id="weekwrapper"></div>
            </div>

            {/* Events */}
            <div className="events">
                <h2>Events</h2>
                <WIP />
            </div>
        </div>

    );
}

export default Home;
