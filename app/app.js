import React from 'react';
import ReactDOM from 'react-dom';

const StartFrame = React.createClass({
    render() {
        var numberOfStars = this.props.numberOfStars;
        var stars = [];
        for (var i = 0; i < numberOfStars; i++) {
            stars.push(<span key={i} className="glyphicon glyphicon-star"></span>);
        }
        return (
            <div id="stars-frame" className="col-md-5">
                <div className="well">
                    {stars}
                </div>

            </div>
        );
    }
});
const ButtonFrame = React.createClass({
    render() {
        var seletedNumber = this.props.selectedNumbers.length==0;
        var correct = this.props.correct,button;
        switch(correct){
            case true:
                button = <button onClick={this.props.currentAnswerNumber} className="btn btn-success"><span className="glyphicon glyphicon-ok"></span></button>;
                break;
            case false:
                button = <button className="btn btn-danger"><span className="glyphicon glyphicon-remove"></span></button>;
                break;
            default:
                button = <button className="btn btn-info" onClick={this.props.clicks} disabled={seletedNumber}>=</button>

        }
        return (
            <div id="button-frame" className="col-md-2">
                {button}
                <br/><br/>
                <button className="btn btn-warning" disabled={this.props.redraws===0} onClick={this.props.refreshState}><span className="glyphicon glyphicon-refresh"></span> {this.props.redraws}</button>
            </div>
        );
    }
});

const AnswerFrame = React.createClass({
    removeNumber(e){
        this.props.removeNumber(e);
    },
    render() {
        var numberOutput = this.props.selectedNumbers.map(function (aNumber) {
            return <span onClick={this.removeNumber.bind(null,aNumber)}>{aNumber}</span>
        }.bind(this));

        return (
            <div id="answer-frame" className="col-md-5">
                <div className="well">
                    {numberOutput}
                </div>
            </div>
        );
    }
});
const NumberFrame = React.createClass({
    clickNumber(e){
        this.props.clickNumber(e);
    },
    render() {
        var numbers = [],className,usedIt,
            selectedNumbers = this.props.selectedNumbers,
            usedNumber = this.props.usedNumber;
        for(var i=1;i<=9;i++){
            className = "number selected-"+ (selectedNumbers.indexOf(i)>=0);
            usedIt = "usednumber-"+ (usedNumber.indexOf(i)>=0);
            numbers.push(<div onClick={this.clickNumber.bind(null,i)} className={className +" "+ usedIt}>{i}</div>);

        }
        return (
            <div id="number-frame" className="col-md-12">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
});
const Game = React.createClass({
    getInitialState() {
      return {
        selectedNumbers: [],
        numberOfStars: Math.floor(Math.random() * 9) + 1,
          correct: null,
          usedNumber:[],
          redraws: 5
      };
    },
    clickNumber(clicked){
        if(this.state.selectedNumbers.indexOf(clicked)===-1 && this.state.usedNumber.indexOf(clicked)===-1){
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(clicked),
                correct: null
            });
        }


    },
    removeNumber(clicked){
        var selectedNumber = this.state.selectedNumbers;
        var index = selectedNumber.indexOf(clicked);
        selectedNumber.splice(index, 1);
        this.setState({
            selectedNumbers: selectedNumber,
            correct: null
        });
    },
    sumSelected(){

      return  this.state.selectedNumbers.reduce(function (total, num) {
            return total + num;
        },0);
    },
    checkAnswer(){
        console.log(this.sumSelected());
      var correct =  this.state.numberOfStars ===this.sumSelected();
        this.setState({
            correct: correct
        });
    },
    currentAnswerNumber(){
        this.setState({
            usedNumber: this.state.usedNumber.concat(this.state.selectedNumbers),
            selectedNumbers:[],
            correct: null,
            numberOfStars: Math.floor(Math.random() * 9) + 1
        });

    },
    refreshState(){
        if(this.state.redraws>0){
            this.setState({
                selectedNumbers:[],
                correct: null,
                numberOfStars: Math.floor(Math.random() * 9) + 1,
                redraws: --this.state.redraws
            });
        }


    },
    
    render() {
        return (
            <div>
                <h1>Game Nine</h1>
                <hr/>
                <div className="row">
                    <StartFrame numberOfStars={this.state.numberOfStars}/>
                    <ButtonFrame redraws={this.state.redraws} refreshState={this.refreshState} currentAnswerNumber={this.currentAnswerNumber} correct={this.state.correct} clicks={this.checkAnswer} selectedNumbers={this.state.selectedNumbers}/>
                    <AnswerFrame  removeNumber={this.removeNumber} selectedNumbers={this.state.selectedNumbers} />
                    <NumberFrame usedNumber={this.state.usedNumber} selectedNumbers={this.state.selectedNumbers}
                            clickNumber={this.clickNumber}/>
                </div>
            </div>
        );
    }
});


ReactDOM.render(<Game/>, document.querySelector('.container'));