import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import MainHeaderBar from "../layout/MainHeaderBar";
import EventsBoardContainer from "../eventsBoard/EvenstBoardContainer";
import LoginContainer from "../login/LoginContainer";

class HomePage extends Component {
  render() {
    if (this.props.logged) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <MainLayout>
          <div className="row">
            <div>
              <h2>ATENÇÃO</h2>
              <p>
                Para o Seminário do ano de 2025 o SIGEVA mudou, estamos agora na
                URL <a href="https://sigeva.com.br">sigeva.com.br</a>, faça o
                login lá para se inscrever no 27 Seminário do CCSA, para todas
                as informações referentes ao seminário atual por favor checar{" "}
                <a href="https://seminario.ccsa.ufrn.br">
                  seminario.ccsa.ufrn.br
                </a>
              </p>
            </div>
            <div className="col-md-8">
              <EventsBoardContainer />
            </div>
            <div className="col-md-4">
              <LoginContainer />
            </div>
          </div>
        </MainLayout>
      );
    }
  }
}

export default HomePage;
