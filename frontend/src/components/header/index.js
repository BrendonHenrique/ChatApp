import React,{Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import chatLogo from '../../static/emoticon-chat.png';
import './style.css';


export default class Header extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" 
        className="header-style"
        style={{boxShadow:'0px 2px 4px 10px rgba(0,0,0,0.2), 0px 4px 5px 17px rgba(0,0,0,0.14), 0px 1px 10px 10px rgba(0,0,0,0.12)',
         height: '5.5rem'}}>
          <Toolbar style={{marginTop:4}}>
            <Fab color="primary" style={{height: '5rem',width: '5rem',paddingRight: '7px', paddingTop:'3px'}}
            onClick={this.props.handlerOpen} >
              <div style={{ height: 60, width:  60, backgroundImage:`url(${chatLogo})`, 
                backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
              </div>
            </Fab>
            <Typography variant="h6" style={{flexGrow: 1, textAlign: 'center'}}>
              <span className="headerFont">
                Chat App
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}