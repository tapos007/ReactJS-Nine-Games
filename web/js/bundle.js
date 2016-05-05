(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartFrame = _react2.default.createClass({
    displayName: 'StartFrame',
    render: function render() {
        var numberOfStars = this.props.numberOfStars;
        var stars = [];
        for (var i = 0; i < numberOfStars; i++) {
            stars.push(_react2.default.createElement('span', { key: i, className: 'glyphicon glyphicon-star' }));
        }
        return _react2.default.createElement(
            'div',
            { id: 'stars-frame', className: 'col-md-5' },
            _react2.default.createElement(
                'div',
                { className: 'well' },
                stars
            )
        );
    }
});
var ButtonFrame = _react2.default.createClass({
    displayName: 'ButtonFrame',
    render: function render() {
        var seletedNumber = this.props.selectedNumbers.length == 0;
        var correct = this.props.correct,
            button;
        switch (correct) {
            case true:
                button = _react2.default.createElement(
                    'button',
                    { onClick: this.props.currentAnswerNumber, className: 'btn btn-success' },
                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-ok' })
                );
                break;
            case false:
                button = _react2.default.createElement(
                    'button',
                    { className: 'btn btn-danger' },
                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-remove' })
                );
                break;
            default:
                button = _react2.default.createElement(
                    'button',
                    { className: 'btn btn-info', onClick: this.props.clicks, disabled: seletedNumber },
                    '='
                );

        }
        return _react2.default.createElement(
            'div',
            { id: 'button-frame', className: 'col-md-2' },
            button,
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
                'button',
                { className: 'btn btn-warning', disabled: this.props.redraws === 0, onClick: this.props.refreshState },
                _react2.default.createElement('span', { className: 'glyphicon glyphicon-refresh' }),
                ' ',
                this.props.redraws
            )
        );
    }
});

var AnswerFrame = _react2.default.createClass({
    displayName: 'AnswerFrame',
    removeNumber: function removeNumber(e) {
        this.props.removeNumber(e);
    },
    render: function render() {
        var numberOutput = this.props.selectedNumbers.map(function (aNumber) {
            return _react2.default.createElement(
                'span',
                { onClick: this.removeNumber.bind(null, aNumber) },
                aNumber
            );
        }.bind(this));

        return _react2.default.createElement(
            'div',
            { id: 'answer-frame', className: 'col-md-5' },
            _react2.default.createElement(
                'div',
                { className: 'well' },
                numberOutput
            )
        );
    }
});
var NumberFrame = _react2.default.createClass({
    displayName: 'NumberFrame',
    clickNumber: function clickNumber(e) {
        this.props.clickNumber(e);
    },
    render: function render() {
        var numbers = [],
            className,
            usedIt,
            selectedNumbers = this.props.selectedNumbers,
            usedNumber = this.props.usedNumber;
        for (var i = 1; i <= 9; i++) {
            className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
            usedIt = "usednumber-" + (usedNumber.indexOf(i) >= 0);
            numbers.push(_react2.default.createElement(
                'div',
                { onClick: this.clickNumber.bind(null, i), className: className + " " + usedIt },
                i
            ));
        }
        return _react2.default.createElement(
            'div',
            { id: 'number-frame', className: 'col-md-12' },
            _react2.default.createElement(
                'div',
                { className: 'well' },
                numbers
            )
        );
    }
});
var Game = _react2.default.createClass({
    displayName: 'Game',
    getInitialState: function getInitialState() {
        return {
            selectedNumbers: [],
            numberOfStars: Math.floor(Math.random() * 9) + 1,
            correct: null,
            usedNumber: [],
            redraws: 5
        };
    },
    clickNumber: function clickNumber(clicked) {
        if (this.state.selectedNumbers.indexOf(clicked) === -1 && this.state.usedNumber.indexOf(clicked) === -1) {
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(clicked),
                correct: null
            });
        }
    },
    removeNumber: function removeNumber(clicked) {
        var selectedNumber = this.state.selectedNumbers;
        var index = selectedNumber.indexOf(clicked);
        selectedNumber.splice(index, 1);
        this.setState({
            selectedNumbers: selectedNumber,
            correct: null
        });
    },
    sumSelected: function sumSelected() {

        return this.state.selectedNumbers.reduce(function (total, num) {
            return total + num;
        }, 0);
    },
    checkAnswer: function checkAnswer() {
        console.log(this.sumSelected());
        var correct = this.state.numberOfStars === this.sumSelected();
        this.setState({
            correct: correct
        });
    },
    currentAnswerNumber: function currentAnswerNumber() {
        this.setState({
            usedNumber: this.state.usedNumber.concat(this.state.selectedNumbers),
            selectedNumbers: [],
            correct: null,
            numberOfStars: Math.floor(Math.random() * 9) + 1
        });
    },
    refreshState: function refreshState() {
        if (this.state.redraws > 0) {
            this.setState({
                selectedNumbers: [],
                correct: null,
                numberOfStars: Math.floor(Math.random() * 9) + 1,
                redraws: --this.state.redraws
            });
        }
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h1',
                null,
                'Game Nine'
            ),
            _react2.default.createElement('hr', null),
            _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(StartFrame, { numberOfStars: this.state.numberOfStars }),
                _react2.default.createElement(ButtonFrame, { redraws: this.state.redraws, refreshState: this.refreshState, currentAnswerNumber: this.currentAnswerNumber, correct: this.state.correct, clicks: this.checkAnswer, selectedNumbers: this.state.selectedNumbers }),
                _react2.default.createElement(AnswerFrame, { removeNumber: this.removeNumber, selectedNumbers: this.state.selectedNumbers }),
                _react2.default.createElement(NumberFrame, { usedNumber: this.state.usedNumber, selectedNumbers: this.state.selectedNumbers,
                    clickNumber: this.clickNumber })
            )
        );
    }
});

