var Field = React.createClass({
    fieldClicked: function () {
        this.props.boardClicked(this.props.index);
    },

    render: function () {
        return (
            <div onClick={this.fieldClicked} className={'field ' + this.props.bgColor}>{this.props.children}</div>
        );
    }
});

var Board = React.createClass({
    getInitialState: function () {
        return (
            {
                pieces:[
                    '\u265c', '\u265e', '\u265d', '\u265b', '\u265a', '\u265d', '\u265e', '\u265c',
                    '\u265f', '\u265f', '\u265f', '\u265f', '\u265f', '\u265f', '\u265f', '\u265f',
                    '', '', '', '', '', '', '', '',
                    '', '', '', '', '', '', '', '',
                    '', '', '', '', '', '', '', '',
                    '', '', '', '', '', '', '', '',
                    '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659', '\u2659',
                    '\u2656', '\u2658', '\u2657', '\u2655', '\u2654', '\u2657', '\u2658', '\u2656'
                ],
                fieldSelected: -1
            });
    },

    constants: {
        black: 'black-field',
        white: 'white-field',
        selected: 'selected-field'
    },

    getFieldColor: function (idx) {
        if(idx == this.state.fieldSelected){
            return this.constants.selected;

        }else if(idx % 16 < 8){
            if (idx % 2 == 0){
                return this.constants.white;
            }else{
                return this.constants.black;
            }

        }else{
            if (idx % 2 == 0){
                return this.constants.black;
            }else{
                return this.constants.white;
            }
        }
    },

    boardClicked: function (idx) {
        console.log('boardClicked - board ' + this.state.fieldSelected);
        if(this.state.fieldSelected == -1){
            this.setState({fieldSelected: idx});
        }else if(this.state.fieldSelected != idx){
           var arr = this.state.pieces;
            arr[idx] = arr[this.state.fieldSelected];
            arr[this.state.fieldSelected] = '';
            this.setState({pieces: arr, fieldSelected: -1});
        }else{
            this.setState({fieldSelected: -1});
        }
    },

    eachField: function(piece, idx){
        return (
            <Field key={idx} index={idx} boardClicked={this.boardClicked} bgColor={this.getFieldColor(idx)}>
                {piece}
            </Field>
        );
    },

    render: function () {
        return (
            <div className="board">
                {this.state.pieces.map(this.eachField)}
            </div>
        );
    }
});


ReactDOM.render(
    <Board/>,
    document.getElementById('app')
);