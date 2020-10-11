import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled from "styled-components";

import Logo from "../../assets/img/logo.png";

import Button from "../../components/Button";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import useModal from "../../hooks/useModal";
import { getStats } from "./utils";
import useYam from "../../hooks/useYam";
import { OverviewData } from "./types";

import Icon from "../../assets/img/icon.png";
import Landscape from "../../assets/img/landscapebig.png";
import TallSky from "../../assets/img/tallsky.png";
import SmollSky from "../../assets/img/bg3.svg";
import Sky from "../../assets/img/skybig.png";
import Uniswap from "../../assets/img/uniswap@2x.png";
import StakeModal from "./StakeModal";
import UnstakeModal from "./UnstakeModal";
import WarPool from "./WarPool";


import FarmCards from "./components/FarmCards";
import CountDown from "./components/CountDown";
import MobileCountDown from "./components/MobileCountdown";

import { Account } from "../../yam/lib/accounts";
import { getStartTime, getTotalValue } from "../../yamUtils";
import useFarms from "../../hooks/useFarms";
import BigNumber from "bignumber.js";

function isMobile() {
  if (window.innerWidth < window.innerHeight) {
    return true;
  } else {
    return false;
  }
}

const Farms: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();
  const yam = useYam();
  let [farms] = useFarms();
  let [tvl, setTVL] = useState({
    totalValue: new BigNumber(0),
    poolValues: {}
  });
  let launch = 1601308800000;

  const [
    {
      circSupply,
      curPrice,
      // nextRebase,
      targetPrice,
      totalSupply
    },
    setStats
  ] = useState<OverviewData>({});

  const fetchStats = useCallback(async () => {
    const statsData = await getStats(yam);
    setStats(statsData);
  }, [yam, setStats]);

  const fetchTotalValue = useCallback(
    async pools => {
      const tv = await getTotalValue(pools, yam);
      setTVL(tv);
    },
    [yam, setTVL, setTVL]
  );

  useEffect(() => {
    if (yam && account && farms && farms[0]) {
      fetchStats();
    }
    if (yam && farms) {
      fetchTotalValue(farms);
    }
  }, [yam, account, farms, farms[0]]);

  const [onPresentStake] = useModal(
    <StakeModal max={null} onConfirm={null} tokenName={null} />
  );

  const [onPresentUnstake] = useModal(
    <UnstakeModal max={null} onConfirm={null} tokenName={null} />
  );

  let currentPrice = 0;

  if (curPrice) {
    currentPrice = curPrice;
  }

  let diffTime = launch - Math.round(new Date().getTime());

  return (
    <Switch>
      <StyledCanvas>
        <BackgroundSection>
          {isMobile() ? <MobileTallStyledSky /> : <TallStyledSky />}
          <StyledLandscape />
        </BackgroundSection>
        <ContentContainer>
          <Page>
            <CardContainer>
              <TopDisplayContainer>
                {/*<DisplayItem>
                  TVL: $
                  {tvl && !tvl.totalValue.eq(0)
                    ? Number(tvl.totalValue.toFixed(2)).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      }
                    )
                    : "-"}
                </DisplayItem>*/}
                <DisplayItem>
                  $War Price: $
                  {currentPrice
                    ? Number(currentPrice).toLocaleString(undefined, {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 4
                    })
                    : "-"}
                </DisplayItem>
                <DisplayItem>Supply: 2,800,000</DisplayItem>
              </TopDisplayContainer>
              {/*<HelloBar>YieldWars Battle page will launch at 5pm PT today!!
              Official statement on our telegram here: <a style={{color: 'white'}} href="https://t.me/YieldWarsOfficial/4548">https://t.me/YieldWarsOfficial/4548</a>
              </HelloBar>*/}
              <TextContainer>
                <StyledA
                  href="https://uniswap.info/token/0xf4a81c18816c9b0ab98fac51b36dcb63b0e58fde"
                  target="_blank"
                />
                <LargeText>Select a farm</LargeText>
                <SmallText>
                  Earn WAR tokens by Farming the fields of Byzantium
                </SmallText>
              </TextContainer>
              {diffTime > 0 && (
                <div style={{ marginBottom: "5vh", marginTop: "5vh" }}>
                  <Title>Pool 2 Begins:</Title>
                  {isMobile() ? (
                    <MobileCountDown launchDate={launch} />
                  ) : (
                      <CountDown launchDate={launch} />
                    )}
                </div>
              )}
              <WarPool />
              <FarmCards />
              {/*<SectionDivider />
              <CountDownText>The War Begins:</CountDownText>
              <CountDown launchDate={start} />
              <WarPool />*/}
            </CardContainer>
          </Page>
        </ContentContainer>
      </StyledCanvas>
    </Switch>
  );
};

const StyledA = !isMobile() ? styled.a`
  align-items: center;
  border: 0;
  border-radius: 18px;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  border-radius: 8px;
  box-shadow: rgb(0, 34, 79) 6px 6px 12px, rgb(0, 54, 119) -12px -12px 24px -2px;
  background-image: url(${Uniswap});
  background-size: cover;
  background-position: center;
  height: 40px;
  justify-content: center;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
  opacity: 1;
  width: 180px;
  font-family: Alegreya;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: white;
  margin-bottom: 20px;
` : styled.a`
align-items: center;
border: 0;
border-radius: 18px;
cursor: pointer;
display: flex;
font-size: 16px;
border-radius: 8px;
box-shadow: rgb(0, 34, 79) 6px 6px 12px, rgb(0, 54, 119) -12px -12px 24px -2px;
background-image: url(${Uniswap});
background-size: cover;
background-position: center;
height: 40px;
justify-content: center;
outline: none;
padding-left: 10px;
padding-right: 10px;
opacity: 1;
width: 180px;
font-family: Alegreya;
font-size: 20px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: white;
margin-bottom: 20px;
`

const TopDisplayContainer = !isMobile()
  ? styled.div`
      width: 40vw;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-evenly;
      margin: 16px auto 80px auto;
    `
  : styled.div`
      width: 40vw;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-content: center;
      justify-content: space-evenly;
      margin: 60px auto 40px auto;
      display: flex;
      flex-wrap: wrap;
    `;

const DisplayItem = !isMobile()
  ? styled.div`
      color: white;
      font-family: Alegreya;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: #ffffff;
    `
  : styled.div`
      width: 100%;
      margin-bottom: 10px;
      color: white;
      font-family: Alegreya;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: #ffffff;
    `;

const Title = styled.div`
  font-family: Alegreya;
  font-size: 25px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  margin-top: 1%;
`;

const LargeText = styled.div`
  font-family: Alegreya;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  margin-bottom: 20px;
`;

const SmallText = styled.div`
  font-family: Alegreya;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
`;

const TextContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const TallStyledSky = styled.div`
  width: 100%;
  height: 500vh;
  background-image: url(${TallSky});
  background-size: 100% 100%;
  background-repeat: repeat-x;
`;

const StyledLandscape = styled.div`
  width: 100%;
  height: 45vh;
  background-image: url(${Landscape});
  background-size: cover;
  transform: translateY(-1px);
`;

const MobileTallStyledSky = styled.div`
  width: 100%;
  height: 1500vh;
  background-image: url(${TallSky});
  background-size: 100% 100%;
  background-repeat: repeat-x;
`;

const BackgroundSection = styled.div`
  position: absolute;
  width: 100%;
  background-color: #154f9b;
`;

const StyledCanvas = styled.div`
  position: absolute;
  width: 100%;
  background-color: #154f9b;
`;
const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;

export default Farms;
