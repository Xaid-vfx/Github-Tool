import React, { useEffect } from 'react'
import { useState } from 'react';
import './Pagination.css'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Pagination(props) {

    const totalpages = Math.ceil(props.size / 8);
    // console.log('total',props.size);
    const [arr, setarr] = useState([])
    const [arr1, setarr1] = useState([])
    const [track, settrack] = useState(1)



    var check = 1
    const [currentpage, setcurrentpage] = useState(1)
    for (let i = 1; i <= totalpages; i++) {
        arr[i] = i;
    }

    let rap = []

    useEffect(() => {

        if (totalpages > 8) {
            //console.log(arr.slice(0,8));
            rap = arr.slice(0, 8)

            setarr1(rap)
        }


    }, [props.count])


    // console.log(currentpage);
    return (
        <div>
            <div className='pages'>
                <p className='togglebtn' onClick={() => {
                    if (currentpage == 1) {

                        setcurrentpage(totalpages)
                        props.set(totalpages)
                        settrack(totalpages - 7)
                    }
                    else {
                        setcurrentpage(currentpage - 1)
                        props.set(currentpage - 1)
                        if (track != 0) { settrack(track - 1); }
                    }
                }}><strong><FontAwesomeIcon icon={faArrowLeft} /> </strong> </p>


                {totalpages > 8 ?
                    (<div>
                        {arr.slice(track, track + 8).map(e => {
                            return (<>
                                {e == currentpage ? (<button onClick={(e) => {
                                    setcurrentpage(parseInt(e.target.innerHTML)); props.set(e.target.innerHTML);
                                }} id='page' className='rage'>



                                    {e}
                                </button>)
                                    :
                                    (<button onClick={(e) => {
                                        setcurrentpage(parseInt(e.target.innerHTML));
                                        props.set(e.target.innerHTML);
                                    }} id='page' className='page'>



                                        {e}
                                    </button>)}</>)
                        })}


                    </div>)
                    :
                    (arr.map(e => {
                        return (<>
                            {e == currentpage ? (<button onClick={(e) => { setcurrentpage(e.target.innerHTML); props.set((e.target.innerHTML).parseInt); }} id='page' className='rage'>



                                {e}
                            </button>)
                                :
                                (<button onClick={(e) => { setcurrentpage(e.target.innerHTML); props.set(e.target.innerHTML); }} id='page' className='page'>



                                    {e}
                                </button>)}</>)
                    }))}



                <p className='togglebtn' onClick={() => {
                    console.log(totalpages);
                    if (currentpage >= totalpages) {

                        setcurrentpage(1)
                        props.set(1)
                        settrack(1)
                    }
                    else {
                        setcurrentpage(currentpage + 1)
                        props.set(currentpage + 1)
                        if (totalpages - track > 7) { settrack(track + 1); }

                    }
                }}><strong>
                        <FontAwesomeIcon icon={faArrowRight} /></strong></p>
            </div>
            <div className='seebtns'>
                <button className='seebtn' onClick={()=>{settrack(1)}}><FontAwesomeIcon icon={faArrowLeft} /> Older</button>
                <button className='seebtn' onClick={()=>{settrack(totalpages-7)}}> Newer <FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        </div>
    )
}
