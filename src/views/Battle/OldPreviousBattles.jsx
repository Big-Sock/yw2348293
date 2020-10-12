import React, { useCallback, useEffect, useState } from 'react'
import {
	Route,
	Switch,
	useRouteMatch,
} from 'react-router-dom'
import styled from 'styled-components'

import useYam from '../../hooks/useYam'
import { useWallet } from 'use-wallet'

import Landscape from '../../assets/img/landscapebig.png'
import Sky from '../../assets/img/skybig.png'
import TallSky from '../../assets/img/tallsky.png'
import FightInstructions from '../../assets/img/flightinstructions.png'

import useFarms from '../../hooks/useFarms'
import useFarm from '../../hooks/useFarm'
import { Farm } from '../../contexts/Farms'
import Cookie from 'universal-cookie'
import axios from 'axios'
import Swal from 'sweetalert2'
import Win from '../../assets/img/win.png'
import './swal.css'

function isMobile() {
	if (window.innerWidth < window.innerHeight) {
		return true
	}
	else {
		return false
	}
}

function getServerURI() {
	if (window.location.hostname === 'localhost') {
		return 'http://localhost:5000'
	}
	return 'https://yieldwars-api.herokuapp.com'
}

let cookie = new Cookie()


const Versus = ({ history }) => {
	let [farms] = useFarms()
	const yam = useYam()
	const { account, connect } = useWallet()
	if (!history.length) {
		return null
	}

	let prevSeasonHistory = []

	const sortedHistory = history.sort((a, b) => {
		return a.day - b.day
	})
	for (let i = 0; i < sortedHistory.length; i++) {
			// checks if another battle exists in array, then adds as group
			// if it was on the same day
			if (i + 1 < sortedHistory.length && sortedHistory[i].day === sortedHistory[i + 1].day) {
				prevSeasonHistory.push([sortedHistory[i], sortedHistory[i + 1]]);
				i++;
			} else {
				prevSeasonHistory.push([sortedHistory[i]]);
			}
	}

	// for (let i = 0; i < history.length / 2; i++) {
	// 	prevSeasonHistory.push(history.filter(item => item.day - 1 === i))
	// }

	prevSeasonHistory.reverse()


	
	prevSeasonHistory = prevSeasonHistory.map(item => {
		let pool1, pool2, pool3, pool4, winner1, winner2
		if (item.length === 0) {
			return null
		}
		if (item.length === 2) {
			pool1 = farms.find(farm => farm.id === item[0].pool1.name)
			pool2 = farms.find(farm => farm.id === item[0].pool2.name)
			pool3 = farms.find(farm => farm.id === item[1].pool1.name)
			pool4 = farms.find(farm => farm.id === item[1].pool2.name)
			winner1 = item[0].pool1.totalVotes - item[0].pool2.totalVotes > 0 ? 1 : 2
			winner2 = item[1].pool1.totalVotes - item[1].pool2.totalVotes > 0 ? 1 : 2
		} else {
			pool1 = farms.find(farm => farm.id === item[0].pool1.name)
			pool2 = farms.find(farm => farm.id === item[0].pool2.name)
			winner1 = item[0].pool1.totalVotes - item[0].pool2.totalVotes > 0 ? 1 : 2
		}
		let day = "";
		if (item[0].day - 2 < 0) {
			day = "Sept 29th";
		} else if (item[0].day === 0) {
			day = "Sept 30th";
		} else {
			day = "Oct " + (item[0].day - 2);
		}

		console.log(item[0].pool1.totalVotes);
		return (
			<VSContentContainer>
				{item[0].day - 2 ? <div>{day}</div> : <div>Sept 30th</div>}
				{item.length === 1 && <Space />}
				<VersusItem>
					<VersusCard>
						<StyledContent>
							{winner1 === 1 ? <WinningCardIcon>{pool1.icon}</WinningCardIcon> : <StyledCardIcon>{pool1.icon}</StyledCardIcon>}
							<StyledTitle>{pool1.name}</StyledTitle>
							<Percent>{
								((parseInt(item[0].pool1.totalVotes, 10) /
									(parseInt(item[0].pool1.totalVotes, 10) + parseInt(item[0].pool2.totalVotes, 10)))
									* 100).toFixed(0)
							}%</Percent>
						</StyledContent>
					</VersusCard>
                    VS
					<VersusCard>
						<StyledContent>
							{winner1 === 2 ? <WinningCardIcon>{pool2.icon}</WinningCardIcon> : <StyledCardIcon>{pool2.icon}</StyledCardIcon>}
							<StyledTitle>{pool2.name}</StyledTitle>
							<Percent>{
								((parseInt(item[0].pool2.totalVotes, 10) /
									(parseInt(item[0].pool1.totalVotes, 10) + parseInt(item[0].pool2.totalVotes, 10)))
									* 100).toFixed(0)
							}%</Percent>
						</StyledContent>
					</VersusCard>
				</VersusItem>
				{item.length === 1 && <Space />}
				{item.length === 2 && (
					<>
						<Divider />
						<VersusItem>
							<VersusCard>
								<StyledContent>
									{winner2 === 1 ? <WinningCardIcon>{pool3.icon}</WinningCardIcon> : <StyledCardIcon>{pool3.icon}</StyledCardIcon>}
									<StyledTitle>{pool3.name}</StyledTitle>
									<Percent>{
										((parseInt(item[1].pool1.totalVotes, 10) /
											(parseInt(item[1].pool1.totalVotes, 10) + parseInt(item[1].pool2.totalVotes, 10)))
											* 100).toFixed(0)
									}%</Percent>
								</StyledContent>
							</VersusCard>
              		VS
							<VersusCard>
								<StyledContent>
									{winner2 === 2 ? <WinningCardIcon>{pool4.icon}</WinningCardIcon> : <StyledCardIcon>{pool4.icon}</StyledCardIcon>}
									<StyledTitle>{pool4.name}</StyledTitle>
									<Percent>{
										((parseInt(item[1].pool2.totalVotes, 10) /
											(parseInt(item[1].pool1.totalVotes, 10) + parseInt(item[1].pool2.totalVotes, 10)))
											* 100).toFixed(0)
									}%</Percent>
								</StyledContent>
							</VersusCard>
						</VersusItem>
					</>
				)}
			</VSContentContainer>
		)
	})


	return (
		<>
			{prevSeasonHistory.length > 0 &&
				<Title>Season 1 Battle History</Title>
			}
			<SeasonContainer>
				{prevSeasonHistory}
			</SeasonContainer>
		</>
	)
}

