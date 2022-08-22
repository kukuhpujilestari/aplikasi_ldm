import React from 'react';

const NotFound = () => {
    return(
        <main>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="text-center mt-4">
                            <img alt="404" className="mb-4 img-error" src="assets/img/error-404-monochrome.svg" />
                            <p className="lead">This requested URL was not found on this server.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default NotFound;