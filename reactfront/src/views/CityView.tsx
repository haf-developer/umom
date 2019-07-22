import * as React from 'react';

const CityView=({ location=[0, 0] }: { location?: number[] }) => {
    const testnumber: number=5; 

    return(
        <div className="CityView">
        City at {location[0] + ", " + location[1] }
        <br />
        Value of test is {testnumber}
        </div>
    );
};

export default CityView;