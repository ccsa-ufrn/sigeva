import React, { Component } from 'react';

class AreasTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h5><strong>Áreas cadastradas</strong></h5>
        <table className='table'>
          <thead>
            <tr>
              <th>Nome da área</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.areas !== null &&
              this.props.areas.sort((a, b) => a.name.localeCompare(b.name)).map((area) => {
                return (
                  <tr key={area._id}>
                    <td>{area.name}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

class ManageThematicGroupsAreas extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadThematicGroupsAreasAreas();
  }

  render() {
    return <AreasTable areas={this.props.thematicGroupsAreas.areas} />;
  }
}

export default ManageThematicGroupsAreas;
