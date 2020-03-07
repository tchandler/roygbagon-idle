import React from "react";
import { connect } from "react-redux"

class Ticker extends React.Component {
    render() {
        return <div>
            The Score Is {this.props.score}
        </div>
    }
}

const mapStateToProps = (state) => ({
  score: state.game.score
})

export default connect(mapStateToProps)(Ticker)