const Space = styled.div`height: 61px;`

const SeasonContainer = !isMobile() ? styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
width: 80%;
max-width: 1200px;
margin-bottom: 20px;
` : styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
margin-bottom: 20px;
width: 90vw;
`

const Percent = styled.div`
width: 20%;
font-family: "Gilroy";
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
`

const Divider = styled.div`
margin-left: 10%;
width: 80%;
  height: 2px;
  opacity: 0.5;
  background-color: #ffffff;
`


const StyledCardIcon = styled.div`

font-size: 36px;
height: 62px;
width: 62px;
border-radius: 40px;
align-items: center;
display: flex;
justify-content: center;
box-shadow: rgb(226, 214, 207) 4px 4px 8px inset, rgb(247, 244, 242) -6px -6px 12px inset;
margin: 2px;
`

const WinningCardIcon = styled.div`

font-size: 36px;
height: 62px;
width: 62px;
border-radius: 40px;
align-items: center;
display: flex;
justify-content: center;
box-shadow: rgb(226, 214, 207) 4px 4px 8px inset, rgb(247, 244, 242) -6px -6px 12px inset;
border: solid 2px #ffd500;

margin: 2px;
`

const Title = styled.div`
font-family: "Gilroy";
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  max-width: 80vw;
  margin: 20px auto 20px auto;
`;

const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;

`

const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 3vh;
  max-width: 730px;
  height: 570px;
  width: 100%;
`

const StyledCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  border-radius: 8px;
    background-color: rgba(256,256,256,0.08);
`

const StyledText = styled.p`
font-family: "Gilroy";
font-size: 20px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
`

const ButtonContainer = styled.div`
`
const VSContentContainer = styled.div`
width: 30%;
min-width: 300px;
  height: 398px;
  border-radius: 8px;
    border: solid 2px rgba(255, 183, 0, 0.3);
  background-color: rgba(256,256,256,0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
font-family: "Gilroy";
  font-size: 25px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  margin-bottom: 40px;
`

const StyledContent = styled.div`
width: 100px;
height: 140px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
`

const StyledDetails = styled.div`
  text-align: center;
`

const StyledDetail = styled.div`
font-family: "Gilroy";
font-size: 20px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
`

const StyledTitle = styled.h4`
width: 80%;
margin: 0;
font-family: "Gilroy";
font-size: 16px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
text-align: center;
color: #ffffff;
  padding: 0;
`

const VersusCard = styled.div`
width: 100px;
  height: 120px;

`

const VersusItem = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
font-size: 16px;

`

export default Versus