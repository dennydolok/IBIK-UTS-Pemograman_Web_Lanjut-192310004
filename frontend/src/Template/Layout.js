import React, { Component } from 'react'
import './template.css';

export default class Layout extends Component {
    render() {
        return (
         <div>
             <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="/">Dashboard</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
            </header>

            <main role="main" className="container">
            <h1 className="mt-5 pt-5">Temporary Dashboard</h1>
            <p className="lead">Nama : Denny Dolok Partala</p>
            <p className="lead">NPM : 192310004 </p>
            </main>

         </div>
        );
    }
}
