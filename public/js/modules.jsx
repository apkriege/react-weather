// should accept type of precip, accumulation, icon
// possibly could do as object
class Precip extends React.Component{
  constructor(props){
    super();
    this.props = props;
  }
  render(){
    return(
       <p>
         { this.props.precip } <br/>
         <i className={ this.props.icon.props.class }></i><br/>
         Day Total: { this.props.accum }
       </p>
    )
  }
}

// props are date and day of the week
// could do object
class Day extends React.Component{
  constructor(props){
    super();
    this.props = props;
    console.log(props)
  }
  render(){
    return(
       <h3>{ this.props.day }<br/>{ this.props.date }</h3>
    )
  }
}


//should only accept high and low temps
//could do object?
class Temp extends React.Component{
  constructor(props){
    super();
    this.props = props;
  }
  render(){
    return(
        <p>
          High: { this.props.high }<br/>
          Low: { this.props.low }
        </p>
    )
  }
}



class Single extends React.Component{
  constructor(props){
    super();
    this.state = { load: false }
  }
  componentDidMount(props){
    this.data = this.props.test;
    // console.log(this.data);
    this.setState({ load:true });
  }
  render(){
    if(this.state.load){
      return(
        <div className="single">
          <Day day={this.data.day} date={this.data.date} />
          <Temp high={this.data.high} low={this.data.low} />
          <Precip cond={this.data.conditions} icon={this.data.icon} accum={this.data.thresh}/>
        </div>
      )
    }
    else{
      return null;
    }
  }
}
