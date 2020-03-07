import React from "react";
import { connect } from "react-redux"

import './index.css'

class Ticker extends React.Component {
    render() {
        return <div className="score">
            {this.props.score}
        </div>
    }
}

const mapStateToProps = (state) => ({
  score: Math.floor(state.game.score)
})

export default connect(mapStateToProps)(Ticker)