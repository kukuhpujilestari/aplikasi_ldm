import React from 'react';

const HeaderBody = ({data}) => {
    return (
        <>
            <h1 className="mt-4">Management {data.title}</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">Management Data {data.title}</li>
            </ol>
            {/* <div className="card mb-4">
                <div className="card-body">
                    <p className="mb-0">
                        Berikut merupakan data {data.title} aplikasi App-LDM
                    </p>
                </div>
            </div> */}
        </>
    )
}

export default HeaderBody;