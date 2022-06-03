

const nickname = sessionStorage.getItem('nickname');

function Board(){
    return(
        <>
        <div>안녕</div>
        {
            nickname !== null
            ? <div><button><a className='href' href='Post'>글쓰기</a></button></div>
            :<button style={{padding : '5px'}} onClick={Posts}>글쓰기</button>
        }

        
        
        </>
    )
}

function Posts(){
    alert('로그인을 해주세요.')
  }
export default Board;