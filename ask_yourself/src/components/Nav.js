import React, { Component } from 'react';

class Nav extends Component{
    render() {
      console.log('Nav render');
      return (
        <header className="flex-container">
            <div className="Ask-for-Question"><a href="/" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}>Ask for Question</a></div>
            <div className="nav">
              <a href="/">나의 테스트</a>
            </div>
            <div className="nav">
              <a href="group.html">나의 그룹</a>
            </div>
            <div className="nav">
              <a href="/">찾아보기</a>
            </div>
        </header>
      );
    }
  }

export default Nav;