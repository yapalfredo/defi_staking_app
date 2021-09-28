import React, {Component} from 'react'


class Airdrop extends Component{
    //Airdrop must have a timert that counts down
    //initialize only the timer after the customers have staked a certiain amount.. ($50)
    //timer functionality, countdown , startTimer, state - for time to work

    constructor() {
        super()
        this.state = {time: {}, seconds: 20}
        this.timer = 0
        this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)
    }

    airdropReleaseTokens(){
        let stakingBalance = this.props.stakingBalance
        //checks if balance greater or equal $50
        if (stakingBalance >= '50000000000000000000') {
            this.startTimer()
        }
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000)
        }
    }

    countDown () {
        //1 - countdown a second at a time
        let seconds = this.state.seconds - 1

        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        })
        //2 - stop counting when we hit zero
        if (seconds == 0) { clearInterval(this.timer) }
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

    componentDidMount(){
        let timeLeftVar = this.secondsToTime(this.state.seconds)
        this.setState({time: timeLeftVar})
    }

    render() {
        this.airdropReleaseTokens()
        return (
            <div style={{color: 'black'}}> { this.state.time.minutes }:{this.state.time.seconds}
            
            </div>
        )
    }

}

export default Airdrop;