_reactDom2.default.render(_react2.default.createElement(Game, null), document.querySelector('.container'));

},{"react":"react","react-dom":"react-dom"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsZ0JBQU0sV0FBTixDQUFrQjtBQUFBO0FBQ2pDLFVBRGlDLG9CQUN4QjtBQUNMLFlBQUksZ0JBQWdCLEtBQUssS0FBTCxDQUFXLGFBQS9CO0FBQ0EsWUFBSSxRQUFRLEVBQVo7QUFDQSxhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksYUFBcEIsRUFBbUMsR0FBbkMsRUFBd0M7QUFDcEMsa0JBQU0sSUFBTixDQUFXLHdDQUFNLEtBQUssQ0FBWCxFQUFjLFdBQVUsMEJBQXhCLEdBQVg7QUFDSDtBQUNELGVBQ0k7QUFBQTtZQUFBLEVBQUssSUFBRyxhQUFSLEVBQXNCLFdBQVUsVUFBaEM7WUFDSTtBQUFBO2dCQUFBLEVBQUssV0FBVSxNQUFmO2dCQUNLO0FBREw7QUFESixTQURKO0FBUUg7QUFmZ0MsQ0FBbEIsQ0FBbkI7QUFpQkEsSUFBTSxjQUFjLGdCQUFNLFdBQU4sQ0FBa0I7QUFBQTtBQUNsQyxVQURrQyxvQkFDekI7QUFDTCxZQUFJLGdCQUFnQixLQUFLLEtBQUwsQ0FBVyxlQUFYLENBQTJCLE1BQTNCLElBQW1DLENBQXZEO0FBQ0EsWUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLE9BQXpCO1lBQWlDLE1BQWpDO0FBQ0EsZ0JBQU8sT0FBUDtBQUNJLGlCQUFLLElBQUw7QUFDSSx5QkFBUztBQUFBO29CQUFBLEVBQVEsU0FBUyxLQUFLLEtBQUwsQ0FBVyxtQkFBNUIsRUFBaUQsV0FBVSxpQkFBM0Q7b0JBQTZFLHdDQUFNLFdBQVUsd0JBQWhCO0FBQTdFLGlCQUFUO0FBQ0E7QUFDSixpQkFBSyxLQUFMO0FBQ0kseUJBQVM7QUFBQTtvQkFBQSxFQUFRLFdBQVUsZ0JBQWxCO29CQUFtQyx3Q0FBTSxXQUFVLDRCQUFoQjtBQUFuQyxpQkFBVDtBQUNB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aUJBQWlCLEtBQUssS0FBTCxDQUFXLGVBQTVFO0FBQ1EsaUNBQWEsS0FBSyxXQUQxQjtBQUpKO0FBSEosU0FESjtBQWFIO0FBOUUwQixDQUFsQixDQUFiOztBQWtGQSxtQkFBUyxNQUFULENBQWdCLDhCQUFDLElBQUQsT0FBaEIsRUFBeUIsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQXpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuY29uc3QgU3RhcnRGcmFtZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBudW1iZXJPZlN0YXJzID0gdGhpcy5wcm9wcy5udW1iZXJPZlN0YXJzO1xuICAgICAgICB2YXIgc3RhcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZlN0YXJzOyBpKyspIHtcbiAgICAgICAgICAgIHN0YXJzLnB1c2goPHNwYW4ga2V5PXtpfSBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLXN0YXJcIj48L3NwYW4+KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cInN0YXJzLWZyYW1lXCIgY2xhc3NOYW1lPVwiY29sLW1kLTVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAge3N0YXJzfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcbmNvbnN0IEJ1dHRvbkZyYW1lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHNlbGV0ZWROdW1iZXIgPSB0aGlzLnByb3BzLnNlbGVjdGVkTnVtYmVycy5sZW5ndGg9PTA7XG4gICAgICAgIHZhciBjb3JyZWN0ID0gdGhpcy5wcm9wcy5jb3JyZWN0LGJ1dHRvbjtcbiAgICAgICAgc3dpdGNoKGNvcnJlY3Qpe1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICAgIGJ1dHRvbiA9IDxidXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5jdXJyZW50QW5zd2VyTnVtYmVyfSBjbGFzc05hbWU9XCJidG4gYnRuLXN1Y2Nlc3NcIj48c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLW9rXCI+PC9zcGFuPjwvYnV0dG9uPjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgYnV0dG9uID0gPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiPjxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlXCI+PC9zcGFuPjwvYnV0dG9uPjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnV0dG9uID0gPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIiBvbkNsaWNrPXt0aGlzLnByb3BzLmNsaWNrc30gZGlzYWJsZWQ9e3NlbGV0ZWROdW1iZXJ9Pj08L2J1dHRvbj5cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGlkPVwiYnV0dG9uLWZyYW1lXCIgY2xhc3NOYW1lPVwiY29sLW1kLTJcIj5cbiAgICAgICAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgICAgICAgIDxici8+PGJyLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4td2FybmluZ1wiIGRpc2FibGVkPXt0aGlzLnByb3BzLnJlZHJhd3M9PT0wfSBvbkNsaWNrPXt0aGlzLnByb3BzLnJlZnJlc2hTdGF0ZX0+PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZWZyZXNoXCI+PC9zcGFuPiB7dGhpcy5wcm9wcy5yZWRyYXdzfTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmNvbnN0IEFuc3dlckZyYW1lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbW92ZU51bWJlcihlKXtcbiAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmVOdW1iZXIoZSk7XG4gICAgfSxcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBudW1iZXJPdXRwdXQgPSB0aGlzLnByb3BzLnNlbGVjdGVkTnVtYmVycy5tYXAoZnVuY3Rpb24gKGFOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBvbkNsaWNrPXt0aGlzLnJlbW92ZU51bWJlci5iaW5kKG51bGwsYU51bWJlcil9PnthTnVtYmVyfTwvc3Bhbj5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBpZD1cImFuc3dlci1mcmFtZVwiIGNsYXNzTmFtZT1cImNvbC1tZC01XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIHtudW1iZXJPdXRwdXR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcbmNvbnN0IE51bWJlckZyYW1lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGNsaWNrTnVtYmVyKGUpe1xuICAgICAgICB0aGlzLnByb3BzLmNsaWNrTnVtYmVyKGUpO1xuICAgIH0sXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgbnVtYmVycyA9IFtdLGNsYXNzTmFtZSx1c2VkSXQsXG4gICAgICAgICAgICBzZWxlY3RlZE51bWJlcnMgPSB0aGlzLnByb3BzLnNlbGVjdGVkTnVtYmVycyxcbiAgICAgICAgICAgIHVzZWROdW1iZXIgPSB0aGlzLnByb3BzLnVzZWROdW1iZXI7XG4gICAgICAgIGZvcih2YXIgaT0xO2k8PTk7aSsrKXtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwibnVtYmVyIHNlbGVjdGVkLVwiKyAoc2VsZWN0ZWROdW1iZXJzLmluZGV4T2YoaSk+PTApO1xuICAgICAgICAgICAgdXNlZEl0ID0gXCJ1c2VkbnVtYmVyLVwiKyAodXNlZE51bWJlci5pbmRleE9mKGkpPj0wKTtcbiAgICAgICAgICAgIG51bWJlcnMucHVzaCg8ZGl2IG9uQ2xpY2s9e3RoaXMuY2xpY2tOdW1iZXIuYmluZChudWxsLGkpfSBjbGFzc05hbWU9e2NsYXNzTmFtZSArXCIgXCIrIHVzZWRJdH0+e2l9PC9kaXY+KTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGlkPVwibnVtYmVyLWZyYW1lXCIgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIHtudW1iZXJzfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5jb25zdCBHYW1lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdGVkTnVtYmVyczogW10sXG4gICAgICAgIG51bWJlck9mU3RhcnM6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpICsgMSxcbiAgICAgICAgICBjb3JyZWN0OiBudWxsLFxuICAgICAgICAgIHVzZWROdW1iZXI6W10sXG4gICAgICAgICAgcmVkcmF3czogNVxuICAgICAgfTtcbiAgICB9LFxuICAgIGNsaWNrTnVtYmVyKGNsaWNrZWQpe1xuICAgICAgICBpZih0aGlzLnN0YXRlLnNlbGVjdGVkTnVtYmVycy5pbmRleE9mKGNsaWNrZWQpPT09LTEgJiYgdGhpcy5zdGF0ZS51c2VkTnVtYmVyLmluZGV4T2YoY2xpY2tlZCk9PT0tMSl7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE51bWJlcnM6IHRoaXMuc3RhdGUuc2VsZWN0ZWROdW1iZXJzLmNvbmNhdChjbGlja2VkKSxcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBudWxsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICB9LFxuICAgIHJlbW92ZU51bWJlcihjbGlja2VkKXtcbiAgICAgICAgdmFyIHNlbGVjdGVkTnVtYmVyID0gdGhpcy5zdGF0ZS5zZWxlY3RlZE51bWJlcnM7XG4gICAgICAgIHZhciBpbmRleCA9IHNlbGVjdGVkTnVtYmVyLmluZGV4T2YoY2xpY2tlZCk7XG4gICAgICAgIHNlbGVjdGVkTnVtYmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc2VsZWN0ZWROdW1iZXJzOiBzZWxlY3RlZE51bWJlcixcbiAgICAgICAgICAgIGNvcnJlY3Q6IG51bGxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzdW1TZWxlY3RlZCgpe1xuXG4gICAgICByZXR1cm4gIHRoaXMuc3RhdGUuc2VsZWN0ZWROdW1iZXJzLnJlZHVjZShmdW5jdGlvbiAodG90YWwsIG51bSkge1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgbnVtO1xuICAgICAgICB9LDApO1xuICAgIH0sXG4gICAgY2hlY2tBbnN3ZXIoKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdW1TZWxlY3RlZCgpKTtcbiAgICAgIHZhciBjb3JyZWN0ID0gIHRoaXMuc3RhdGUubnVtYmVyT2ZTdGFycyA9PT10aGlzLnN1bVNlbGVjdGVkKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY29ycmVjdDogY29ycmVjdFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGN1cnJlbnRBbnN3ZXJOdW1iZXIoKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB1c2VkTnVtYmVyOiB0aGlzLnN0YXRlLnVzZWROdW1iZXIuY29uY2F0KHRoaXMuc3RhdGUuc2VsZWN0ZWROdW1iZXJzKSxcbiAgICAgICAgICAgIHNlbGVjdGVkTnVtYmVyczpbXSxcbiAgICAgICAgICAgIGNvcnJlY3Q6IG51bGwsXG4gICAgICAgICAgICBudW1iZXJPZlN0YXJzOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KSArIDFcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuICAgIHJlZnJlc2hTdGF0ZSgpe1xuICAgICAgICBpZih0aGlzLnN0YXRlLnJlZHJhd3M+MCl7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE51bWJlcnM6W10sXG4gICAgICAgICAgICAgICAgY29ycmVjdDogbnVsbCxcbiAgICAgICAgICAgICAgICBudW1iZXJPZlN0YXJzOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KSArIDEsXG4gICAgICAgICAgICAgICAgcmVkcmF3czogLS10aGlzLnN0YXRlLnJlZHJhd3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cblxuICAgIH0sXG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDE+R2FtZSBOaW5lPC9oMT5cbiAgICAgICAgICAgICAgICA8aHIvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxTdGFydEZyYW1lIG51bWJlck9mU3RhcnM9e3RoaXMuc3RhdGUubnVtYmVyT2ZTdGFyc30vPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uRnJhbWUgcmVkcmF3cz17dGhpcy5zdGF0ZS5yZWRyYXdzfSByZWZyZXNoU3RhdGU9e3RoaXMucmVmcmVzaFN0YXRlfSBjdXJyZW50QW5zd2VyTnVtYmVyPXt0aGlzLmN1cnJlbnRBbnN3ZXJOdW1iZXJ9IGNvcnJlY3Q9e3RoaXMuc3RhdGUuY29ycmVjdH0gY2xpY2tzPXt0aGlzLmNoZWNrQW5zd2VyfSBzZWxlY3RlZE51bWJlcnM9e3RoaXMuc3RhdGUuc2VsZWN0ZWROdW1iZXJzfS8+XG4gICAgICAgICAgICAgICAgICAgIDxBbnN3ZXJGcmFtZSAgcmVtb3ZlTnVtYmVyPXt0aGlzLnJlbW92ZU51bWJlcn0gc2VsZWN0ZWROdW1iZXJzPXt0aGlzLnN0YXRlLnNlbGVjdGVkTnVtYmVyc30gLz5cbiAgICAgICAgICAgICAgICAgICAgPE51bWJlckZyYW1lIHVzZWROdW1iZXI9e3RoaXMuc3RhdGUudXNlZE51bWJlcn0gc2VsZWN0ZWROdW1iZXJzPXt0aGlzLnN0YXRlLnNlbGVjdGVkTnVtYmVyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja051bWJlcj17dGhpcy5jbGlja051bWJlcn0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cblxuUmVhY3RET00ucmVuZGVyKDxHYW1lLz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKSk7Il19
