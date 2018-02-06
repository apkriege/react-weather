// const fetch = require('node-fetch');
//** CURRENT CLASS **//
// Builds the today weather element
class Current extends React.Component{
  constructor(){
    super();
    this.state = { loaded:false }
    this.x = {}
  }
  async componentDidMount(){
    let res = await fetch('/current');
    let data = await res.json();
    this.x = data.weather;
    console.log(this.x)

    this.setState({ loaded:true })
  }
  render(){
    return(
      <div className="current">
        <div className="inner">
          <div className="header">
            <h1>CURRENT</h1>
          </div>
          <div className="cont">
            <div className="top">
              <span className="town">{this.x.name}</span>
              <span className="temp">{this.x.temp}°</span>
              <span className="sun">
                <span className="sunrise"><i className="wi wi-sunrise"></i> {this.x.sunrise}</span>
                <span className="sunset"><i className="wi wi-sunset"></i> {this.x.sunset}</span>
              </span>
            </div>
            <div className="bottom">
              <span className="vis">
                <p><i className="fa fa-binoculars"></i></p><br/>
                <b>Visibility</b><br/>
                { this.x.visibility } Miles
              </span>
              <span className="cond">
                <p><i className="wi wi-day-sunny"></i></p><br/>
                <b>Conditions</b><br/>
                { this.x.weather }
              </span>
              <span className="wind">
                <p><i className="wi wi-wind from-220-deg"></i></p><br/>
                <b>Wind</b>
                <br/>{ this.x.winddir } { this.x.windspeed } MPH
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//** HOURLY CLASS **//
// Builds the today weather element
class Hourly extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div className="hourly">
      <h1> Hourly </h1>
      </div>
    )
  }
}

class Day extends React.Component{
  constructor(props){
    super();
    // console.log(props.data);
    this.x = props.data;
  }
  render(){
    return(
      <div className="single">
        <div className="high">{ this.x.high }°</div>
        <div className="low">{ this.x.low }°</div>
        <div className="cond">{ this.x.conditions }</div>
        <div className="icon"><i className={'' + this.x.icon}></i></div>
        <div className="date">{ this.x.day } <br/>{ this.x.date }</div>
      </div>
    )
  }
}

//** CURRENT CLASS **//
// Builds the today weather element
class FiveDay extends React.Component{
  constructor(){
    super();
    this.state = { loaded: false };
    this.data = [];
    this.test = this.test.bind(this);
  }
  async componentDidMount(){
    let res = await fetch('/fiveday');
    let data = await res.json();
    console.log(data);
    this.data = data.rest;
    // console.log(this.data)

    this.setState({ loaded:true })
  }
  test(day){
    //TODO WORK ON THIS PART AFTER CLICK FOR MORE INFORMATION
    console.log(this.data[day])
  }
  render(){
    if(this.state.loaded){
      return (
        <div className="fiveday">
          <div className="inner">
            <div className="header">
              <h1>Five Day</h1>
            </div>
            <div className="more">
            </div>
            <div className="days">
              <a onClick={ this.test.bind(this, 0) }><Day data={this.data[0]}/></a>
              <a onClick={ this.test.bind(this, 1) }><Day data={this.data[1]}/></a>
              <a onClick={ this.test.bind(this, 2) }><Day data={this.data[2]}/></a>
              <a onClick={ this.test.bind(this, 3) }><Day data={this.data[3]}/></a>
              <a onClick={ this.test.bind(this, 4) }><Day data={this.data[4]}/></a>
            </div>
          </div>
        </div>
      );
    }
    else{
      // return (<div>Waiting</div>);
      return( null );
    }
  }
}

//** APP CLASS **//
//
class App extends React.Component{
  constructor(){
    super();
    // this.state = { page: 'five' }
    this.state = { page: 'current' }
    this.changePage = this.changePage.bind(this);
  }
  changePage(page){
    // console.log(page);
    this.setState({ page:page });
  }
  render(){
    let x;
    if(this.state.page == 'current'){ x = <Current /> }
    if(this.state.page == 'hour'){ x = <Hourly /> }
    if(this.state.page == 'five'){ x = <FiveDay /> }

    // console.log(x);
    return (
      <div className="main">
        <div className="sidebar">
          <h1><i className="fa fa-cloud fa-5x"></i><br/>Weather</h1>
          <a herf="" onClick={ this.changePage.bind(this,'current') }><h2>Current Forecast</h2></a>
          {/*<a herf="" onClick={ this.changePage.bind(this,'hour') }><h2>Hourly Forecast</h2></a>*/}
          <a herf="" onClick={ this.changePage.bind(this,'five') }><h2>5 Day Forecast</h2></a>
        </div>
        <div className="content">
        { x }
        </div>
      </div>
    )
  }
}


// ReactDOM.render(<Test/>, testdiv);
ReactDOM.render(<App/>, app);
