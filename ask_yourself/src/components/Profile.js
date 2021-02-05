import React, { Component } from 'react';

class Profile extends Component{
  render() {
    return (
      <div className="profile">
        <div className="profile-box">
          <img className="profile-image" src={this.props.user.imgURL}/>
        </div>
        <h2 className="user-id"> {this.props.user.userid} </h2>
        <div className="user-bar"></div>
        <div className="user_status">
          <div className="flex">
            <h6 className="mytest-all">완료한 테스트        <br /><br /><br />
                진행중인 테스트         </h6>
            <h6 className="mytest-all-num" >     {this.props.user.solved}  <br/><br /><br />
                   {this.props.user.notsolved}</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;