import React, {Component} from 'react'

class Airdrop extends Component{
    //Airdrop must have a timert that counts down
    //initialize only the timer after the customers have staked a certiain amount.. ($50)
    //timer functionality, countdown , startTimer, state - for time to work

    constructor() {
        super()
        this.state = {time: {}, seconds: 20}
        this.timer = 0
        this.startTime = this.startTime.bind(this)
        this.countDown = this.countDown.bind(this)
    }

    render() {
        return (
            <div>

            </div>
        )
    }

}

export default Airdrop;