let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let max=0;
let col=['green','red','yellow','blue'];
let btn=document.querySelector('button');
let h3=document.querySelector('h3');
btn.addEventListener('click',function(){
    if(started==false){
        started=true;
        h3.style.display='block';
        setTimeout(levelUp,1000);
    }else{
        let temp=h3.innerText;
        h3.innerText="Game Already Started"
        setTimeout(()=> h3.innerText=temp,1000);
        h3.style.display='block';
    }
})

function levelUp(){
    level++;
    h3.innerText=`Level ${level}`;
    let idx=Math.floor(Math.random()*3);
    let colIdx=col[idx];
    gameSeq.push(colIdx);
    let delay=400;
    gameSeq.forEach((el,idx)=>{
        setTimeout(()=>{
            btnFlash(el);
        },idx*delay);
    });
}
function btnFlash(colIdx)
{
    let btn=document.querySelector(`.${colIdx}`);
    btn.classList.add('flash');
    setTimeout(()=>btn.classList.remove('flash'),300);
}
function btnPress()
{
    this.classList.add('userFlash');
    setTimeout(()=>this.classList.remove('userFlash'),500);
    let col=this.getAttribute('id');
    userSeq.push(col);
    checkAns(userSeq.length-1);
}
function checkAns(idx)
{
    console.log(userSeq);
    console.log(gameSeq);
    if(userSeq[idx]==gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
            userSeq=[];
            setTimeout(levelUp,1000);
        }

    }else{
        max=Math.max(max,level-1);
        let body=document.querySelector('body');
        body.style.backgroundColor='red';
        setTimeout(()=>body.style.backgroundColor='gray',200);
        h3.innerText=`Game Over!!Your Score :${level-1} High-Score :${max}`;
        reset();
    }
}
let btns=document.querySelectorAll('.quarter');
for(btn of btns)
{
    btn.addEventListener('click',btnPress);
}
function reset()
{
    level=0;
    userSeq=[];
    gameSeq=[];
    started=false;
}