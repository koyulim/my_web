

const nickname = sessionStorage.getItem('nickname');
const area = sessionStorage.getItem('area');
const jobname = sessionStorage.getItem('jobname');
const url = sessionStorage.getItem('url');



function Board(){
    return(
        <>
        <div>글 목록</div>
        {
            nickname !== null
            ? <div><button><a className='href' href='Post'>글쓰기</a></button></div>
            :<button style={{padding : '5px'}} onClick={Posts}>글쓰기</button>
        }

        <a>{area}</a>
        <a>{jobname}</a>
        <a>{url}</a>

        
        
        </>
    )
}

function Posts(){
    alert('로그인을 해주세요.')
  }
export default Board;