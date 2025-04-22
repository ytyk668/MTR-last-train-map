import './App.css';
import data from './mtr4.json'
import stationID from './stationID.json'
import allStationID from './all_route_stations.json'
import { useEffect, useState } from 'react';

function App() {
  const [currentStation, setCurrentStation] = useState(116) // yuen long
  const [currentStart, setCurrentStart] = useState(0)
  const [currentData, setCurrentData] = useState(data[1])
  const [currentPaths, setCurrentPaths] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [showTW, setShowTW] = useState(false)
  const [showKT, setShowKT] = useState(false)
  const [showIsland, setShowIsland] = useState(false)
  const [showTC, setShowTC] = useState(false)
  const [showAirport, setShowAirport] = useState(false)
  const [showTKO, setShowTKO] = useState(false)
  const [showDisney, setShowDisney] = useState(false)
  const [showEast, setShowEast] = useState(false)
  const [showSouthI, setShowSouthI] = useState(false)
  const [showTM, setShowTM] = useState(false)

  useEffect(() => {
    setCurrentData(data[currentStation])
    var element = document.getElementById("p"+currentStation);
    element.classList.add("now");
    if (element?.classList.contains("start")) {
      element?.classList.remove("start");
    }
  }, [currentStation])
  
  useEffect(() => {
    var element = document.getElementById("p"+currentStart);
    if (!element?.classList.contains("now")) {
      element?.classList.add("start");
    }
  }, [currentStart])

  useEffect(() => {
    let path = []
    if (currentData)
      Object.keys(currentData).forEach(key => (
        currentData[key]?.path ? path.push(key) : null
      ))
    setCurrentPaths(path)
  }, [currentData])

  useEffect(() => {
    Object.keys(stationID).forEach(key => {
      const stationName = document.getElementById('t'+key);
  
      stationName.addEventListener('click', () => {
          const route = document.getElementById('route');
          
          if (route) {
              route.scrollIntoView({ behavior: 'smooth' });
          }
      });
    })
  },[])

  return (
    <>
      <div id="zmap" style={{ position: "absolute", width: "autopx" }}>
        <h1><center>尾班車開車時間 time of last train</center></h1>
        <div style={{ marginLeft: "6px", marginBottom: "2px", marginTop: "2px" }}>
          <div style={{ fontSize: '12px' }}>圖片，地圖設計及靈感取自<a href='https://tw.piliapp.com/hongkong-mtr/' target='_blank' rel="noreferrer">https://tw.piliapp.com/hongkong-mtr/</a><br /></div>
          <div style={{ fontSize: '11px' }}><span className="b b-east-rail">馬場站</span>列車服務時間表於頁底<br /><br /></div>
          請留意港鐵網站(<a href='https://www.mtr.com.hk' target='_blank' rel="noreferrer">www.mtr.com.hk</a>)或車站公佈的特別車務安排。<br /><br />
          由於最短路線的最後班次有機會比其他路線早，故請參閱頁底之路線。<br /><br />
          下列時間為列車由月台開出的實際時間。乘搭尾班車的乘客須於列車開出前最少5分鐘入站。<br /><br />
        </div>
        {/* {Object.keys(stationID).map(key => (<>
        https://hkrail.fandom.com/wiki/{stationID[key].name}站#列車服務<br/>
        </>))} */}
        {/* <div id="map-overlay"></div> */}
        <span id="route" style={{ marginLeft: "6px", backgroundColor:"#AAAAAA", color:"#FFF" }}>
          點擊站名(<span style={{color:"#fff400"}}>文字</span>)選擇起點，以顯示路線<br /><br /></span>
        {currentStart !== 0 && <div id="route" style={{ marginLeft: "12px", marginBottom: "2px" }}>
          starting station: <span id={"b" + currentStart}
            className={stationID[currentStart]?.class === "mix" ? "b" : "b b-" + stationID[currentStart]?.class}>
            {stationID[currentStart]?.name}</span><br />
          route: {currentData[currentStart]?.path ? currentData[currentStart]?.path : "/"}<br />
          尾班車開車時間: {currentData?.[currentStart]?.time}<br />
        </div>}
        <br />
        <span style={{ marginLeft: "6px", marginBottom: "2px", fontWeight: "bold", backgroundColor:"#AAAAAA" }}>
        點擊以選擇終點站 **TO** selected station
        </span>
        <div id="map">
          <img src="https://assets.piliapp.com/s3pxy/hk/mtr/20220519-zh.png" width={720} height={720} alt="bg" />
          <div id="stations">
            <img style={{ position: "absolute", left: '60px', top:"10px" }} src="https://i.pinimg.com/736x/fc/b2/2a/fcb22a107a2b56cf2aae4e1a1ec26348.jpg" width={80} height={150} alt="arrow" />
            <img style={{ position: "absolute", left: '84px', top:"170px" }} src="https://pngimg.com/uploads/circle/circle_PNG71.png" width={30} height={30} alt="circle" />
            <div style={{marginLeft:"160px", marginTop:"12px", fontSize: '25px', backgroundColor:"#AAAAAA"}}>列車由月台開出的實際時間。</div>
            <div style={{marginLeft:"160px", fontSize: '25px', backgroundColor:"#AAAAAA", color:"#FFF"}}>最少須於開出前5分鐘入站。</div>
            {Object.keys(stationID).map(key => (<>
              <span className="t" style={{cursor: "pointer"}} id={"t" + key} title={currentData?.[key]?.path ? currentData?.[key]?.path : "/"}
                onClick={() => {if (key !== currentStart) {
                  var element = document.getElementById("p"+currentStart);
                  element?.classList.remove("start");
                  setCurrentStart(key)}}}>{(parseInt(key)===64)?" "+stationID[key].name:stationID[key].name}</span>
              <span className={"p p-" + stationID[key].class}
                id={"p" + key} onClick={() => {if (parseInt(key) !== currentStation) {
                  var element = document.getElementById("p"+currentStation);
                  element.classList.remove("now");
                  setCurrentStation(parseInt(key))}}}>
                <i>{currentData?.[key]?.time}</i>
              </span>
            </>))}
          </div>
        </div>
        {currentStart !== 0 && <div style={{ marginLeft: "12px", marginBottom: "2px" }}>
          starting station: <span id={"b" + currentStart}
            className={stationID[currentStart]?.class === "mix" ? "b" : "b b-" + stationID[currentStart]?.class}>
            {stationID[currentStart]?.name}</span><br />
          route: {currentData[currentStart]?.path ? currentData[currentStart]?.path : "/"}<br />
          尾班車開車時間: {currentData?.[currentStart]?.time}
          </div>}
        <br />
        {/* racecourse */}
        <div id="raceCourse" style={{ marginLeft: "6px" }}>
          <span className="b b-east-rail">馬場站</span>列車服務時間表<br />
          上行 <span className="b b-east-rail">落馬洲</span>（需於<span className="b b-east-rail">上水</span>轉車）/ <span className="b b-east-rail">羅湖</span>: 18:16@／22:07*／20:18$／23:18%<br />
          下行	<span className="b b-east-rail">金鐘</span>	11:35@／14:40*／18:18$／17:54%	19:16@／22:42*／23:40$%<br />
          @星期六、日及公眾假期日馬賽事；* 星期六、日及公眾假期黃昏馬賽事；$星期三沙田夜馬雙邊投注賽事；%星期三沙田夜馬投注賽事<br />
        </div>
        <br />

        {/* tsuen wan line */}
        {!showTW && <a href="#TWRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowTW(true))}>
          Show routes from <span className="b b-tsuen-wan">Tsuen Wan</span> line
        </button></a>}
        {showTW && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowTW(false))}>
          Hide routes from <span className="b b-tsuen-wan">Tsuen Wan</span> line
        </button>}

        {/* kwun tong line */}
        {!showKT && <a href="#KTRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowKT(true))}>
          Show routes from <span className="b b-kwun-tong">Kwun Tong</span> line
        </button></a>}
        {showKT && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowKT(false))}>
          Hide routes from <span className="b b-kwun-tong">Kwun Tong</span> line
        </button>}

        {/* island line */}
        {!showIsland && <a href="#IslandRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowIsland(true))}>
          Show routes from <span className="b b-island">Island</span> line
        </button></a>}
        {showIsland && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowIsland(false))}>
          Hide routes from <span className="b b-island">Island</span> line
        </button>}

        {/* tung chung line */}
        {!showTC && <a href="#TCRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowTC(true))}>
          Show routes from <span className="b b-tung-chung">Tung Chung</span> line
        </button></a>}
        {showTC && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowTC(false))}>
          Hide routes from <span className="b b-tung-chung">Tung Chung</span> line
        </button>}

        {/* airport line */}
        {!showAirport && <a href="#AirportRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowAirport(true))}>
          Show routes from <span className="b b-airport">Airport</span> line
        </button></a>}
        {showAirport && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowAirport(false))}>
          Hide routes from <span className="b b-airport">Airport</span> line
        </button>}

        {/* tko line */}
        {!showTKO && <a href="#TKORoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowTKO(true))}>
          Show routes from <span className="b b-tko">Tseung Kwun O</span> line
        </button></a>}
        {showTKO && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowTKO(false))}>
          Hide routes from <span className="b b-tko">Tseung Kwun O</span> line
        </button>}

        {/* east rail line */}
        {!showEast && <a href="#EastRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowEast(true))}>
          Show routes from <span className="b b-east-rail">East Rail</span> line
        </button></a>}
        {showEast && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowEast(false))}>
          Hide routes from <span className="b b-east-rail">East Rail</span> line
        </button>}

        {/* south island line */}
        {!showSouthI && <a href="#SouthIRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowSouthI(true))}>
          Show routes from <span className="b b-south-island">South Island</span> line
        </button></a>}
        {showSouthI && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowSouthI(false))}>
          Hide routes from <span className="b b-south-island">South Island</span> line
        </button>}

        {/* tuen ma line */}
        {!showTM && <a href="#TMRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowTM(true))}>
          Show routes from <span className="b b-tuen-ma">Tuen Ma</span> line
        </button></a>}
        {showTM && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowTM(false))}>
          Hide routes from <span className="b b-tuen-ma">Tuen Ma</span> line
        </button>}

        {/* disneyland line */}
        {!showDisney && <a href="#DisneyRoutes"><button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowDisney(true))}>
          Show routes from <span className="b b-disneyland">Disneyland</span> line
        </button></a>}
        {showDisney && <button style={{ marginLeft: "6px", marginBottom: "4px", paddingTop: "2px" }}
          onClick={() => (setShowDisney(false))}>
          Hide routes from <span className="b b-disneyland">Disneyland</span> line
        </button>}

        {/* show / hide buttons */}
        {!showAll && <a href="#allRoutes"><button style={{ marginLeft: "6px" }} onClick={() => (setShowAll(true))}>Show all routes</button></a>}
        {showAll && <button style={{ marginLeft: "6px" }} onClick={() => (setShowAll(false))}>Hide all routes</button>}

        {/* routes */}
        <div id="allRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showAll && <>{currentPaths.map((key) => (
            <div style={{ marginBottom: "3px" }}>
              <span className={"b b-" + stationID[key].class} id={"b" + key}>{stationID[key]?.name}</span>: {currentData[key]?.path}
              <br />
            </div>))}
            <br /></>}
        </div>

        <div id="TWRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showTW && <>{allStationID[0].map((station) => {
            if (station.class !== "tsuen-wan") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-tsuen-wan">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="KTRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showKT && <>{allStationID[0].map((station) => {
            if (station.class !== "kwun-tong") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-kwun-tong">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="IslandRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showIsland && <>{allStationID[0].map((station) => {
            if (station.class !== "island") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-island">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="TCRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showTC && <>{allStationID[0].map((station) => {
            if (station.class !== "tung-chung") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-tung-chung">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="AirportRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showAirport && <>{allStationID[0].map((station) => {
            if (station.class !== "airport") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-airport">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="TKORoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showTKO && <>{allStationID[0].map((station) => {
            if (station.class !== "tko") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-tko">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="EastRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showEast && <>{allStationID[0].map((station) => {
            if (station.class !== "east-rail") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-east-rail">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="SouthIRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showSouthI && <>{allStationID[0].map((station) => {
            if (station.class !== "south-island") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-south-island">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="TMRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showTM && <>{allStationID[0].map((station) => {
            if (station.class !== "tuen-ma") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-tuen-ma">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <div id="DisneyRoutes" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {showDisney && <>{allStationID[0].map((station) => {
            if (station.class !== "disneyland") return null
            else
              return (<div style={{ marginBottom: "3px" }}>
                <span className="b b-disneyland">{stationID[station.id]?.name}</span>: {currentData[station.id]?.path ? currentData[station.id]?.path : "/"}
                <br /></div>)
          })}
            <br /></>}
        </div>

        <a href="#raceCourse" style={{ marginLeft: "6px" }}><button>Back to top of routes</button></a>
        <br /><br />
        <a href="#zmap" style={{ marginLeft: "6px" }}><button>Back to top</button></a>

        <div id="end" style={{ marginLeft: "6px" }}>
          <br />
          Data from <a href='https://www.mtr.com.hk/ch/customer/jp/index.php' target='_blank' rel="noreferrer">mtr</a> and <a href='https://hkrail.fandom.com/wiki' target='_blank' rel="noreferrer">hkrail fandom</a> <br />
          <br />
          <center>Author: <a href='https://github.com/ytyk668' target='_blank' rel="noreferrer">ytyk668</a></center>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default App;