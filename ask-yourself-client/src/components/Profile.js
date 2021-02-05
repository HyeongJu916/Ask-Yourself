import React, { Component } from 'react';

class Profile extends Component{
  render() {
    return (
      <div className="profile">
        <div className="profile-box">
          <img className="profile-image" src={this.props.user.imageUrl}/>
        </div>
        <h2 className="user-id"> {this.props.user.id} </h2>
        <div className="user-bar"></div>
        <div className="user_status">
          <div className="flex">
            <h6 className="mytest-all">완료한 테스트        <br /><br />
                진행중인 테스트         </h6>
            <h6 className="mytest-all-num" >     {this.props.user.solvedCount}  <br/><br />
                   {this.props.user.unsolvedCount}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;