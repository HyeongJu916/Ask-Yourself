
import React, { Component } from 'react';

class TestList extends Component{
    render(){
      console.log('TestList render');
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while(i < data.length){
        lists.push(
        <li key={data[i].id} className="test">
          <a 
          href={"/content/"+data[i].id}
          data-id={data[i].id}
          onClick={function(e) {
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this)}
          >{data[i].title}</a>
        </li>)
        i = i + 1;
      }
      return (
          <div >
              <div className="flex">
                <div>
                  <h1> 나의 테스트 </h1>
                </div>
                <div>
                  <button>
                    +새로운 테스트 만들기
                  </button>
                </div>
              </div>
              <ul>
                  {lists}
              </ul>
          </div>
      );
    }
  }

  export default TestList;