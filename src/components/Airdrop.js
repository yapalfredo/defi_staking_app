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

    secondsToTime(secs) {
        let hours, minutes,  seconds
        hours = Math.floor(secs / (60*60))

        let divisorForMinutes = secs % (60*60)
        minutes = Math.floor(divisorForMinutes / 60)

        let divisorForSeconds = divisorForMinutes % 60
        seconds = Math.ceil(divisorForSeconds)

        let obj = {
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }

        return obj
    }

    render() {
        return (
            <div>

            </div>
        )
    }

}

export default Airdrop;