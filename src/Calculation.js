import React, { useState } from 'react';
import { BsCalculator } from "react-icons/bs";

function Calculation() {
    const hourList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24"];
    const dayList = ["1", "2", "3", "4", "5", "6", "7"];

    const [hour, setHour] = useState("");
    const [calculations, setCalculations] = useState('');
    const [day, setDay] = useState("");
    const [results, setResult] = useState("");
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
    }

    const weekoff2 = () => {
        setWeekoffs(0);
    }

    const tax = () => {   //세금
        setTaxs(0);
    }
    const tax1 = () => {
        setTaxs(9.32 / 100);
    }
    const tax2 = () => {
        setTaxs(3.3 / 100);
    }

    const apprenticeship = () => { // 수습
        setApprenticeships(0);
    }

    const apprenticeship1 = () => {
        setApprenticeships(10 / 100);
    }

    return (
        <div className='login'>
            <h1 className='calculatormain'><BsCalculator size='10x' />시급 계산기</h1>
            <br/>
            <br/>
            <div>2022년 최저시급 9,160원 입니다.</div>
            <br />
            <div>시급 <input style={{ color: '#660000' }} onChange={(e) => calculation(e)}></input> 원</div>
            <br />
            <div>일일 근무시간&nbsp;

                <select style={{ color: '#660000' }} onChange={handleHour} value={hour}>
                    {hourList.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select> 시간
            </div>

            <br />
            <div>일주 근무일수&nbsp;

                <select style={{ color: '#660000' }} onChange={handleDay} value={day}>
                    {dayList.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select> 일

            </div>
            <br />
            <div>주휴수당&nbsp;
                <button className='loginbtn' style={{ color: '#660000' }} onClick={weekoff2}>제외</button>&nbsp;
                <button className='loginbtn' style={{ color: '#660000' }} onClick={weekoff}>포함</button>
                </div>
            
            <br />
            <div>세금&nbsp;
                <button className='loginbtn' style={{ color: '#660000' }} onClick={tax}>없음</button>&nbsp;
                <button className='loginbtn' style={{ color: '#660000' }} onClick={tax1}>9.32%(4대보험)</button>&nbsp;
                <button className='loginbtn' style={{ color: '#660000' }} onClick={tax2}>3.3%(원천징수)</button>
                </div>
            <br />
            <div>수습&nbsp;
                <button className='loginbtn' style={{ color: '#660000' }} onClick={apprenticeship}>제외</button>&nbsp;
                <button className='loginbtn' style={{ color: '#660000' }} onClick={apprenticeship1}>포함</button></div>
            <br />
            <div><button className='loginbtn' onClick={result}>계산하기</button>
            </div>
            <br />
            <hr color='#660000' />
            <div>
                {results == 0
                    ? <div>최종 환산 금액 0 원</div>
                    :
                    <div>최종 환산 금액 {results} 원</div>
                }
            </div>


        </div>
    )
}
export default Calculation;
