import React, { useState, useEffect } from 'react';

const Login = () => {
    const generateOauth = () => {
        fetch(`https://github.com/login/oauth/authorize?client_id=fc0fa86c782526ec039c&client_secret=a4ec68c44ce2fd35b2943803991195725c5eb5ae`)
            .then(resp => window.open(resp.url, "_blank"))
    }


    // 5ede1149895f1cd37f37cc7f71cac2a89c51070d
    return (
        <React.Fragment>
            <button onClick={e => generateOauth()} > Login to Github </button>
        </React.Fragment>
    )
}

export default Login;