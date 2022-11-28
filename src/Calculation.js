import React, { useState } from 'react';
import { BsCalculator } from "react-icons/bs";

function Calculation() {
    const hourList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24"];
    const dayList = ["1", "2", "3", "4", "5", "6", "7"];

    const [Btnweekoff, setBtnweekoff] = useState("");
    const [Btnweekoff2, setBtnweekoff2] = useState("");

    const [Btntax, setBtntax] = useState("");
    const [Btntax2, setBtntax2] = useState("");
    const [Btntax3, setBtntax3] = useState("");

    const [Btnapprenticeship, setBtnapprenticeship] = useState("");
    const [Btntapprenticeship2, setBtnapprenticeship2] = useState("");

    const [hour, setHour] = useState("");
    const [calculations, setCalculations] = useState('');
    const [day, setDay] = useState("");
    const [results, setResult] = useState("0");
    const [weekoffs, setWeekoffs] = useState("");
    const [taxs, setTaxs] = useState("");
    const [apprenticeships, setApprenticeships] = useState("");

    const handleHour = (e) => { //일일
        setHour(e.target.value);
    };

    const handleDay = (e) => { //일주
        setDay(e.target.value);
    };

    const calculation = (e) => { //시급
        setCalculations(e.target.value);
    }

    const result = () => {   //결과 값
        setResult((((hour * calculations * day) - ((hour * calculations * day) * taxs)) - (((hour * calculations * day) - ((hour * calculations * day) * taxs)) * apprenticeships)) + ((weekoffs - (weekoffs * taxs)) - ((weekoffs - (weekoffs * taxs)) * apprenticeships)));
    }

    const weekoff = () => { //주휴수당
        if (hour * day > 16) {
            setWeekoffs(hour * calculations * day * 0.2);
        } else {
            setWeekoffs(0);
        }
        setBtnweekoff2(true);
        setBtnweekoff(false);
    }
    const weekoff2 = () => {
        setWeekoffs(0);
        setBtnweekoff(true);
        setBtnweekoff2(false);
    }

    const tax = () => {   //세금
        setTaxs(0);
        setBtntax(true);
        setBtntax2(false);
        setBtntax3(false);
    }
    const tax1 = () => {
        setTaxs(9.32 / 100);
        setBtntax(false);
        setBtntax2(true);
        setBtntax3(false);
    }
    const tax2 = () => {
        setTaxs(3.3 / 100);
        setBtntax(false);
        setBtntax2(false);
        setBtntax3(true);
    }

    const apprenticeship = () => { // 수습
        setApprenticeships(0);
        setBtnapprenticeship(true);
        setBtnapprenticeship2(false);

    }

    const apprenticeship1 = () => {
        setApprenticeships(10 / 100);
        setBtnapprenticeship(false);
        setBtnapprenticeship2(true);

    }

    return (
        <div className='login'>
            <br />
            <div className='calculatormain'>
            <img style={{ textAlign: 'center' }} variant="top" src="img/Trevise.png" /> 
            </div>
            <h1>시급 계산기</h1>
            <div>2022년 최저시급 9,160원 입니다.</div>
            <br />
            <div>시급 <input style={{ color: '#202f57' }} onChange={(e) => calculation(e)}></input> 원</div>
            <br />
            <div>일일 근무시간&nbsp;

                <select style={{ color: '#202f57' }} onChange={handleHour} value={hour}>
                    {hourList.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select> 시간
            </div>
            <br />
            <div>일주 근무일수&nbsp;

                <select style={{ color: '#202f57' }} onChange={handleDay} value={day}>
                    {dayList.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select> 일
            </div>
            <br />
            <div className='inli'>주휴수당&nbsp;
                {Btnweekoff === "" ?
                    <div className='inlin'>
                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={weekoff2} >제외</button>&nbsp;
                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={weekoff}>포함</button>
                    </div>
                    :
                    (
                        Btnweekoff === true ?
                            <div>
                                <button className='btn' style={{ color: '#202f57' }} onClick={weekoff2} >제외</button>&nbsp;
                                <button className='loginbtn' style={{ color: '#202f57' }} onClick={weekoff}>포함</button>
                            </div>
                            :
                            <div>
                                <div>
                                    <button className='loginbtn' style={{ color: '#202f57' }} onClick={weekoff2} >제외</button>&nbsp;
                                    <button className='btn' style={{ color: '#202f57' }} onClick={weekoff}>포함</button>
                                </div>
                            </div>
                    )
                }
            </div>
            <br />
            <br />

            <div className='inli'>세금&nbsp;
                {Btntax === "" ?
                    <div >
                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax}>없음</button>&nbsp;
                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax1}>9.32%(4대보험)</button>&nbsp;
                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax2}>3.3%(원천징수)</button>
                    </div>
                    :
                    (
                        Btntax === true ?
                            <div>
                                <button className='btn' style={{ color: '#202f57' }} onClick={tax}>없음</button>&nbsp;
                                <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax1}>9.32%(4대보험)</button>&nbsp;
                                <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax2}>3.3%(원천징수)</button>
                            </div>
                            :
                            (
                                Btntax2 === true ?
                                    <div>
                                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax}>없음</button>&nbsp;
                                        <button className='btn' style={{ color: '#202f57' }} onClick={tax1}>9.32%(4대보험)</button>&nbsp;
                                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax2}>3.3%(원천징수)</button>
                                    </div>
                                    :
                                    (
                                        Btntax3 === true ?
                                            <div>
                                                <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax}>없음</button>&nbsp;
                                                <button className='loginbtn' style={{ color: '#202f57' }} onClick={tax1}>9.32%(4대보험)</button>&nbsp;
                                                <button className='btn' style={{ color: '#202f57' }} onClick={tax2}>3.3%(원천징수)</button>
                                            </div>
                                            :
                                            <div></div>
                                    )

                            )
                    )
                }

            </div>
            <br />
            <br />
            <div className='inli' >수습&nbsp;
                {Btnapprenticeship === "" ?
                    <div className='inlin'>
                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={apprenticeship}>제외</button>&nbsp;
                        <button className='loginbtn' style={{ color: '#202f57' }} onClick={apprenticeship1}>포함</button>
                    </div>
                    :
                    (
                        Btnapprenticeship === true ?
                            <div>
                                <button className='btn' style={{ color: '#202f57' }} onClick={apprenticeship}>제외</button>&nbsp;
                                <button className='loginbtn' style={{ color: '#202f57' }} onClick={apprenticeship1}>포함</button>
                            </div>
                            :
                            <div>
                                <div>
                                    <button className='loginbtn' style={{ color: '#202f57' }} onClick={apprenticeship}>제외</button>&nbsp;
                                    <button className='btn' style={{ color: '#202f57' }} onClick={apprenticeship1}>포함</button>
                                </div>
                            </div>
                    )
                }

            </div>
            <br />
            <br />
            <div><button className='loginbtn' onClick={result}>계산하기</button>
            </div>
            <br />
            <hr color='#202f57' />
            <h2>
                {results === 0
                    ? <div>최종 환산 금액 0 원</div>
                    :
                    <div>최종 환산 금액 {results} 원</div>
                }
            </h2>


        </div>
    )
}
export default Calculation;
