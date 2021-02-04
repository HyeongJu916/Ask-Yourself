import React, { Component } from 'react';

class Profile extends Component{
    render() {
      console.log('Profile render');
      return (
        <div className="profile">
            <div className="profile-box">
                <img className="profile-image" src={this.props.profimg}/>
            </div>
            <h2> User </h2>
            <div className="user_status">
                <h6 text-align="middle">완료한 테스트  
                진행중인 테스트</h6>
            </div>
        </div>
      );
    }
  }

export default Profile;