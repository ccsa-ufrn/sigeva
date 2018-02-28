import React, { Component } from 'react';

class ListNews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className='table'>
        <tbody>
          { this.props.news !== null &&
            this.props.news.map((newItem) => {
              return (
                <tr key={newItem._id}>
                  <td>{newItem.data.title}</td>
                  <td>{newItem.data.text}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default ListNews;
