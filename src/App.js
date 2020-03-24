import React from 'react';

import Container from '@material-ui/core/Container';

import Stats from './components/Stats/Stats';
import BusinesTable from './components/Business/BusinessTable';
import Managers from './components/Managers/Managers';

const App = () => {
    return (
        <>
                <Stats />
                <BusinesTable />
                {/* <Managers /> */}
        </>
    )
}

export default App;
