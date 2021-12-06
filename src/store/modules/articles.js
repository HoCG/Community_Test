const state = {
    currentArticle: initArticle(), //새롭게 등록될 이벤트, 혹은 현재 이벤트.
    AllArticles: [], //저장된 일정들을 담는 배열.
    ArticleUpdateMode: false,

    DataProcessAllArticles: [], //데이터 처리를 위한 이벤트
};

//사용되는 동작들
const mutations = {
    //다이얼로그를 열때(이벤트 생성 다이얼로그)

    FIND_ARTICLE(state, ArticlesID){
        state.currentArticle = state.AllArticles.find(c => c.id === parseInt(ArticlesID));
    },
    FIND_DATA_ARTICLE(state, ArticlesID){
        state.currentArticle = initArticle();
        state.currentArticle = state.AllArticles.find(c => c.id === parseInt(ArticlesID));
    },
    FIND_MY_ALL_ARTICLES(state, userID){
        state.DataProcessAllArticles = state.AllArticles.filter(c => c.userID === userID);
    },
    FORMAT_DATA_ARTICLE(state){
        state.currentArticle = initArticle();
    },
    FORMAT_ALL_ARTICLES(state){
        state.AllArticles = [];
    },
    MAKE_RANDOM_ARTICLES(state){
        //중복제거 코드가 필요할듯.
        state.DataProcessAllArticles = [];
        let randomCheckArr = [];
        for(let i = 0; i < state.AllArticles.length; i++){
            let n = randomNum(0, state.AllArticles.length-1);
            if(randomCheckArr.indexOf(n) === -1){
                randomCheckArr.push(n);
                state.DataProcessAllArticles.push(state.AllArticles[n]);
            }
            else{
                i--;
            }
        }
    },
    //이벤트를 수정하는 동작이다. 클릭된 일정에 id가 일치하지 않는 event를 events내에서 찾아내고
    //찾아낸 이벤트값들로 events 배열을 재구성하고 최종적으로 수정된 event를 집어넣어주면 끝이다.
    UPDATE_ARTICLE(state, getArticles) {
        //아이디 중복을 피할수 있는 계산이 필요할듯?
        let checkOverlapID = 0;
        while(state.AllArticles.map(e => e.id).includes(parseInt(checkOverlapID)) === true){
            checkOverlapID++;
        }
        state.AllArticles = state
            .AllArticles
            .filter(e => e.id !== getArticles.id); //이벤트배열의 재구성.
        getArticles.id = checkOverlapID;
        getArticles = updateArticle(getArticles); //그리고 배열을 추가.
        state
            .AllArticles
            .push(getArticles);
        state.currentArticle = initArticle();
    },

    //이벤트를 추가하는 과정.
    ADD_ARTICLE(state, getArticles) {
        let checkOverlapID = 0;
        console.log(state.AllArticles.map(e => e.id))
        while(state.AllArticles.map(e => e.id).includes(parseInt(checkOverlapID)) === true){
            checkOverlapID++;
        } 
        getArticles.id = checkOverlapID;
        getArticles = makeArticle(state, getArticles);
        state
            .AllArticles
            .push(getArticles);
        state.currentArticle = initArticle();
    },

    //쓰는일이 없는 함수이지만, 혹시몰라서 냅둠.
    ADD_ARTICLES(state, AllArticles) {
        state.AllArticles = [];
        AllArticles.forEach(e => {
            state
                .AllArticles
                .push(makeArticle(state, e));
        });
    },
    
    //바를 클릭했을때 나오는 디테일한 정보를 알려주는 다이얼로그를 보여주는 변수.
    SHOW_ARTICLES_DETAIL(state, Articles) {
        state
            .AllArticles
            .forEach(e => {
                if (e.id === Articles.id) {
                    state.currentArticle = e;
                }
            })
    },
    
    //이벤트를 업데이트하는 다이얼로그를 출력하게 도와주는 함수.
    UPDATE_ARTICLES_BY_DETAIL(state, getArticles) {
        state.currentArticle = updateArticle(getArticles);
    },
    DELETE_ARTICLE(state, getEvent) {
        state.AllArticles = state
            .AllArticles
            .filter(e => e.id !== getEvent.id);
        state.currentArticle = initArticle();
        state.currentArticle = initArticle();
    },
    //이벤트를 삭제하는 함수. 디테일 다이얼로그내에서 진행되는 동작이기때문에 state.eventDetailDialog = false;
    //다음과같은 변수선언이 존재한다.
    DELETE_ARTICLES_ABOUT_DETAIL(state, getEvent) {
        state.AllArticles = state
            .AllArticles
            .filter(e => e.id !== getEvent.id);
        state.eventDetailDialog = false;
        state.currentArticle = initArticle();
    }
};

//비동기 처리들.
const actions = {};


// 백엔드의 관점에서 볼때 time과 date를 나눠서 저장하게 되면 변수도 많아질 뿐더러 굉장히 비효율적일 수 밖에 없다. 저장하는 변수의
// 양을 줄일 수 있다면 줄이는게 맞는것이므로 이렇게 합쳐서 저장한다.
const makeArticle = (state ,Articles) => {
    return {
        id: Articles.id,
        image: Articles.image,
        userID: Articles.userID,
        title: Articles.title,
        startDate: Articles.startDate,
        startTime: Articles.startTime,
        content: Articles.content,
        HeartLike: Articles.HeartLike
        //색은 랜덤으로 지정. 여기서 만약 겹치는 날짜를 가지고 있는 이벤트가 있다면 그 색이 겹치지 않도록 설정하는것도 필요할듯.
    }
};

//이벤트의 양식을 initEvent를 통해 만들어지는 이벤트 양식으로 맞춰준다.
const updateArticle = (Articles) => {
    //데이터로 이미지를 추가해보는건? https://stackoverflow.com/questions/53412106/linking-to-images-referenced-in-vuex-store-in-vue-js
    return {
        id: Articles.id,
        image: Articles.image,
        userID: Articles.userID,
        title: Articles.title,
        startDate: Articles.startDate,
        startTime: Articles.startTime,
        content: Articles.content,
        HeartLike: Articles.HeartLike
    }
}

//이벤트의 형태를 잡아주는 변수.
function initArticle() {
    return {
        id: '',  //컨텐츠 아이디
        image: '',  //사진
        userID: '', //작성자 ID(작성자 ID를 통해 연결되어 있다.)
        title: '',  //컨텐츠 제목
        startDate: '', //작성일
        startTime: '', //작성시간
        content: '',  //내용
        HeartLike: []
    }
}

function randomNum(min, max){
    let randNum = Math.floor(Math.random()*(max-min+1)) + min;
    return randNum;
}

export default {mutations, state, actions};